const Yup = require("yup");
const { parseErrors } = require("../utils/utils");

//

let signupSchema = Yup.object({
  username: Yup.string()
    .min(3, "Display name must be at least 3 characters")
    .required("Display name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).*/,
      "Password must contain at least one capital letter and one number"
    ),
  confirmPassword: Yup.string()
    .label("confirm password")
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const validateSignupData = async (req, res, next) => {
  const body = req.body;
  try {
    await signupSchema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    // beautify the error messages

    const parsedErrors = parseErrors(error);

    return res.status(400).json(parsedErrors);
  }
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const validateLoginData = async (req, res, next) => {
  const body = req.body;

  try {
    await loginSchema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    // beautify the error messages

    const parsedErrors = parseErrors(error);

    return res.status(400).json(parsedErrors);
  }
};

module.exports = { validateSignupData, validateLoginData };
