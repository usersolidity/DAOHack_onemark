import 'core-js'
import type { ContentScriptComponent } from '../types'
import { shouldIncludeSearchInjection } from 'src/search-injection/detection'
import { main as searchInjectionMain } from 'src/content-scripts/content_script/search-injection'
import type { ContentScriptRegistry } from './types'

// import { maybeRenderTutorial } from 'src/in-page-ui/guided-tutorial/content-script'

// Content Scripts are separate bundles of javascript code that can be loaded
// on demand by the browser, as needed. This main function manages the initialisation
// and dependencies of content scripts.

export async function main(
    params: {
        loadRemotely?: boolean
    } = {},
) {
    params.loadRemotely = params.loadRemotely ?? true

    // 4. Create a contentScriptRegistry object with functions for each content script
    // component, that when run, initialise the respective component with its
    // dependencies
    const contentScriptRegistry: ContentScriptRegistry = {
        async registerSearchInjectionScript(execute): Promise<void> {
            await execute({
                requestSearcher: console.log('requestSearcher'),
                syncSettingsBG: console.log('syncSettingsBG'),
            })
        },
    }

    window['contentScriptRegistry'] = contentScriptRegistry

    if (
        shouldIncludeSearchInjection(
            window.location.hostname,
            window.location.href,
        )
    ) {
        await contentScriptRegistry.registerSearchInjectionScript(
            searchInjectionMain,
        )
    }

    return {}
}

type ContentScriptLoader = (component: ContentScriptComponent) => Promise<void>
export function createContentScriptLoader(args: { loadRemotely: boolean }) {
    const localLoader: ContentScriptLoader = async (
        component: ContentScriptComponent,
    ) => {
        const script = document.createElement('script')
        script.src = `../content_script_${component}.js`
        document.body.appendChild(script)
    }

    return localLoader
}

export function loadRibbonOnMouseOver(loadRibbon: () => void) {
    const listener = (event: MouseEvent) => {
        if (event.clientX > window.innerWidth - 200) {
            loadRibbon()
            document.removeEventListener('mousemove', listener)
        }
    }
    document.addEventListener('mousemove', listener)
}
