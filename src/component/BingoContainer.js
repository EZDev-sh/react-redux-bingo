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

let mapStateToProps = (state) => {
  return {
      check_start: state.check_start
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
      onStart: () => dispatch(start()),
      onRestart: () => dispatch(restart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoContainer);
