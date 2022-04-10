import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown'
import styled from 'styled-components'
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    CogIcon,
    SearchIcon,
} from '@heroicons/react/outline'

const Results = (props) => {
    // const searchEngineClass = `${props.searchEngine}_${props.position}`
    return (
        <>
            <MemexContainer
                position={props.position}
                hideResults={props.hideResults}
                // searchEngine={props.searchEngine}
            >
                <TopBarArea hideResults={props.hideResults}>
                    <ResultsBox>
                        <button
                            onClick={props.toggleHideResults}
                            style={{
                                padding: '4px',
                                border: 'none',
                                background: 'white',
                                display: 'flex',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            {props.hideResults ? (
                                <ChevronDoubleDownIcon
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center center',
                                        color: 'rgb(150, 160, 181)',
                                    }}
                                />
                            ) : (
                                <ChevronDoubleUpIcon
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center center',
                                        color: 'rgb(150, 160, 181)',
                                    }}
                                />
                            )}
                        </button>
                        <TotalCount>{props.totalCount}</TotalCount>
                        <ResultsText>Onemark Results</ResultsText>
                    </ResultsBox>
                    <IconArea>
                        <button
                            onClick={props.seeMoreResults}
                            style={{
                                padding: '4px',
                                border: 'none',
                                background: 'white',
                                display: 'flex',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            <SearchIcon
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center center',
                                    color: 'rgb(150, 160, 181)',
                                }}
                            />
                        </button>
                        <SettingsButtonContainer>
                            <button
                                onClick={props.toggleDropdown}
                                style={{
                                    padding: '4px',
                                    border: 'none',
                                    background: 'white',
                                    display: 'flex',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                }}
                            >
                                <CogIcon
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        WebkitMaskSize: 'contain',
                                        WebkitMaskRepeat: 'no-repeat',
                                        WebkitMaskPosition: 'center center',
                                        color: 'rgb(150, 160, 181)',
                                    }}
                                />
                            </button>
                            {props.dropdown && (
                                <Dropdown
                                    remove={props.removeResults}
                                    rerender={props.changePosition}
                                    closeDropdown={props.closeDropdown}
                                />
                            )}
                        </SettingsButtonContainer>
                    </IconArea>
                </TopBarArea>
                {!props.hideResults && (
                    <ResultsContainer>
                        {props.renderResultItems()}
                    </ResultsContainer>
                )}
            </MemexContainer>
        </>
    )
}

const SettingsButtonContainer = styled.div`
    height: 24px;
`

const MemexContainer = styled.div<{ hideResults; position }>`
    display: flex;
    flex-direction: column;
    height: ${(props) => (props.hideResults ? 'fit-content' : '650px')};
    width: ${(props) =>
        props.position === 'above' ? 'fill-available' : '450px'};
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: fadeIn 1s ease-in;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-radius: 8px;
    margin-right: 30px;
    background: white;
`

const TopBarArea = styled.div<{ hideResults }>`
    border-bottom: 1px solid rgb(240, 240, 240);
    border-bottom: ${(props) =>
        props.hideResults ? 'none' : '1px solid rgb(240, 240, 240)'};
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
`

const ResultsBox = styled.div`
    display: grid;
    grid-gap: 5px;
    align-items: center;
    grid-auto-flow: column;
    align-items: center;
`

const TotalCount = styled.div`
    color: blue;
    font-weight: bold;
    font-size: 16px;
`

const ResultsText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 16px;
`

const IconArea = styled.div`
    display: grid;
    grid-gap: 10px;
    align-items: center;
    grid-auto-flow: column;
`

const ResultsContainer = styled.div`
    display: flex;
    flex: 1;
    height: fill-available;
    flex-direction: column;
    overflow: scroll;
    height: 500px;

    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`

Results.propTypes = {
    position: PropTypes.string.isRequired,
    searchEngine: PropTypes.string.isRequired,
    totalCount: PropTypes.number,
    seeMoreResults: PropTypes.func.isRequired,
    toggleHideResults: PropTypes.func.isRequired,
    hideResults: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    dropdown: PropTypes.bool.isRequired,
    removeResults: PropTypes.func.isRequired,
    changePosition: PropTypes.func.isRequired,
    renderResultItems: PropTypes.func.isRequired,
    renderNotification: PropTypes.node,
}

export default Results
