import User from "../models/user.model.js"
import crypto from 'crypto'
import { generateTokenAndSetCookies } from "../utils/generateTokens.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";


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
      res.status(500).json({success: false, message: "Error verifying user", error})
    }
}


export const loginUser = async (req, res) => {
  const {email, password} = req.body 
  
    try {
      const user = await User.findOne({email})
      if (!user && !(await user.comparePassword(password))) {
        return res.status(400).json({success: false, message: "Inavalid credentials"})
      }

      const token = generateTokenAndSetCookies(res, user._id)

      user.lastLogin = new Date()

      await user.save()

      res.status(200).json({
        success: true, 
        message: "User logged in successfully",
        user: {
          ...user._doc,
          password: undefined
        },
        token
      })
    } catch (error) {
      console.error('Error logging in user', error)
      res.status(500).json({success: false, message: "Error logged in user", error})
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({success: true, message: "User logged out successfully"})
    } catch (error) {
        res.status(500).json({success: false, message: "Error loging out user", error})
    }
}


export const forgotPassword = async (req, res) => {
    const {email} = req.body
    try {
      const user = await User.findOne({email})
      if (!user) {
        return res.status(400).json({success: false, message: "User not found"})
      }
      
      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString("hex")
      const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000

      user. resetPasswordToken = resetToken
      user.resetPasswordExpiresAt = resetTokenExpiresAt

      await user.save()

      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

      await sendPasswordResetEmail(user.email, resetUrl)

      res.status(200).json({success: true, message: "Password reset link sent to your email"})
    } catch (error) {
      console.error("Error in forget password", error)
        res.status(400).json({success: false, message: error.message})
    }
}


export const resetPassword = async (req, res) => {
  try {
    const {token} = req.params 
    const {password} = req.body

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: {$gt: Date.now()}
    })
    if (!user) {
      return res.status(400).json({success: false, message: "Invalid or expired reset token"})
    }

    // updatePassword
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined

    await user.save()

    await sendResetSuccessEmail(user.email)

    res.status(200).json({success: true, message: "Password reset successful"})
  } catch (error) {
    console.error("Error in resetPassword", error)
    res.staus(400).json({success: false, message: error.message})
  }
}