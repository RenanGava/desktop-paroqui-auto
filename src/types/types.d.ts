export {}

declare global {
    interface Window {
        api: {
            loginTheos: () => Promise<void>
        }
    }
}