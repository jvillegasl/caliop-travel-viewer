import "server-only";

import sql from "mssql";

const SQL_CONFIG: sql.config = {
    server: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30_000,
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

export async function sqlConnect() {
    const conn = await sql.connect(SQL_CONFIG);

    return conn;
}
