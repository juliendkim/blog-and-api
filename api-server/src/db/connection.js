import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 10, // 최대 클라이언트 연결 수 설정 (default: 20)
    idleTimeoutMillis: 30000, // 연결이 닫히기 전 유휴 상태 대기 시간 (default: 10000)
    connectionTimeoutMillis: 2000, // 연결 시간 초과 설정 (default: 0)
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
    release();
});

export default pool;