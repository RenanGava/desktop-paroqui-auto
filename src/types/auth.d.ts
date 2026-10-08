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
}