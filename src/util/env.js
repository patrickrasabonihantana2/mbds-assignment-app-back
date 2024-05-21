const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const env = dotenv.config();
dotenvExpand.expand(env);

const Env = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://root:example@mongo:27017/',
    MONGO_DB: process.env.MONGO_DB || 'assignment_db',
    SECURITY_CORS_ALLOW_ORIGIN: process.env.SECURITY_CORS_ALLOW_ORIGIN || "",
    SECURITY_CORS_ALLOW_METHODS: process.env.SECURITY_CORS_ALLOW_METHODS || "",
    SECURITY_CORS_ALLOW_HEADERS: process.env.SECURITY_CORS_ALLOW_HEADERS || "",
    SECURITY_CORS_ALLOW_CREDENTIALS:
      (process.env.SECURITY_CORS_ALLOW_CREDENTIALS || "true").toLowerCase() ===
      "true",
    SECURITY_JWT_SECRET: process.env.SECURITY_JWT_SECRET || 'd5951f0a-25b6-45f4-9b91-70a6b1fca0b0'
};

module.exports = Env;
