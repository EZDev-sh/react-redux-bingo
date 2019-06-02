import { START, RESTART, PICK } from '../action';

// 빙고의 크기 지정
const dimension = 5;

// State 초기화
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

// 배열에 1~25 사이의 수 25개를 만들어 배열로 반환한다.
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

// 누른 셀안의 숫자를 hits 배열에 추가한다.
function pickNums(num, hits) {
    const arr = [...hits];
    arr.push(num)

    return arr;
}

// hits 배열에 있는 값과 각 플레이어의 보드와 비교하여 빙고를 확인한다.
function checkLine(arr, picks) {
    const lines = [];
    let slash1 = [];
    let slash2 = [];

    for (let i = 0; i < dimension; i++) {
        let row = [];
        let col = [];

        for (let o = 0; o < dimension; o++) {
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
    for (let i = 0; i < lines.length; i++) {
        let line_is_hit = true;

        for (let num in lines[i]) {
            if (undefined === arr[lines[i][num]] || !hits.includes(arr[lines[i][num]])) {
                line_is_hit = false;
                break;
            }
        }

        if (line_is_hit) {
            for (let num in lines[i]) {
                rtn.push(lines[i][num]);
            }
        }

    }
    return rtn;

}

// 게임의 종료후 초기화 값을 초기화 한다.
function init(state) {
    state.check_start = 'START';
    state.playing = false;
    state.turn = true;
    state.pick_1 = new Array(dimension * dimension).fill(0);
    state.pick_2 = new Array(dimension * dimension).fill(0);
    state.hits = [];
    state.lined_1 = [];
    state.lined_2 = [];
}

// Cell을 눌렀을때 처리하는 것을 관리한다.
function pick(num, player, state) {
    // 경고 팝업
    if (player === '1P' && !state.turn) {
        alert('잘못된 차례입니다.');
        return state;
    }
    else if (player === '2P' && state.turn) {
        alert('잘모된 차례입니다.');
        return state;
    }
    // 턴 변경
    state.turn = !state.turn
    // 클릭한 Cell의 숫자를 hits에 추가
    state.hits = pickNums(num, state.hits);
    // 각 플레이어의 빙고를 확인한다.
    state.lined_1 = checkLine(state.pick_1, state.hits);
    state.lined_2 = checkLine(state.pick_2, state.hits);

    // 빙고 갯수
    const bingo_1 = state.lined_1.length / dimension;
    const bingo_2 = state.lined_2.length / dimension

    // 빙고 종료 조건 및 초기화
    if (bingo_1 >= dimension && bingo_2 >= dimension) {
        alert('무승부 입니다.')
        init(state);
    }
    else if (bingo_1 >= dimension) {
        alert('1P가 빙고를 완성했습니다.')
        init(state);
    }
    else if (bingo_2 >= dimension) {
        alert('2P가 빙고를 완성했습니다.')
        init(state);
    }

    return state;
}

// action 관리
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case START:     // Start 버튼을 눌렀을때 실행
            return Object.assign({}, state, {
                check_start: 'RESTART'
                , playing: true
                , pick_1: generateNums(dimension * dimension)
                , pick_2: generateNums(dimension * dimension)
            });
        case RESTART:   // Restart 버튼을 눌렀을때 실행
            return Object.assign({}, state, {
                check_start: 'RESTART'
                , pick_1: generateNums(dimension * dimension)
                , pick_2: generateNums(dimension * dimension)
                , lined_1: []
                , lined_2: []
                , hits: []
            });
        case PICK:      // 하나의 Cell을 눌넜을때 실행
            return Object.assign({}, state, {
                state: pick(action.num, action.player, state)
            });
        default:
            return state; // 아무 일도 일어나지 않으면 현재 상태를 그대로 반환합니다.
    }
}