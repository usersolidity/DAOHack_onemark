import React from 'react'
import styled from 'styled-components'
import {
    listenConnectionMetamask,
    isMetamaskConnected,
} from '../../../../services/metamask'
import { LitProtocolService } from '../../../../services/litProtocolService'
import CeramicClient from '@ceramicnetwork/http-client'
// import { DeepSkillsService } from '../../../../services/DeepSkillsService'

// import type { State, Event, Dependencies } from './types'
// import OnboardingBox from '../../components/onboarding-box'

// import AuthDialog from 'src/authentication/components/AuthDialog/index'

import { MailIcon, UserIcon } from '@heroicons/react/outline'

declare global {
    interface Window {
        litProtocolService: any
        ethereum: any
    }
}
export default class OnboardingScreen extends React.Component<
    {},
    { [key: string]: any }
> {
    constructor(props) {
        super(props)
        this.state = { authDialogMode: 'signup', isConnected: null }
    }
    ceramicUrl = 'https://ceramic-clay.3boxlabs.com'
    chain = 'rinkeby'

    handleIsConnected = (isConnected) => {
        this.setState({ ...this.state, isConnected: isConnected })
        LitProtocolService.initlize()
            .then((litProtocolService) => {
                window.litProtocolService = litProtocolService
                const ceramic = new CeramicClient(this.ceramicUrl)
                // const deepSkillsService = new DeepSkillsService(
                //     ceramic,
                //     window.ethereum,
                // )
                return { hola: 'hola' }
            })
            .then((d) => {
                console.log(d)
            })
    }

    componentWillMount = () => {
        /* attach listeners to google StreetView */
        listenConnectionMetamask(this.handleIsConnected)
        isMetamaskConnected().then(this.handleIsConnected)
    }

    // constructor(props: Props) {
    //     super(props, new Logic(props))
    // }

    private renderInfoSide = () => {
        return (
            <RightSide>
                <CommentDemo src={'img/commentDemo.svg'} />
                <FeatureInfoBox>
                    <TitleSmall>Curate the web</TitleSmall>
                    <DescriptionText>
                        By yourself and with your community.
                    </DescriptionText>
                </FeatureInfoBox>
            </RightSide>
        )
    }

    private renderLoginStep = () => (
        <>
            <WelcomeContainer>
                <LeftSide>
                    <ContentBox>
                        {this.state.authDialogMode === 'signup' && (
                            <>
                                <LogoImg src={'/img/onlyIconLogo.svg'} />
                                <Title>Welcome to Onemark</Title>
                                <DescriptionText>
                                    Create an account to get started
                                </DescriptionText>
                            </>
                        )}
                        {this.state.authDialogMode === 'login' && (
                            <UserScreenContainer>
                                <SectionCircle>
                                    <UserIcon
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
                                <SectionTitle>Welcome Back!</SectionTitle>
                                <DescriptionText>
                                    Login to continue
                                </DescriptionText>
                            </UserScreenContainer>
                        )}

                        {/* {this.state.authDialogMode === 'resetPassword' && (
                            <UserScreenContainer>
                                <SectionCircle>
                                    <Icon
                                        filePath={icons.reload}
                                        heightAndWidth="24px"
                                        color="purple"
                                        hoverOff
                                    />
                                </SectionCircle>
                                <SectionTitle>Reset your password</SectionTitle>
                                <DescriptionText></DescriptionText>
                            </UserScreenContainer>
                        )} */}
                        {this.state.authDialogMode ===
                            'ConfirmResetPassword' && (
                            <UserScreenContainer>
                                <SectionCircle>
                                    <MailIcon
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
                                <SectionTitle>Check your Emails</SectionTitle>
                                <DescriptionText>
                                    Don't forget the spam folder!
                                </DescriptionText>
                            </UserScreenContainer>
                        )}
                        {/* <AuthDialog
                            onAuth={({ reason }) => {
                                this.processEvent('onUserLogIn', {
                                    newSignUp: reason === 'register',
                                })
                            }}
                            onModeChange={({ mode, setSaveState }) => {
                                this.processEvent('setAuthDialogMode', { mode })
                                this.processEvent('setSaveState', {
                                    setSaveState,
                                })
                            }}
                        /> */}
                    </ContentBox>
                </LeftSide>
                {this.renderInfoSide()}
            </WelcomeContainer>
        </>
    )

    render() {
        return <div>{this.renderLoginStep()}</div>
    }
}

const UserScreenContainer = styled.div`
    margin-bottom: 30px;
`
const SectionTitle = styled.div`
    color: rgb(41, 44, 56);
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`

const SectionCircle = styled.div`
    background: rgb(230, 241, 255);
    border-radius: 100px;
    height: 80px;
    width: 80px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FeatureInfoBox = styled.div`
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: row;
    justify-content: center;
    align-items: center;
`

const WelcomeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
`

const LeftSide = styled.div`
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media (max-width: 1000px) {
        width: 100%;
    }
`

const LogoImg = styled.img`
    height: 50px;
    width: auto;
`

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const Title = styled.div`
    color: rgb(41, 44, 56);
    font-size: 26px;
    font-weight: 800;
    margin-bottom: 10px;
    margin-top: 30px;
`

const DescriptionText = styled.div`
    color: rgb(115, 119, 139);
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 20px;
    text-align: left;
`

const RightSide = styled.div`
    width: 40%;
    background-image: url('img/onboardingBackground1.svg');
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    grid-auto-flow: row;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 100px 0 50px 0;
    overflow: hidden;

    @media (max-width: 1000px) {
        display: none;
    }
`

const CommentDemo = styled.img`
    height: 70%;
    width: auto;
    margin: auto;
`

const TitleSmall = styled.div`
    color: rgb(41, 44, 56);
    font-size: 22px;
    font-weight: 800;
    text-align: center;
`
