import bcrypt from "bcrypt"
import jwt from"jsonwebtoken"
import { Usermodel } from "../models/user.model.js";

async function registerUser(req, res) {

    const { username, email, password } = req.body;

    const isUserAlreadyExists = await Usermodel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Usermodel.create({
        username,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            username: user.username
        }
    })

}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await Usermodel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id:user._id,
        email:user.email,
        username:user.username
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}


const authController = { registerUser, loginUser, logoutUser };

export default authController;