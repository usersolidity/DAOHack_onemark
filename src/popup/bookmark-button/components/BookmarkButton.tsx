import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { HeartIcon } from '@heroicons/react/outline'

export interface OwnProps {
    closePopup: () => void
}

interface StateProps {
    isDisabled: boolean
    isBookmarked: boolean
}

export type Props = OwnProps & StateProps

class BookmarkButton extends PureComponent<Props> {
    state = {
        highlightInfo: undefined,
    }

    render() {
        const text = this.props.isBookmarked
            ? 'Page Bookmarked!'
            : 'Bookmark this Page'

        return (
            <ButtonItem
                disabled={this.props.isDisabled || this.props.isBookmarked}
            >
                <SectionCircle>
                    <HeartIcon
                        style={{
                            width: '16px',
                            height: '16px',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center center',
                            color: 'rgb(150, 160, 181)',
                        }}
                    />
                </SectionCircle>
                <ButtonInnerContent>
                    {text}
                    <SubTitle>{this.state.highlightInfo}</SubTitle>
                </ButtonInnerContent>
            </ButtonItem>
        )
    }
}

const SectionCircle = styled.div`
    background: ${(props) => props.theme.colors.backgroundHighlight}68;
    border-radius: 100px;
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ButtonItem = styled.div<{ disabled: boolean }>`
    display: flex;
    grid-gap: 15px;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    padding: 5px 20px;
    height: 55px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &:hover {
        background: #f5fafe;
    }

    & * {
        cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    }
`

const ButtonInnerContent = styled.div`
    display: flex;
    grid-gap: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-size: 14px;
    font-weight: 600;
    color: rgb(41, 44, 56);
`

const SubTitle = styled.div`
    font-size: 12px;
    color: rgb(150, 160, 181);
    font-weight: 400;
`

export default BookmarkButton
