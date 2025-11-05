import dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
    PORT: number;
    NODE_ENV: "production" | "development",
    DB_URL: string,
    JWT_ACCESS_TOKEN_SECRET: string,
    JWT_ACCESS_TOKEN_EXPEIRED_TIME: string,
    HASH_SALT_COUNT: number
}
const loadEnvConfig = (): EnvConfig => {
    const requiredEnvConfigure: string[] = ["PORT", "NODE_ENV", "DB_URL", "HASH_SALT_COUNT", "JWT_ACCESS_TOKEN_SECRET", "JWT_ACCESS_TOKEN_EXPEIRED_TIME"]
    requiredEnvConfigure.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`❌ Missing required environment variable: ${key}`);
        }

    })
    return {
        PORT: Number(process.env.PORT) || 4000,
        DB_URL: process.env.DB_URL as string,
        JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
        JWT_ACCESS_TOKEN_EXPEIRED_TIME: process.env.JWT_ACCESS_TOKEN_EXPEIRED_TIME as string,
        NODE_ENV: process.env.NODE_ENV as "production" || "development",
        HASH_SALT_COUNT: Number(process.env.HASH_SALT_COUNT)
    }
}
export const envVars = loadEnvConfig()