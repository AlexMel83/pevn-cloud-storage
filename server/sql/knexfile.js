require("dotenv").config({
  path: `${__dirname}/../.${
    process.env.NODE_ENV === "development" ? process.env.NODE_ENV : "development"
  }.env`,
});
console.log(`${__dirname}/../.${
  process.env.NODE_ENV === "development" ? process.env.NODE_ENV : "development"
}.env`)

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      debug: true,
    },
    pool: { min: 0, max: 7 },
    seeds: {
      directory: "./seeds/development",
    },
  },
};
