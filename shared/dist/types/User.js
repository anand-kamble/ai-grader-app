"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["Admin"] = "admin";
    UserType["Student"] = "student";
    UserType["Teacher"] = "teacher";
})(UserType || (exports.UserType = UserType = {}));
var UserError;
(function (UserError) {
    UserError["UserNotFound"] = "User not found";
    UserError["UserAlreadyExists"] = "User already exists";
    UserError["IncorrectPassword"] = "Incorrect password";
    UserError["InvalidEmail"] = "Invalid email";
    UserError["InvalidPassword"] = "Invalid password";
    UserError["UnknownError"] = "Unknown error";
})(UserError || (exports.UserError = UserError = {}));
