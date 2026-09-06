const express = require("express");
const User = require("../models/user");
const { TokenExpiredError } = require("jsonwebtoken");

const router = express.Router();

router.get("/signin", (req, res) => {
    res.render("signin");
})

router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
   
    try{
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    }catch(error){
        return res.render("signin", {
            error: "Incorrect email or password!",
        })
    }
   
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.post("/signup", async(req, res) => {
    const { fullName, email, password } = req.body;

    const user = await User.create({
        fullName,
        email,
        password,
    })

    const token = await User.matchPasswordAndGenerateToken(email, password);
    res.cookie("token", token);
    return res.redirect("/");
})

router.get("/logout", (req, res) => {
    res.clearCookie("token").redirect("/");
})

module.exports = router;