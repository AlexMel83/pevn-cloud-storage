const knex = require("./../config/knex.config");

const UsersTable = "users";
const userFields = [
    "id",
    "email",
    "password",
    "name",
    "surname",
    "phone",
    "role",
    "activationlink",
    "isactivated",
    "diskspace",
    "usedspace",
    "avatar",
    "files",
    "created_at",
    "updated_at",
];

async function insertUser(userData, trx=knex) {
    return await trx(UsersTable).insert(userData).returning(userFields);
};

module.exports = {
    insertUser,
}