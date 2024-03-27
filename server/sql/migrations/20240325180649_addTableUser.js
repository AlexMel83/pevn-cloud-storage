/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const coworkingsExists = await knex.schema.hasTable("users");
  const tokensExists = await knex.schema.hasTable("tokens");

  const trx = await knex.transaction();

  try {
    if (!coworkingsExists) {
      await trx.schema.createTable("users", function (table) {
        table.increments("id").primary().notNullable();
        table.string("email", 100).notNullable().unique().index();
        table.string("password", 100).notNullable();
        table.string("name", 100).nullable();
        table.string("surname", 100).nullable();
        table.string("phone", 100).nullable();
        table.string("role", 50).defaultTo("user").notNullable();
        table.string("activationlink", 255).nullable().index();
        table.boolean("isactivated").defaultTo("false").notNullable();
        table
          .integer("diskspace")
          .defaultTo(1024 * 3 * 10)
          .notNullable();
        table.integer("usedspace").defaultTo(0).notNullable();
        table.string("avatar", 100).nullable();
        table.jsonb("files").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
      });
    }

    if (!tokensExists) {
      await trx.schema.createTable("tokens", function (table) {
        table.increments("id").primary().notNullable().unique();
        table.integer("user_id").notNullable().index();
        table.text("refreshtoken").notNullable().index();
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      });
    }

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    console.error(JSON.stringify(error, null, 2));
    throw Error({
      error: error,
      message: "Migration for create tables failed",
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const trx = await knex.transaction();

  try {
    await trx.schema.dropTableIfExists("users");
    await trx.schema.dropTableIfExists("tokens");

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw Error({
      error: error,
      message: "Migration for removing tables failed",
    });
  }
};
