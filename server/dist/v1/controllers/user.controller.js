"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userList = exports.editProfile = exports.profile = exports.resetPassword = exports.otpAuth = exports.forgotPass = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_helper_1 = require("./../../helpers/generate.helper");
const otp_model_1 = __importDefault(require("../models/otp.model"));
const sendMail_hepler_1 = require("../../helpers/sendMail.hepler");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const isEmailExist = yield user_model_1.default.findOne({
        email: email,
    });
    if (isEmailExist) {
        res.json({
            code: 400,
        });
        return;
    }
    const newUser = {
        fullName: fullName,
        email: email,
        password: (0, md5_1.default)(password),
        token: (0, generate_helper_1.generateRandomString)(20),
    };
    const savedUser = yield user_model_1.default.create(newUser);
    res.json({
        code: 400,
        token: savedUser.token,
        id: savedUser._id,
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existUser = yield user_model_1.default.findOne({
        email: email,
    });
    if (!existUser) {
        res.json({
            code: 400,
        });
        return;
    }
    if ((0, md5_1.default)(password) !== existUser.password) {
        res.json({
            code: 400,
        });
        return;
    }
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: existUser.token,
        id: existUser._id,
    });
});
exports.login = login;
const forgotPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = (0, generate_helper_1.generateRandomNumber)(6);
    const existUser = yield user_model_1.default.findOne({
        email: email,
    });
    if (existUser) {
        const objectOtp = new otp_model_1.default({
            email: email,
            otp: otp,
            expireAt: Date.now() + 5 * 60 * 1000,
        });
        yield objectOtp.save();
        const subject = "Mã xác nhận OTP";
        const html = `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">GENDO</a>
          </div>
          <p style="font-size:1.1em">Xin chào ${existUser.fullName},</p>
          <p>Dưới đây là mã OTP xác thực để đổi mật khẩu. Vui lòng không chia sẻ cho bất kỳ ai. Mã OTP có hiệu lực trong 5 phút!</p>
          <h2
              style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
              ${objectOtp.otp}</h2>
          <p style="font-size:0.9em;">Trân trọng,<br />CELLO</p>
          <hr style="border:none;border-top:1px solid #eee" />`;
        yield (0, sendMail_hepler_1.sendMail)(email, subject, html);
        res.json({
            code: 200,
            message: "OTP code has been sent to your email!",
        });
    }
    else {
        res.json({
            code: 400,
            message: "Email does not exist in our system!",
        });
    }
});
exports.forgotPass = forgotPass;
const otpAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    const existOtp = yield otp_model_1.default.findOne({
        email: email,
        otp: otp,
    });
    if (existOtp) {
        const user = yield user_model_1.default.findOne({
            email: email,
        });
        res.json({
            code: 200,
            token: user.token,
        });
    }
    else {
        res.json({
            code: 400,
            message: "OTP code is not correct!",
        });
    }
});
exports.otpAuth = otpAuth;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = res.locals.user.token;
    const newPassword = req.body.password;
    yield user_model_1.default.updateOne({
        token: token,
    }, {
        password: (0, md5_1.default)(newPassword),
    });
    res.json({
        code: 200,
        message: "Reset password successfully!",
    });
});
exports.resetPassword = resetPassword;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        code: 200,
        info: res.locals.user,
    });
});
exports.profile = profile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.updateOne({
            _id: res.locals.user.id,
        }, req.body);
        const user = yield user_model_1.default.findOne({ _id: res.locals.user.id }).select("-password token");
        res.json({
            code: 200,
            message: "Updated profile successfully!",
            user: user,
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Updated profile failed!",
        });
    }
});
exports.editProfile = editProfile;
const userList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = [];
    if (req.query.keyword) {
        const keyword = new RegExp(`${req.query.keyword}`, "i");
        users = yield user_model_1.default.find({ fullName: keyword })
            .select("id fullname email")
            .limit(7);
    }
    res.json({
        code: 200,
        users: users,
    });
});
exports.userList = userList;
