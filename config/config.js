export default {
  database: `${process.env.NODE_ENV}_books`,
  username: 'postgres',
  password: 'rea123',
  params: {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres',
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'JWTS3CR3T',
  jwtSession: { session: false },
};
