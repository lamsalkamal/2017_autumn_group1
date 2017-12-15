import React, { Component } from 'react';
import getStrings from './langString.js';

class emailFeedback extends Component {
    render () {
        return (
            <div>
                <p>   
                    <a href="mailto:metsamittari@luke.fi"> {getStrings.getLangString().SendFeedback} </a>
                    <abbr title={ getStrings.getLangString().FeedbackDesc}>[?]</abbr>
                </p>
                
            </div>
        )
    }
}

export default emailFeedback