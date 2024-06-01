const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getFirestore } = require('firebase-admin/firestore');
const { admin, db } = require('./firebase-config');

passport.use(new GoogleStrategy({
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
async (accessToken, refreshToken, profile, done) => {
  try {
    const userRef = db.collection('users').doc(profile.id);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value
      });
    }

    done(null, profile);
  } catch (error) {
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
