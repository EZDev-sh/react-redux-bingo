export const START = 'START';
export const RESTART = 'RESTART';
export const PICK = 'PICK';

// start 버튼을 눌렀을때 실행
export function start() {
    return {
        type: START
    };
}

// restart 버튼을 눌렀을때 실행
export function restart() {
    return {
        type: RESTART
    };
}

// Cell을 눌렀을때 실행
export function pick(value, user) {
    return {
        type: PICK,
        num: value,
        player: user
    };
}