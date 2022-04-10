import React, { PureComponent } from 'react'
import { Link } from 'react-router'
import { OutLink } from 'src/common-ui/containers'
import styled from 'styled-components'

export type Props = {
    name: String
    icon: String
    pathname: String
    isActive: Boolean
    isExternal: Boolean
}

class NavLink extends PureComponent<Props> {
    static propTypes = {}

    get LinkComponent() {
        return this.props.isExternal ? OutLink : Link
    }

    render() {
        return (
            <Container>
                <this.LinkComponent to={this.props.pathname}>
                    <RouteItem>
                        <RouteItemContent>
                            <img
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    WebkitMaskSize: 'contain',
                                    WebkitMaskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center center',
                                    color: 'rgb(150, 160, 181)',
                                }}
                                src={'img/' + this.props.icon}
                            />
                            <RouteTitle>{this.props.name}</RouteTitle>
                        </RouteItemContent>
                    </RouteItem>
                </this.LinkComponent>
            </Container>
        )
    }
}

const Container = styled.div`
    width: 100%;
    & > a {
        display: flex;
        text-decoration: none;
    }

    & * {
        cursor: pointer !important;
    }
`

const RouteTitle = styled.div`
    color: rgb(115, 119, 139);
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    width: 100%;
`

const RouteItemContent = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    width: 100%;
`

const RouteItem = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    padding: 0 25px;
    height: 50px;
    width: 100%;
    justify-content: flex-start;
    margin: 0 10px;
    border-radius: 5px;

    & > a {
        display: flex;
        text-decoration: none;
    }

    &: hover {
        background-color: rgb(115, 119, 139);
    }
`

export default NavLink
