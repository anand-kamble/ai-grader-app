export declare enum UserType {
    Admin = "admin",
    Student = "student",
    Teacher = "teacher"
}
export interface User {
    id: string;
    type: UserType;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare enum UserError {
    UserNotFound = "User not found",
    UserAlreadyExists = "User already exists",
    IncorrectPassword = "Incorrect password",
    InvalidEmail = "Invalid email",
    InvalidPassword = "Invalid password",
    UnknownError = "Unknown error"
}
export interface UserLogin {
}
