const config = {
  port: process.env.PORT || 5000,
  postgresUri:
    process.env.POSTGRES_URI ||
    "postgresql://postgres:postgres@localhost:5432/socialMediaApp",
};

export default config;
