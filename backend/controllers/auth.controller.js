import User from "../models/user.model.js"
import { generateTokenAndSetCookies } from "../utils/generateTokens.js"
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";


export const signUpUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // basic validation
    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check if user exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
 
    // create user
    const user = new User({
      email,
      password,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hrs
    });

    await user.save();

    // set cookie + get token 
    const token = generateTokenAndSetCookies(res, user._id);

     await sendVerificationEmail(user.email, verificationToken)

    // send response once
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
      token, 
    });
    
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ success: false, message: "Error registering user" });
  }
};


export const verifyEmail = async (req, res) => {
  const {code} = req.body
    try {
      const user = await User.findOne({
        verificationToken: code,
        verificationTokenExpiresAt: {$gt: Date.now()}
      })
      if (!user) {
        return res.status(400).json({success: false, message: "Invalid or expired verification code"})
      }

      user.isVerified = true
      user.verificationToken = undefined
      user.verificationTokenExpiresAt = undefined

      await user.save()

      await sendWelcomeEmail(user.email, user.name)

      res.status(200).json({ 
        success: true, 
        message: "Email verified successfully",
        user: {
          ...user._doc,
          password: undefined
        }
      })
    } catch (error) {
      console.error("verifyEmail error:", error);
        res.status(500).json({message: "Error verifying user", error})
    }
}


export const loginUser = (req, res) => {
    try {
        res.status(200).json({message: "User registered successfully"})
    } catch (error) {
        res.status(500).json({message: "Error logged in user", error})
    }
}


export const logoutUser = (req, res) => {
    try {
        res.status(200).json({message: "User logged out successfully"})
    } catch (error) {
        res.status(500).json({message: "Error loging out user", error})
    }
}