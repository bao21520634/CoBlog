const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const OTPToken = require("../models/OTPToken");

const { generateOTP, mailTransport } = require("../../utils/mail");
const { isValidObjectId } = require("mongoose");

const UserFollowBlock = require("../models/UserFollowBlock");

class UserController {
    // [GET] /auth
    async index(req, res) {

        try {
            const user = await User.findById(req.userId);

            if (!user) return res.status(400).json({ success: false, message: "User not found" });

            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    // [POST] /auth/signin
    async signin(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) return res.status(404).json({ success: false, message: "User not found" });

            if (!user.verified)
                return res
                    .status(404)
                    .json({ success: false, message: "Email has not been verified. Please recreate your account" });

            const isPasswordCorrect = await user.comparePassword(password);

            if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

            res.status(200).json({ success: true, user, token });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    // [POST] /auth/signup
    async signup(req, res) {
        const { email, password, confirmPassword } = req.body;
        // username take name from email. Example: test@gmail.com -> test
        const username = email.replace(/@(.*)/, "");
        const name = username.toUpperCase();

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                if (!existingUser.verified) {
                    await OTPToken.deleteMany({ _userId: existingUser._id });
                    await User.findByIdAndDelete(existingUser._id);
                } else {
                    return res.status(400).json({ success: false, message: "User already exists" });
                }
            }

            if (password !== confirmPassword)
                return res.status(400).json({ success: false, message: "Password don't match" });

            const user = new User({ username, name, email, password });

            const otp = generateOTP();

            const verificationToken = new OTPToken({ _userId: user._id, token: otp });

            await verificationToken.save();
            await user.save();

            mailTransport().sendMail({
                from: process.env.GMAIL,
                to: user.email,
                subject: "Verify your email account",
                html: `
                    <div style="text-align: center;">
                        <h2>Đây là mã OTP của bạn</h2>
                        <br />
                        <h1>${otp}</h1>
                        <br />
                        <h3>Vui lòng quay trở lại ứng dụng và nhập mã OTP trên để tiến hành xác thực email</h3>
                    </div>
                `,
            });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

            res.status(200).json({ success: true, user, token });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async verifyEmail(req, res) {
        const { otp } = req.body;

        try {
            const user = await User.findById(req.userId);

            if (!otp.trim())
                return res.status(400).json({ success: false, message: "Invalid request, missing params" });

            if (!isValidObjectId(user._id))
                return res.status(400).json({ success: false, message: "Invalid credentials" });

            if (!user) return res.status(404).json({ success: false, message: "User not found" });

            const token = await OTPToken.findOne({ _userId: user._id });

            if (!token) return res.status(404).json({ success: false, message: "User not found" });

            const isMatched = await token.compareToken(otp);

            if (!isMatched) return res.status(404).json({ success: false, message: "Invalid token" });

            user.verified = true;

            await OTPToken.findByIdAndDelete(token._id);
            await user.save();

            res.status(200).json({ success: true, message: "Verified!", user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async sendMailForForgotPassword(req, res) {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const otp = generateOTP();

            const verificationToken = new OTPToken({ _userId: user._id, token: otp });

            await verificationToken.save();

            mailTransport().sendMail({
                from: process.env.GMAIL,
                to: email,
                subject: "Verify your email account",
                html: `
                        <div style="text-align: center;">
                            <h2>Đây là mã OTP của bạn</h2>
                            <br />
                            <h1>${otp}</h1>
                            <br />
                            <h3>Vui lòng quay trở lại ứng dụng và nhập mã OTP trên để tiến hành xác thực email</h3>
                        </div>
                    `,
            });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

            res.status(200).json({ success: true, message: "Mail sent", user, token });
        } else {
            res.status(400).json({ success: false, message: "Email doesnt exist" });
        }
    }

    async forgotPassword(req, res) {
        const { password, confirmPassword } = req.body;

        try {
            const user = await User.findById(req.userId);

            if (!user) return res.status(400).json({ success: false, message: "User not found" });

            if (password !== confirmPassword)
                return res.status(400).json({ success: false, message: "Password don't match" });

            user.password = password;
            await user.save();

            res.status(200).json({ success: true, message: "Password has been changed", user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async changePassword(req, res) {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        try {
            const user = await User.findById(req.userId);

            if (!user) return res.status(400).json({ success: false, message: "User not found" });

            if (newPassword !== confirmNewPassword)
                return res.status(400).json({ success: false, message: "Password don't match" });

            const isCurrentPasswordCorrect = await user.comparePassword(currentPassword);

            if (!isCurrentPasswordCorrect)
                return res.status(400).json({ success: false, message: "Invalid credentials" });

            const isNewPasswordCorrect = await user.comparePassword(newPassword);

            if (isNewPasswordCorrect)
                return res.status(400).json({ success: false, message: "Password must be different" });

            user.password = newPassword;
            await user.save();

            res.status(200).json({ success: true, message: "Password has been changed", user });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async getProfile(req, res) {
        const { authorId } = req.body;

        const profileWithoutFollowed = await User.findById(authorId);
        const userFollower = await UserFollowBlock.findOne({ _userId: req.userId, _followerId: authorId });
        const profile = { ...profileWithoutFollowed.toObject(), status: userFollower?.status };

        res.status(200).json({ success: true, message: "Profile has been updated", profile });
    }

    async updateProfile(req, res) {
        const changedData = req.body;

        try {
            const profile = await User.findByIdAndUpdate(req.userId, changedData, { new: true });

            res.status(200).json({ success: true, message: "Profile has been changed", profile: profile });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async deleteAccount(req, res) {
        const { password } = req.body;

        try {
            const user = await User.findById(req.userId);

            if (!user) return res.status(400).json({ success: false, message: "User not found" });

            if (!password) return res.status(400).json({ success: false, message: "Invalid request, missing params" });

            const isPasswordCorrect = await user.comparePassword(password);

            if (!isPasswordCorrect) return res.status(400).json({ success: false, message: "Password isn't correct" });

            await UserProfile.findOneAndDelete({ _userId: user._id });
            await User.findByIdAndDelete(user._id);

            res.status(200).json({ success: true, message: "Account deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async searchAuthor(req, res) {
        const { name } = req.body;

        try {
            const regex = new RegExp(name.trim(), 'i')
            const listSearchUserWithoutFollowed = await User.find({ username: { $regex: regex } }).sort({ followerNumber: -1 });

            if (!listSearchUserWithoutFollowed) return res.status(400).json({ success: false, message: "Zero user" });

            const userList = [];

            for (var userWithoutFollowed of listSearchUserWithoutFollowed) {
                const isFollowed = await UserFollowBlock.findOne({ _followerId: userWithoutFollowed._id, _userId: req.userId }) ? true : false;

                userList.push({
                    ...userWithoutFollowed.toObject(),
                    isFollowed,
                })
            }

            res.status(200).json({ success: true, userList });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

module.exports = new UserController();
