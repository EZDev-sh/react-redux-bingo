import React, { Component } from 'react';
import './Cell.css'

class Cell extends Component {
    render() {
        const { handle, num, playing, player, active, lined } = this.props;
        let status = '';

        if (active === true) {
            status = 'active';
        }
        if (lined === true) {
            status = 'lined';
        }
        return (
            <div className={'btn ' + status} id={player}
                onClick={(e) =>
                    playing ? handle(num, player) : undefined
                }

            >
                {(this.props.num !== 0) ? this.props.num : <span className="black">&nbsp;</span>}
            </div>
        );
    }
}


export default Cell;