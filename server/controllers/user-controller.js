const knex = require("./../config/knex.config");
const { validationResult } = require("express-validator");
const userModel = require('./../models/user-model');

class UserController {
    async registration(req, res, next){
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) {
            return next(
            ApiError.BadRequest("Помилка при валідації", errors.array()),
            );
        }
        
        const trx = await knex.transaction();
        try{
            const {email, password, name, surname, phone} = req.body;
            const payload = {
                email, password, name, surname, phone,
            }

            const candidate = await userModel.insertUser(payload, trx);

            await trx.commit();
            return res.status(200).json(candidate);
        } catch(error){
            await trx.rollback();
            throw error;
        }
    }

};

module.exports = new UserController();