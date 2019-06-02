import { START, RESTART, PICK } from '../action';

const dimension = 5;

const initialState = {
    check_start: 'START'
    , playing: false
    , turn: true
    , pick_1: new Array(dimension * dimension).fill(0)
    , pick_2: new Array(dimension * dimension).fill(0)
    , hits: []
    , lined_1: []
    , lined_2: []
}

function generateNums(max) {
    const pool = Array.apply(null, Array(max + 1)).map(function (_, i) { return i; });
    let arr = [];
    while (arr.length < max) {
        const idx = parseInt(Math.random() * (max + 1));
        if (pool[idx] !== 0) {
            arr.push(pool[idx]);
            pool[idx] = 0;
        }
    }

    return arr;
}

function pickNums(num, hits) {
    const arr = [...hits];
    arr.push(num)
    
    return arr;
}

function checkLine(arr, picks){
    const lines = [];
    let slash1 = [];
    let slash2 = [];

    for(let i = 0; i < dimension; i++){
      let row = [];
      let col = [];
      
      for(let o = 0; o < dimension; o++){
        row.push(o + dimension * i);
        col.push(o * dimension + i);
      }
      lines.push(row);
      lines.push(col);
      
      slash1.push(i + dimension * i);
      slash2.push((dimension - 1) * (i + 1));
    }
    lines.push(slash1);
    lines.push(slash2);

    const hits = [...picks];

    let rtn = [];
    for(let i = 0; i < lines.length; i++){
      let line_is_hit = true;
      
      for(let num in lines[i]){
        if(undefined === arr[lines[i][num]] || !hits.includes(arr[lines[i][num]])){
          line_is_hit = false;
          break;
        }
      }

      if(line_is_hit){
        for(let num in lines[i]){
          rtn.push(lines[i][num]);
        }
      }
      
    }
    return rtn;

}

function pick(num, player, state) {
    if ( player === '1P' && !state.turn) {
        alert('player 2의 차례입니다.');
        return state;
    }
    else if ( player === '2P' && state.turn) {
        alert('player 1의 차례입니다.');
        return state;
    }
    state.turn = !state.turn
    state.hits = pickNums(num, state.hits);
    state.lined_1 = checkLine(state.pick_1, state.hits);
    state.lined_2 = checkLine(state.pick_2, state.hits);

    return state;
}


export default function reducer(state = initialState, action) {
    // 리듀서 함수에서는 액션의 타입에 따라 변화된 상태를 정의하여 반환합니다.
    // state = initialState 이렇게 하면 initialState 가 기본 값으로 사용됩니다.
    switch (action.type) {
        case START:
            return Object.assign({}, state, {
                check_start: 'RESTART'
                , playing: true
                , pick_1: generateNums(dimension * dimension)
                , pick_2: generateNums(dimension * dimension)
            });
        case RESTART:
            return Object.assign({}, state, {
                check_start: 'RESTART'
                , pick_1: generateNums(dimension * dimension)
                , pick_2: generateNums(dimension * dimension)
                , lined_1: []
                , lined_2: []
                , hits: []
            });
        case PICK:
            return Object.assign({}, state, {
                state: pick(action.num, action.player, state)
            });
        default:
            return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
}