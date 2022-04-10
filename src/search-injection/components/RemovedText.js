import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RemovedText = (props) => {
    return (
        <RemoveContainer>
            You can always enable this feature again via the settings.
            <button
                style={{
                    padding: '8px 20px',
                    height: '35px',
                    fontWeight: 'normal',
                    overflow: 'visible',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    WebkitBoxPack: 'center',
                    justifyContent: 'center',
                    WebkitBoxAlign: 'center',
                    alignItems: 'center',
                    verticalAlign: 'middle',
                    background: 'rgb(52, 122, 226)',
                    boxSizing: 'border-box',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '10px',
                    color: 'white',
                }}
                onClick={props.undo}
            >
                Undo
            </button>
        </RemoveContainer>
    )
}

const RemoveContainer = styled.div`
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
    color: rgb(150, 160, 181);
    padding: 20px;
    grid-gap: 15px;
    font-size: 14px;
    display: flex;
`

RemovedText.propTypes = {
    undo: PropTypes.func.isRequired,
    // position: PropTypes.string.isRequired,
}

export default RemovedText
