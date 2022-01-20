module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '94f0e7900312ccf4c4d0bba2c49b2256'),
  },
});
