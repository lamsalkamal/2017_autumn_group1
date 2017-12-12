import React, { Component } from 'react';
import getSrings from './langString.js';

class emailFeedback extends Component {
    render () {
        return (
            <div>
                <p>   
                    <a href="mailto:metsamittari@luke.fi"> {getSrings.getLangString().SendFeedback} </a>
                </p>
            </div>
        )
    }
}

export default emailFeedback