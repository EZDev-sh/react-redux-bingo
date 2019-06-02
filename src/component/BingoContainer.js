import React, { Component }from 'react';
import './BingoContainer.css';
import { connect } from 'react-redux';
import {start, restart} from '../action';
import Board from './Board';

class BingoContainer extends Component {

  render() {
    
    const { check_start, onStart, onRestart} = this.props;

    return (
      <div className='bingo-template'>
        <div className='title-button' onClick={check_start === 'START' ? onStart : onRestart}>
          {check_start}
        </div>
        <div className='bingo-wrapper'>
          <Board/>
        </div>
      </div>

    )
  }
}

// BingoContainer에서 사용중인 store 데이터
let mapStateToProps = (state) => {
  return {
      check_start: state.check_start
  };
}

// BoardContainer에서 발생한 action을 dispatch로 넘겨준다
let mapDispatchToProps = (dispatch) => {
  return {
      onStart: () => dispatch(start()),
      onRestart: () => dispatch(restart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoContainer);
