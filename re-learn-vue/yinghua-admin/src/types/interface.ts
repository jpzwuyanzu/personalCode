interface ILogin {
    username: String
    password: String
}
interface IUserInfo {
    username: String
    loginState: Boolean
    token: String
}

export type {
    ILogin,
    IUserInfo
}