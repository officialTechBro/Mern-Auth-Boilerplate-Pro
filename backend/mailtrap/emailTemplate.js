export const PASSWORD_RESET_REQUEST_TEMPLATE = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Password Reset</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f3f4f6;
                margin: 0;
                padding: 40px 0;
                color: #111827;
                }
                .container {
                background: #fff;
                max-width: 600px;
                margin: 0 auto;
                border-radius: 12px;
                box-shadow: 0 6px 20px rgba(0,0,0,0.08);
                }
                .header {
                background: linear-gradient(90deg, #4CAF50, #45a049);
                padding: 25px;
                text-align: center;
                color: #fff;
                }
                .content {
                padding: 30px;
                }
                .btn {
                background: #4CAF50;
                color: white;
                padding: 12px 30px;
                border-radius: 9999px;
                text-decoration: none;
                font-weight: bold;
                display: inline-block;
                margin: 25px 0;
                }
                .footer {
                border-top: 1px solid #e5e7eb;
                padding: 20px 30px;
                font-size: 12px;
                color: #6b7280;
                background: #fafafa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Reset your password</h2>
                </div>
                <div class="content">
                    <p>Hi,</p>
                    <p>We received a request to reset your password. Click the button below to create a new one:</p>
                    <div style="text-align:center;">
                        <a href="{resetUrl}" class="btn">Reset Password</a>
                    </div>
                    <p>This link will expire in 1 hour</p>
                    <p>If you didn’t request this, you can safely ignore this email.</p>
                    <p style="margin-top:20px; font-size:12px; color:#6b7280;">
                        Button not working? Copy this link:<br>
                        <span style="word-break:break-all; color:#16a34a;">{resetUrl}</span>
                    </p>
                </div>
                <div class="footer">
                    Best regards,<br>
                    The OfficialTechBro Team
                </div>
            </div>
        </body>
    </html>
`
export const VERIFY_EMAIL_TEMPLATE = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 0;
            color: #111827;
            }
            .container {
            background: #fff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            overflow: hidden;
            }
            .header {
            background: linear-gradient(90deg, #4CAF50, #45a049);
            padding: 25px;
            text-align: center;
            color: #fff;
            }
            .content {
            padding: 30px;
            }
            .code-box {
            background: #ecfdf3;
            border: 1px solid #bbf7d0;
            color: #166534;
            font-weight: bold;
            font-size: 30px;
            letter-spacing: 5px;
            padding: 15px 20px;
            border-radius: 10px;
            display: inline-block;
            margin: 20px auto;
            }
            .footer {
            border-top: 1px solid #e5e7eb;
            padding: 20px 30px;
            font-size: 12px;
            color: #6b7280;
            background: #fafafa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Verify your email</h2>
            </div>
            <div class="content">
                <p>Hi,</p>
                <p>Thanks for signing up! Use the code below to verify your email address.</p>
                <div style="text-align:center;">
                    <div class="code-box">{verificationCode}</div>
                </div>
                <p>This code will expire in !5 minutes.</p>
                <p>If you didn’t create this account, you can ignore this email.</p>
            </div>
            <div class="footer">
                Best regards,<br>
                The OfficialTechBro Team
            </div>
        </div>
    </body>
    </html>
`
export const PASSWORD_RESET_SUCCESSFUL_EMAIL = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Changed</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            margin: 0;
            padding: 40px 0;
            color: #111827;
            }
            .container {
            background: #fff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            }
            .header {
            background: linear-gradient(90deg, #4CAF50, #45a049);
            padding: 25px;
            text-align: center;
            color: #fff;
            }
            .content {
            padding: 30px;
            }
            .alert {
            background: #fef2f2;
            border: 1px solid #fee2e2;
            padding: 15px 20px;
            border-radius: 10px;
            color: #b91c1c;
            margin-top: 15px;
            }
            .footer {
            border-top: 1px solid #e5e7eb;
            padding: 20px 30px;
            font-size: 12px;
            color: #6b7280;
            background: #fafafa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Password updated</h2>
            </div>
            <div class="content">
                <p>Hi,</p>
                <p>Your password was successfully changed at {changedAt}.</p>
                <p>If you did not make this change, please reset your password immediately or contact support.</p>
                <div class="alert">
                    If this wasn't you, please secure your account now!
                </div>
            </div>
            <div class="footer">
                Best regards,<br>
                TheOfficialTechBro Team
            </div>
        </div>
    </body>
    </html>

`