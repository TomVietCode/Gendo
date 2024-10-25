"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const nums = "0123456789";
    var result = "";
    for (let i = 0; i < length; i++) {
        result += nums.charAt(Math.floor(Math.random() * nums.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
