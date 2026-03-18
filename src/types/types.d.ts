export {}

declare global {
    interface Window {
        api: {
            loginTheos: () => Promise<void>
        },
        env: {
            API_URL: string
        }
    }
}