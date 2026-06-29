const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const validations = [
  body("name")
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage("Name must only contain alphabet letters"),
  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Email must be in the format abc@xyz.com"),
  body("password")
    .notEmpty()
    .trim()
    .withMessage("Password cannot be empty")
    .isStrongPassword()
    .withMessage(`Password must be greater than 8 characters, contain lower case 
      , upper case characters , number and a symbol`),
  body("confirmpass")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

function getSignUp(req, res) {
  res.render("/signup");
}

const postSignUp = [
  validations,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors });
    }

    const { name, email, password, confirmpass } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(name + email + password);
    /*const user = userModel.createUser({
      name,
      email,
      password: hashedPassword,
    });
    console.log(user);*/
  },
];

module.exports = { getSignUp, postSignUp };
