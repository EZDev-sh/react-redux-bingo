export const START = 'START';
export const RESTART = 'RESTART';
export const PICK = 'PICK';

export function start() {
    return {
        type: START
    };
}

export function restart() {
    return {
        type: RESTART
    };
}

export function pick(value, user) {
    return {
        type: PICK,
        num: value,
        player: user
    };
}