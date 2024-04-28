const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const PORT = process.env.PORT || 5001;
const helmet = require("helmet");
const RateLimiter = require("express-rate-limit");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const methodOverride = require("method-override");
const cors = require("cors");
// App && DB connection

const app = express();
dbConnect();

// Middleware

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method"));
// logger

app.use(morgan("combined"));

// rate limiter

const limiter = RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// routes

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// general error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// listen

app.listen(PORT, () => {
  console.log(`App running on Port: ${PORT}`);
});
