const knex = require("./../config/knex.config");
const { validationResult } = require("express-validator");
const userModel = require('./../models/user-model');
const ApiError = require("./../exceptions/api-errors");

class UserController {
    async registration(req, res, next){
        const {email, password, name, surname, phone} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send(
                ApiError.BadRequest("Помилка при валідації", errors.array()),
            );
        }
        
        const trx = await knex.transaction();
        try{
            const payload = {
                email, password, name, surname, phone,
            }

            const candidate = await userModel.insertUser(payload, trx);

            await trx.commit();
            return res.status(200).json(candidate);
        } catch(error){
            await trx.rollback();
            if (error.code === "23505") {
                return res.status(400).send(ApiError.BadRequest(`Email ${email} already exists`));
              } else {
                return res.status(500).send(ApiError.IntServError(error.detail));
              }
        }
    }

};

module.exports = new UserController();