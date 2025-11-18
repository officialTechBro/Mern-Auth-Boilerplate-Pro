import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESSFUL_EMAIL, VERIFY_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"



export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({ 
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFY_EMAIL_TEMPLATE.replaceAll("{verificationCode}", verificationToken),
            category: "Email Verification"
        })
        console.log("Email sent successfully", response)
    } catch (error) {
        console.error(`Error sending verification`, error)
        throw new Error(`Error sending verification email: ${error}`)
    }
}


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]
        
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "0c1d193b-99ce-426b-830a-cd47a8d22f4e",
            template_variables: {
                "company_info_name": "MERN Auth",
                "name": name
            }
        })

        console.log("Welcome email sent successfully", response)
    } catch (error) {
        console.error("Error sending welcome email", error)
        throw new Error(`Error sending welcome error: ${error}`)
    }
}


export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}]
    
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replaceAll("{resetUrl}", resetURL),
            category: "Password Reset"
        })

        console.log("Welcome password reset email sent successfully", response)
    } catch (error) {
        console.error(`Error sending password reset email`, error)
        throw new Error(`Error sending password reset email: ${error}`)
    }
}


export const sendResetSuccessEmail = async (email) => {
    const reciepient = [{email}]
    const date = new Date()
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: reciepient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESSFUL_EMAIL.replaceAll("{changedAt}", date),
            category: "Password Reset"
        })
        console.log("Password reset email send successfully", response)
    } catch (error) {
        console.error(`Error sending password reset success email`, error)
        throw new Error(`Error sending password reset success email: ${error}`)
    }
}