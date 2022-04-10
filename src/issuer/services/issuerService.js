const { knownDataTypes } = require('../helpers')
const { ethers } = require('ethers')
const bip39 = require('bip39')

const { SEED } = process.env

class IssuerService {
    constructor(didInstance) {
        this._did = didInstance
    }

    get did() {
        return this._did
    }

    async issue({ type, data }) {
        if (!knownDataTypes.includes(type)) {
            throw Error(
                `${type} data type not supported, supported are ${knownDataTypes}`,
            )
        }

        const deepSkillsDocument = data
        deepSkillsDocument.issuerDid = this.did._id
        // TODO just hash should be signed and not whole document
        const jws = await this._did.createJWS(deepSkillsDocument)
        const signature = jws.signatures[0].signature
        deepSkillsDocument.signature = signature // Should whole proof section
        deepSkillsDocument.type = type

        return deepSkillsDocument
    }

    static async createLITAuthSig() {
        const mnemonic = bip39.entropyToMnemonic(SEED)
        const wallet = ethers.Wallet.fromMnemonic(mnemonic)
        const signedMessage = `I am creating an account to use Lit Protocol at ${new Date().toISOString()}`
        const sig = await wallet.signMessage(signedMessage)
        const address = await wallet.getAddress()

        const authSig = {
            sig,
            derivedVia: 'web3.eth.personal.sign',
            signedMessage,
            address,
        }

        return authSig
    }
}

module.exports = IssuerService
