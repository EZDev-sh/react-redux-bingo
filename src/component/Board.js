import React, { Component } from 'react';
import './Board.css';
import { connect } from 'react-redux';
import { pick } from '../action';
import Cell from './Cell';

class Board extends Component {

    render() {
        // 1P의 Board에 채워질 Cell을 만들어준다.
        const player_1 = this.props.pick_1.map((val, id) =>
            (<Cell
                active={((this.props.hits).includes(val))}
                lined={((this.props.lined_1 || []).includes(id))}
                idx={id} num={val}
                player={'1P'}
                playing={this.props.playing}
                turn={this.props.turn}
                handle={this.props.onPick}
            />)
        );

        // 1P의 Board에 채워질 Cell을 만들어준다.
        const player_2 = this.props.pick_2.map((val, id) =>
            <Cell
                active={((this.props.hits).includes(val))}
                lined={((this.props.lined_2 || []).includes(id))}
                idx={id} num={val}
                player={'2P'}
                playing={this.props.playing}
                turn={this.props.turn}
                handle={this.props.onPick}
            />
        );
        return (
            <div className='play'>
                <div>
                    <div className='user'>1P</div>
                    <div style={{ width: 46 * 5, height: 46 * 5 }} className="group">
                        {player_1}
                    </div>
                </div>

                <div>
                    <div className='user'>2P</div>
                    <div style={{ width: 46 * 5, height: 46 * 5 }} className="group">
                        {player_2}
                    </div>
                </div>

            </div>

        );
    }

}

// Board에서 사용중인 store 데이터
let mapStateToProps = (state) => {
    return {
        hits: state.hits
        , turn: state.turn
        , playing: state.playing
        , lined_1: state.lined_1
        , lined_2: state.lined_2
        , pick_1: state.pick_1
        , pick_2: state.pick_2
    };
}

// Board에서 발생한 action을 dispatch로 넘겨준다
let mapDispatchToProps = (dispatch) => {
    return {
        // Cell 클릭했을때의 액션
        onPick: (value, user) => dispatch(pick(value, user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);