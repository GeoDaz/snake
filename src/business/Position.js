
import React from 'react';
import {observable, computed} from 'mobx';

export const PIXEL_PAR_CASE = 16;

class Position {
    @observable x = 0;
    @observable y = 0;

    @computed get xPixel(){
        return this.x * PIXEL_PAR_CASE;
    } 
     
    @computed get yPixel(){
        return this.y * PIXEL_PAR_CASE;
    }
    
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    equals(position){
        return position &&
            position instanceof Position &&
            position.x === this.x &&
            position.y === this.y;
    }
}

export default Position;