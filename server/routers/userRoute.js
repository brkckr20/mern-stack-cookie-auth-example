const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth")

//register - kayıt olma
router.post("/", async (req, res) => {
    try {
        const {email, password, passwordVerify} = req.body;
        if (!email || !passwordVerify || !password) {
            return res.status(400).json({
                errorMessage: "Tüm alanları doldurunuz!"
            });
        }
        if (password !== passwordVerify) {
            return res.status(400).json({
                errorMessage: "Şifreler eşleşmiyor!"
            })
        }

        const existUser = await User.findOne({email: email});
        if (existUser) {
            return res.status(400).json({
                errorMessage: "Bu mail ile daha önce kayıt olunmuş!"
            })
        }

        const salt = await bcrypt.genSalt();
        const passwordHasH = await bcrypt.hash(password, salt);

        //save new user
        const newUser = await new User({
            email,
            password: passwordHasH
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id,
        }, "secret123");

        //send token with HTTP-cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (err) {
        console.log(err);
        res.status(500).send("")
    }
});


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "Tüm alanları doldurunuz!"
            });
        }

        const existUser = await User.findOne({
            email
        });
        if (!existUser) {
            return res.status(401).json({errorMessage: "Kullanıcı adı veya şifre hatalı!"});
        }

        const passwordCorrect = await bcrypt.compare(password, existUser.password);
        if (!passwordCorrect) {
            return res.status(401).json({errorMessage: "Şifrenizi kontrol ediniz!"});
        }

        const token = jwt.sign({
            user: existUser._id,
        }, "secret123");

        //send token with HTTP-cookie
        res.cookie("token", token, {
            httpOnly: true
        }).send();

    } catch (err) {
        console.log(err);
        res.status(500).send("")
    }
})

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
})

router.get("/loggedin", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json(false)
        }

        jwt.verify(token, "secret123");
        res.send(true);

    } catch (err) {
        res.json(false)
    }
})


router.get("/", auth, async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);

    } catch (err) {
        console.log(err);
        res.status(500).send("")
    }
})

module.exports = router;