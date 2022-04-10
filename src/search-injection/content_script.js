import * as utils from './utils'
import { handleRender } from './dom'

const url = window.location.href
const matched = utils.matchURL(url)

/**
 * Fetches SearchInjection user preferance from storage.
 * If set, proceed with matching URL and fetching search query
 */
export async function initSearchInjection({ requestSearcher, syncSettingsBG }) {
    if (matched) {
        try {
            const query = utils.fetchQuery(url)

            await handleRender(query, requestSearcher, matched)
        } catch (err) {
            console.error(err)
        }
    }
}
