declare global {
    interface Window {
        api: {
            getData: () => Promise<void>
        }
    }
}