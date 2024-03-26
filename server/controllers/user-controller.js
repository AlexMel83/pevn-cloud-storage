const config = require("./../config/config");
const knex = require("./../config/knex.config");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const userModel = require('./../models/user-model');
const tokenService = require("./../services/token-service");
const UserDto = require("./../dtos/user-dto");
// const mailService = require("./../services/mail-service");
const ApiError = require("./../exceptions/api-errors");

class UserController {
    async registration(req, res, next){
        const userDto = new UserDto(req.body);
        
        const trx = await knex.transaction();
        try{
            const candidate = await userModel.findUserByEmail(userDto.email, trx);
            if(candidate.length){
                return res.status(400).send(ApiError.BadRequest(`Email ${userDto.email} already exists`));
            }

            userDto.password = await bcrypt.hash(req.body.password, 8);
            userDto.activationlink = uuid.v4();

            const [user] = await userModel.insertUser(userDto, trx);
            user.password = "secure";

            // if (process.env.NODE_ENV === "development") {
            //     await mailService.sendActivationMail(
            //       email, `${API_URL}:${PORT}/activate/${activationlink}`,
            //     );
            //   } else {
            //     await mailService.sendActivationMail(
            //       email, `${API_URL}/activate/${activationlink}`,
            //     );
            //   }

            await trx.commit();
            return res.status(200).json(user);
        } catch(error){
            await trx.rollback();
            if (error.code === "23505") {
                return res.status(400).send(ApiError.BadRequest(`Email ${userDto.email} already exists`));
              } else if (error.code === "42P01") {
                return res.status(500).send(ApiError.IntServError("Table 'users' does not exist"));
              } else {
                console.error(error);
                return res.status(500).send(ApiError.IntServError(error.detail));
              }
        }
    }

    async login(req, res, next){
        const {email, password} = req.body;

        let [user] = await userModel.findUserByEmail(email);
        if(!user){
            return res.status(404).json(ApiError.NotFoundError(email));
        }

        if (!user.isactivated) {
            return res.status(400).json(ApiError.BadRequest(`Обліковий запис: ${email} не активовано. Перевірте пошту`));
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if(!isPassValid){
            return res.status(400).json(ApiError.AccessDeniedForRole('Wrong password!'));
        }

        const trx = await knex.transaction();
        try{
            const userDto = new UserDto(user);
            const tokens = tokenService.generateTokens({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken, trx);
            res.cookie("refreshToken", tokens.refreshToken, config.cookieOptions);
            await trx.commit();
            return res.json({ ...tokens, user: userDto });  
        }  catch(error) {
            await trx.rollback();
            return res.status(500).json(ApiError.IntServError(error));
        }
    }

    async logout(req, res, next) {
        const trx = await knex.transaction();
        try {
          let { refreshToken } = req.cookies;
          if(!refreshToken){
            await trx.rollback();
            return res.status(400).json(ApiError.AccessDeniedForRole('User already unlogined'));
          }
          const result = await tokenService.removeToken(refreshToken, trx);
          res.clearCookie("refreshToken");
          await trx.commit();
          return res.status(200).json(result);
        } catch (error) {
          await trx.rollback();
          return res.status(500).json(ApiError.IntServError(error));
        }
      }

};

module.exports = new UserController();