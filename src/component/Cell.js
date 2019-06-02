import React, { Component } from 'react';
import './Cell.css'

class Cell extends Component {
    render() {
        const { handle, num, playing, player, active, lined } = this.props;
        
        // 눌린 Cell인지, 빙고 라인에 속하는 Cell인지 상태 변수
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