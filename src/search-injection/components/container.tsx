import React from 'react'
import { browser } from 'webextension-polyfill-ts'
import Results from './Results'
import strictUriEncode from 'strict-uri-encode'
import ResultItem from './ResultItem'
import RemovedText from './RemovedText'
import * as constants from '../constants'
import type { SearchEngineName, ResultItemProps } from '../types'
import { OVERVIEW_URL } from 'src/constants'
import styled from 'styled-components'
import { SearchIcon } from '@heroicons/react/outline'

export interface Props {
    // results: ResultItemProps[]
    // len: number
    rerender: () => void
    searchEngine: SearchEngineName
    syncSettings
    query
    requestSearcher
    position
}

interface State {
    isCloudUpgradeBannerShown: boolean
    isSubscriptionBannerShown: boolean
    hideResults: boolean
    dropdown: boolean
    removed: boolean
    isNotif: boolean
    position: 'side' | 'above'
    notification: any
    searchResults: ResultItemProps[] | null
}

class Container extends React.Component<Props, State> {
    trackEvent: any
    readNotification: any
    fetchNotifById: any
    processEvent: any
    openOverviewRPC: any
    syncSettings: void

    constructor(props: Props) {
        super(props)
        this.renderResultItems = this.renderResultItems.bind(this)
        this.seeMoreResults = this.seeMoreResults.bind(this)
        this.toggleHideResults = this.toggleHideResults.bind(this)
        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.closeDropdown = this.closeDropdown.bind(this)
        this.removeResults = this.removeResults.bind(this)
        this.undoRemove = this.undoRemove.bind(this)
        this.changePosition = this.changePosition.bind(this)
        this.handleClickTick = this.handleClickTick.bind(this)
    }

    state: State = {
        isCloudUpgradeBannerShown: false,
        isSubscriptionBannerShown: false,
        hideResults: true,
        dropdown: false,
        removed: false,
        position: null,
        isNotif: true,
        notification: {},
        searchResults: null,
    }

    handleResultLinkClick = () => console.log('click link')

    async componentDidMount() {
        let notification

        const hideResults = false
        const position = 'side'

        let fetchNotif
        if (notification) {
            fetchNotif = await this.fetchNotifById(notification.id)
        }

        this.setState({
            hideResults,
            position,
            isNotif: fetchNotif && !fetchNotif.readTime,
            notification,
            isCloudUpgradeBannerShown: false,
            isSubscriptionBannerShown: false,
        })

        const limit = constants.LIMIT[this.props.position]
        const query = this.props.query

        try {
            // const searchRes = await this.props.requestSearcher({
            //     query,
            //     limit: limit,
            // })

            const caca: ResultItemProps[] = [
                {
                    onLinkClick: this.handleResultLinkClick,
                    searchEngine: 'duckduckgo',
                    displayTime: 1414602645000,
                    url: 'https://jamalavedra.me',
                    tags: [],
                    title: 'Jamal test',
                },
                {
                    onLinkClick: this.handleResultLinkClick,
                    searchEngine: 'duckduckgo',
                    displayTime: 1414602645000,
                    url: 'https://jamalavedra.me',
                    tags: [],
                    title: 'Jamal test',
                },
            ]

            const searchRes = { docs: caca, totalCount: 0 }
            const searchResDocs = searchRes.docs.slice(0, limit)

            this.setState({
                searchResults: searchResDocs,
            })
        } catch (e) {
            const searchRes = []
            const searchResDocs = searchRes.slice(0, limit)
            console.log(e)
            this.setState({
                searchResults: searchResDocs,
            })
        }
    }

    renderResultItems() {
        if (!this.state.searchResults) {
            return <LoadingBox></LoadingBox>
        }

        if (this.state.searchResults?.length > 0) {
            const resultItems = this.state.searchResults.map((result, i) => (
                <>
                    <ResultItem
                        key={i}
                        onLinkClick={() => {
                            console.log('onLinkClick')
                        }}
                        searchEngine={this.props.searchEngine}
                        {...result}
                        displayTime={result.displayTime}
                        url={result.url}
                        title={result.title}
                        tags={result.tags}
                    />
                </>
            ))

            return resultItems
        }

        if (this.state.searchResults?.length === 0) {
            return (
                <NoResultsSection>
                    <SectionCircle>
                        <div
                            style={{
                                padding: '4px',
                                display: 'flex',
                                borderRadius: '3px',
                                cursor: 'default',
                            }}
                        >
                            <SearchIcon
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center center',
                                    color: 'rgb(52, 122, 226)',
                                }}
                            />
                        </div>
                    </SectionCircle>
                    <SectionTitle>No Results for this Query</SectionTitle>
                    <InfoText>
                        For more flexible search,
                        <SearchLink onClick={this.seeMoreResults}>
                            {' '}
                            go to the dashboard
                        </SearchLink>
                    </InfoText>
                </NoResultsSection>
            )
        }
    }

    seeMoreResults() {
        // Create a new tab with the query overview URL
        const query = new URL(location.href).searchParams.get('q')
        const finalQuery = strictUriEncode(query)

        this.openOverviewRPC('query=' + finalQuery)
    }

    async toggleHideResults() {
        // Toggles hideResults (minimize) state
        // And also, sets dropdown to false
        const toggled = !this.state.hideResults

        this.setState({
            hideResults: toggled,
            dropdown: false,
        })
    }

    toggleDropdown() {
        this.setState((state) => ({
            ...state,
            dropdown: !state.dropdown,
        }))
    }

    closeDropdown() {
        this.setState({
            dropdown: false,
        })
    }

    /**
     * Handles persisting the enabled (removed) state for current search engine, without affecting other
     * search engine preferences.
     *
     * @param {boolean} isEnabled
     */
    async _persistEnabledChange(isEnabled) {}

    async removeResults() {
        // Sets the search injection key to false
        // And sets removed state to true
        // Triggering the Removed text UI to pop up
        await this._persistEnabledChange(false)

        this.setState({
            removed: true,
            dropdown: false,
        })
    }

    async undoRemove() {
        await this._persistEnabledChange(true)

        this.setState({
            removed: false,
        })
    }

    async changePosition() {
        this.props.rerender()
    }

    async handleClickTick() {
        await this.readNotification(this.state.notification.id)

        this.setState({
            isNotif: false,
        })
    }

    handleToggleStorageOption(action, value) {
        action = {
            ...action,
            value,
        }
    }

    handleClickOpenNewTabButton(url) {
        window.open(url, '_blank').focus()
    }

    async openDashboard() {
        await browser.tabs.create({ url: OVERVIEW_URL })
    }

    render() {
        // If the state.removed is true, show the RemovedText component
        if (this.state.removed) {
            return <RemovedText undo={this.undoRemove} />
        }

        if (!this.state.position) {
            return null
        }

        return (
            <>
                {/* {this.state.isSubscriptionBannerShown && (
                    <PioneerPlanBanner
                        onHideClick={this.handleSubBannerDismiss}
                        direction="column"
                        showCloseButton={true}
                    />
                )} */}
                <Results
                    position={this.state.position}
                    searchEngine={this.props.searchEngine}
                    totalCount={this.state.searchResults?.length}
                    seeMoreResults={this.seeMoreResults}
                    toggleHideResults={this.toggleHideResults}
                    hideResults={this.state.hideResults}
                    toggleDropdown={this.toggleDropdown}
                    closeDropdown={this.closeDropdown}
                    dropdown={this.state.dropdown}
                    removeResults={this.removeResults}
                    changePosition={this.changePosition}
                    renderResultItems={this.renderResultItems}
                />
            </>
        )
    }
}

const SearchLink = styled.span`
    padding-left: 2px;
    cursor: pointer;
    color: blue;
`

const NoResultsSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px 0px;
`

const SectionCircle = styled.div`
    background: rgb(230, 241, 255);
    border-radius: 100px;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`

const SectionTitle = styled.div`
    color: rgb(41, 44, 56);
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`

const InfoText = styled.div`
    color: rgb(150, 160, 181);
    font-size: 14px;
    font-weight: 400;
    text-align: center;
`

const LoadingBox = styled.div`
    border-radius: 3px;
    margin-bottom: 30px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Container
