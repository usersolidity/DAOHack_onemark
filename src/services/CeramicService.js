import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { Core } from '@self.id/core'
import { ModelManager } from '@glazed/devtools'
const CERAMIC_URL = 'https://ceramic-clay.3boxlabs.com'

export class CeramicService {
    constructor(ceramic) {
        this._ceramic = ceramic
    }

    async buildDataModelStore(modelDefition) {
        const manager = new ModelManager(this._ceramic)
        manager.addJSONModel(modelDefition)

        const publishedModel = await manager.toPublished()

        const model = new DataModel({
            ceramic: this._ceramic,
            model: publishedModel,
        })
        const dataStore = new DIDDataStore({ ceramic: this._ceramic, model })

        return { model, publishedModel, dataStore }
    }

    async getStoreData(dataStore, alias) {
        const result = await dataStore.get(alias)

        return result
    }

    async setStoreData(dataStore, data, alias) {
        await dataStore.set(alias, data)
    }

    async pullStoreDataByDID(publishedModel, did, alias) {
        const core = new Core({ ceramic: CERAMIC_URL, model: publishedModel })
        const documents = await core.get(alias, did)

        return documents[alias]
    }
}
