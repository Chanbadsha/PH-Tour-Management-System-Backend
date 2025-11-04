import dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
    PORT: number;
    NODE_ENV: "production" | "development",
    DB_URL: string,
    HASH_SALT_COUNT: number
}
const loadEnvConfig = (): EnvConfig => {
    const requiredEnvConfigure: string[] = ["PORT", "NODE_ENV", "DB_URL", "HASH_SALT_COUNT"]
    requiredEnvConfigure.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`❌ Missing required environment variable: ${key}`);
        }

    })
    return {
        PORT: Number(process.env.PORT) || 4000,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "production" || "development",
        HASH_SALT_COUNT: Number(process.env.HASH_SALT_COUNT)
    }
}
export const envVars = loadEnvConfig()