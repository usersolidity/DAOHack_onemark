import { getProvider, requestAccounts } from './provider'
export const connectMetamask = async () => {
    const provider = await getProvider()
    await requestAccounts(provider)
}

export const isMetamaskConnected = async (e) => {
    try {
        const provider = await getProvider()
        const accounts = await provider.listAccounts()
        return accounts.length > 0
    } catch (e) {
        return false
    }
}

export const listenConnectionMetamask = async (cab) => {
    window?.ethereum?.on('accountsChanged', async function (accounts) {
        cab(accounts.length > 0)
    })
}
