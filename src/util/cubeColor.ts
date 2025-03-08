

enum STICKER_COLOR {
    U,
    D,
    F,
    L,
    B,
    R
}

class CubeColorSticker {

    static COLOR_CODE = {
        U: '#FFFFFF',
        D: '#F9F002',
        F: '#50E200',
        L: '#F39401',
        B: '#063EC3',
        R: '#9B0300'
    };

    static getColor(color: 'U' | 'D' | 'F' | 'B' | 'L' | 'R') {
        switch (color) {
            case 'U':
                return this.COLOR_CODE.U;
            case 'D':
                return this.COLOR_CODE.D;
            case 'B':
                return this.COLOR_CODE.B;
            case 'F':
                return this.COLOR_CODE.F;
            case 'L':
                return this.COLOR_CODE.L;
            case 'R':
                return this.COLOR_CODE.R;
        }
    }
}

export {STICKER_COLOR, CubeColorSticker};