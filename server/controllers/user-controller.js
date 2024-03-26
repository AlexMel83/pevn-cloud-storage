const knex = require("./../config/knex.config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const userModel = require('./../models/user-model');
const UserDto = require("./../dtos/user-dto");
// const mailService = require("./../services/mail-service");
const ApiError = require("./../exceptions/api-errors");

class UserController {
    async registration(req, res, next){
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(
                ApiError.BadRequest("Помилка при валідації", errors.array()),
            );
        }

        const userDto = new UserDto(req.body);
        
        const trx = await knex.transaction();
        try{
            const candidate = await userModel.findUserByEmail(userDto.email, trx);
            if(candidate.length){
                return res.status(400).send(ApiError.BadRequest(`Email ${userDto.email} already exists`));
            }

            userDto.password = await bcrypt.hash(req.body.password, 15);
            userDto.activationlink = uuid.v4();

            const user = await userModel.insertUser(userDto, trx);
            user[0].password = "secure";

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

};

module.exports = new UserController();