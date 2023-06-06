interface ILogin {
    username: String
    password: String
}
interface IUserInfo {
    username: String
    loginState: Boolean
    token: String
}
interface IBreadCom {
    title: String
    redirectPath: String
    comName: String
}

export type {
    ILogin,
    IUserInfo,
    IBreadCom
}