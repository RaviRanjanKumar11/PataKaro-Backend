import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { generateApiKey } from "../utils/generateApiKey";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "https://patakaro-backendnew.onrender.com/auth/google/callback",
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        let user = await User.findOne({
          googleId: profile.id,
        });

        // If user exists but no API key (old user)
        if (user) {

          if (!user.apiKey) {
            user.apiKey = generateApiKey();
            await user.save();
          }

          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          apiKey: generateApiKey(),
          usage: 0,
          plan: "free"
        });

        return done(null, user);

      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);

// Save user id in session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Get user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});