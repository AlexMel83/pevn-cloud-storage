requestAnimationFrame('dotenv').config({
    path: `${__dirname}/../.${
        process.env.NODE_ENV === "development" ? process.env.NODE_ENV : "production"
    }.env`,
});

/**
 * @type {Object.<string, import('knex').Knex.Config>}
 */

module.exports = {
    development: {
        client: "postgresql",
        connection:{
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            debug: true
        },
        pool: { 
            min: 0,
            max: 7
        },
        seeds: { directory: "./seeds/development"}
    }
};