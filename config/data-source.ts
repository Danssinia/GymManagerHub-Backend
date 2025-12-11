import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entities/User"
import { Trainer } from "../entities/Trainer"
import * as dotenv from "dotenv"
import { Reception } from "../entities/Reception"
import { Role } from "../entities/Role.entity"
import { Staff } from "../entities/Staff.entity"
import { Member } from "../entities/Member.entity"
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
    entities: [
        User,
        Trainer,
        Reception,
        Role,
        Staff,
        Member
    ]
})