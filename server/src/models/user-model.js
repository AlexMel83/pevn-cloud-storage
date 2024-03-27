const knex = require("./../../config/knex.config");

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

async function findUserByEmail(email, trx = knex) {
  return await trx(UsersTable).select(userFields).where("email", "=", email);
}

async function findUserByActivationLink(activationLink, trx = knex) {
  return await trx(UsersTable)
    .select(userFields)
    .where("activationlink", "=", activationLink)
    .returning("email");
}

async function insertUser(userData, trx = knex) {
  return await trx(UsersTable).insert(userData).returning(userFields);
}

async function activateUser(activationlink, trx = knex) {
  return await trx(UsersTable)
    .where({ activationlink })
    .update({ isactivated: true })
    .returning("email");
}

module.exports = {
  findUserByEmail,
  findUserByActivationLink,
  insertUser,
  activateUser,
};
