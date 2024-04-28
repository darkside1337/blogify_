const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* 
    auth:
    login
    signup
    logout
*/

// SIGNUP CONTROLLER

const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // check if user already exists

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    return res.status(400).json({ error: "User already exists!" });
  }

  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Database failure, try again later!" });
  }
};

// LOGIN CONTROLLER

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User does not exist!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    // destructure password from the user data

    const { password: pwd, ...userData } = user.toObject();

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 * 1000 } // one day
    );

    /*     const refreshToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: 7 * 24 * 60 * 60 * 1000 } // seven days
    ); */

    return res.status(200).json({
      accessToken,
      /* refreshToken, */
      ...userData,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// LOGOUT CONTROLLER

const logout = async (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
};
