import { useState } from "react";

type ScrambleType = '3x3x3';

export function useScramble() {

    const [scramble, setScramble] = useState<string>('');

    const faces = ['U', 'D', 'R', 'L', 'F', 'B'];
    const modifiers = ['', "'", '2'];

    const oppFaceMap: {[key: string]: string} = {
        'U': 'D',
        'D': 'U',
        'F': 'B',
        'B': 'F',
        'R': 'L',
        'L': 'R'
    };

    function setNewScramble(scrambleType: ScrambleType) {
        setScramble(getScramble(scrambleType));
    }

    function getScramble(scrambleType: ScrambleType): string {
        if (scrambleType === '3x3x3') {
            return get3x3x3Scramble();
        }

        return '';
    }

    function get3x3x3Scramble(): string {
        let scrambleArr: string[] = [];
        let prevMove: string | null = null;
        let prvOfprvMove: string | null = null;

        for (let i = 0; i < 25; i++) {
            let move = faces[Math.floor(Math.random() * 6)];
            while (move === prevMove || (oppFaceMap[move] === prevMove && move === prvOfprvMove)) {
                move = faces[Math.floor(Math.random() * 6)];
            }
            let modifier = modifiers[Math.floor(Math.random() * 3)];

            scrambleArr.push(move + modifier);
            prvOfprvMove = prevMove;
            prevMove = move;
        }

        return scrambleArr.join(' ')
    }

    return {scramble, setNewScramble};
}