/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    const coworkingsExists = await knex.schema.hasTable("users");

    const trx = await knex.transaction();

    try{
        if (!coworkingsExists) {
            await trx.schema.createTable("users", function (table) {
              table.increments("id").primary().notNullable();
              table.string("email", 100).notNullable().unique().index();
              table.string("password", 100).notNullable();
              table.integer("diskspace").defaultTo(1024*3*10).notNullable();
              table.integer("usedspace").defaultTo(0).notNullable();
              table.string("avatar", 100).nullable();
              table.text("social").nullable();
              table.jsonb("files").nullable();
              table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
              table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
            });
          }

          await trx.commit();
    } catch(error){
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
exports.down = async function(knex) {
    const trx = await knex.transaction();

    try{
        await trx.schema.dropTableIfExists("users");

        await trx.commit();
    } catch(error){
        await trx.rollback();
    throw Error({
      error: error,
      message: "Migration for removing tables failed",
    });
    }
};
