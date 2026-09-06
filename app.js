require('dotenv').config()

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");
const { connectToMongoDb } = require("./connect");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// mongodb connection
connectToMongoDb(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"));

// view engine
app.set("view engine", "ejs");
app.set("views", path.resolve( "./views"));

// routes
app.get("/", async(req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use("/user", urlRoute);
app.use("/blog", blogRoute);

app.listen(process.env.PORT, () => {
    console.log(`The Server is running on ${process.env.PORT}`);
})