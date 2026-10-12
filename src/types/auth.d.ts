export { }

declare global {

    interface IUserData {
        jwt: string;
        user: {
            id: number
            documentId: string
            username: string
            email: string
        }
    }

    interface ICreateUser{
        username: string
        email: string
        password: string
    }
}