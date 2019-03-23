//module
import React from 'react';
import {observable, computed} from 'mobx';

class DirectionManager{
    _direction = '>';//["^", "v", "<", ">"]
    changeDirectionPossible = true;
    //pour empecher que le direction change plus vite que le tour :
    //le direction manager voit <,^,> et le game voit <,> et donc game over.

    constructor(time){
        window.addEventListener('keydown', this.captureKeyboard.bind(this), true);
    }

    get direction(){
        this.changeDirectionPossible = true;
        return this._direction;
    }

    captureKeyboard(evt){
        if(this.changeDirectionPossible === true) {
            if (
                (evt.key === 'ArrowUp' || evt.key === 'z')
                && this._direction !== 'v'
            ) {
                this._direction = "^";
                this.changeDirectionPossible = false;

            } else if (
                (evt.key === 'ArrowDown' || evt.key === 's')
                && this._direction !== '^'
            ) {
                this._direction = "v";
                this.changeDirectionPossible = false;

            } else if (
                (evt.key === 'ArrowRight' || evt.key === 'd')
                && this._direction !== '<'
            ) {
                this._direction = ">";
                this.changeDirectionPossible = false;

            } else if (
                (evt.key === 'ArrowLeft' ||evt.key === 'q')
                && this._direction !== '>'
            ) {
                this._direction = "<";
                this.changeDirectionPossible = false;
            }

            if(
                evt.key === "ArrowUp" ||
                evt.key === "ArrowDown" ||
                evt.key === "ArrowRight" ||
                evt.key === "ArrowLeft" ||
                evt.key === "End" ||
                evt.key === "PageDown" ||
                evt.key === "PageUp"
            ){
                evt.preventDefault();
            }
        }
    }

    reset(){
        this._direction = '>';
    }
}

export default DirectionManager;