import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import * as dotenv from "dotenv"
dotenv.config();
function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) throw new Error(`Environment variable ${key} is missing`);
    return value;
}
export const AppDataSource = new DataSource({
    type: "postgres",
    host: getEnvVar("DB_HOST"),
    port: Number(getEnvVar("DB_PORT")),
    username: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASSWORD"),
    database: getEnvVar("DB_NAME"),
    synchronize: true,
    logging: false,
    entities: [User]
})