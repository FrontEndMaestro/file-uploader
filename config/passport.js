const passport = require("passport");
const localStratgy = require("passport-local");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const { prisma } = require("../lib/prisma");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new localStratgy(customFields, async function verify(
    username,
    password,
    done,
  ) {
    try {
      const user = await userModel.findUser({ email: username });
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findUserById(id);
    done(null, user);
  } catch (error) {
    return done(error);
  }
});
