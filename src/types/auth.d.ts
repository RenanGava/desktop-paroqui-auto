export { }

declare global {

    interface IUserData {
        id: number
        documentId: string
        username: string
        email: string
        paroquia: IParoquia
    }

    interface ICreateUser {
        username: string
        email: string
        password: string
    }

    interface IParoquia {
        id: number | string
        documentId: string
    }
}