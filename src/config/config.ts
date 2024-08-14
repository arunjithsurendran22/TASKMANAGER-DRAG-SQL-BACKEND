export default {
  port: process.env.PORT || 3004,
  mongo: {
    uri: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "default_jwt_secret",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES || "30",
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS || "30",
  },
  tokenTypes: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
