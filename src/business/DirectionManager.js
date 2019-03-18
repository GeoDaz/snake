//module
import React from 'react';
import {observable, computed} from 'mobx';

class DirectionManager{
    _direction = '>';//["^", "v", "<", ">"]

    constructor(){
        window.addEventListener('keydown', this.captureKeyboard.bind(this), true);
    }

    get direction(){
        return this._direction;
    }

    captureKeyboard(evt){
        if(evt.key === 'ArrowUp' && this._direction !== 'v'){
            this._direction = "^";

        }else if(evt.key === 'ArrowDown' && this._direction !== '^'){
            this._direction = "v";

        }else if(evt.key === 'ArrowRight' && this._direction !== '<'){
            this._direction = ">";

        }else if(evt.key === 'ArrowLeft' && this._direction !== '>') {
            this._direction = "<";
        }
        evt.preventDefault();
    }

    reset(){
        this._direction = '>';
    }
}

export default DirectionManager;