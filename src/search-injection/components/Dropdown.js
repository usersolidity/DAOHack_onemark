import React from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
import { BanIcon, CogIcon, ReplyIcon } from '@heroicons/react/outline'

class Dropdown extends React.Component {
    static propTypes = {
        remove: PropTypes.func.isRequired,
        rerender: PropTypes.func.isRequired,
        closeDropdown: PropTypes.func.isRequired,
    }

    handleClickOutside = () => {
        this.props.closeDropdown()
    }

    render() {
        return (
            <DropDownContainer>
                <DropDownItem
                    onClick={() => {
                        // eslint-disable-next-line no-console
                        console.log('open settings')
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
                    Settings
                </DropDownItem>
                <DropDownItem onClick={this.props.rerender}>
                    <ReplyIcon
                        style={{
                            width: '16px',
                            height: '16px',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center center',
                            color: 'rgb(150, 160, 181)',
                        }}
                    />
                    Change Position
                </DropDownItem>
                <DropDownItem onClick={this.props.remove}>
                    <BanIcon
                        style={{
                            width: '16px',
                            height: '16px',
                            WebkitMaskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center center',
                            color: 'rgb(150, 160, 181)',
                        }}
                    />
                    Disable
                </DropDownItem>
            </DropDownContainer>
        )
    }
}

const DropDownContainer = styled.div`
    box-shadow: 0px 22px 26px 18px rgba(0, 0, 0, 0.03);
    height: fit-content;
    padding: 10px;
    width: 200px;
    position: absolute;
    right: 0px;
    top: 50px;
    background: white;
    z-index: 1000000;
`
const DropDownItem = styled.div`
    height: 40px;
    padding: 0 10px;
    color: rgb(115, 119, 139);
    display: flex;
    grid-gap: 10px;
    align-items: center;
    cursor: pointer;
    font-size: 14px;

    & * {
        cursor: pointer;
    }

    &: hover {
        background-color: #f5fafe;
    }
`

export default onClickOutside(Dropdown)
