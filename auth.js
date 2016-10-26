import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
  const Users = app.datasource.models.Users;
  const cfg = app.config;
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = cfg.jwtSecret;
  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
    .then((user) => {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email,
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  });
  passport.use(strategy);
  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', cfg.jwtSession),
  };
};
