import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BookmarkButton } from './bookmark-button'

import './popup.css'

class Hello extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <h1>V0.1</h1>
                {/* <BookmarkButton
                    isDisabled={false}
                    isBookmarked={false}
                    closePopup={() => {}}
                /> */}
            </div>
        )
    }
}

// --------------

ReactDOM.render(<Hello />, document.getElementById('app'))
