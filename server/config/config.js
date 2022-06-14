const config = {
  port: process.env.PORT || 5000,
  jwtSecret: "JWT_SECRET",
  postgresUri:
    process.env.POSTGRES_URI ||
    "postgresql://postgres:postgres@localhost:5432/socialMediaApp",
};

export default config;
