import React, { Component } from 'react'

class leftbarItem1 extends Component {
    render () {
        const { description, name, oreder, id } = this.props;

        return (
            <div>
                <option value="">  </option>
                <option value="option1"> name </option>
               
            </div>
        )
    }
}

export default leftbarItem1