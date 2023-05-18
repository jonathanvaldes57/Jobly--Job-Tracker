const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('./models/job-tracker-Models');
const GOOGLE_CLIENT_ID =
  '853208689945-blt9tg41gv9gbme12o6n2jstdrr4m97h.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, given_name, family_name } = profile._json;

      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [
          email,
        ]);

        let user;

        if (result.rowCount === 0) {
          // User doesn't exist, create a new user
          const insertResult = await db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [`${given_name} ${family_name}`, email]
          );
          user = insertResult.rows[0];
        } else {
          // User exists, update their information
          const updateResult = await db.query(
            'UPDATE users SET name = $1 WHERE email = $2 RETURNING *',
            [`${given_name} ${family_name}`, email]
          );
          user = updateResult.rows[0];
        }

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
});
// function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
