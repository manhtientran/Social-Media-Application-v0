const config = {
  port: process.env.PORT || 3001,
  postgresUri:
    process.env.POSTGRES_URI || "postgresql://localhost:5432/socialMediaApp",
};

export default config;
