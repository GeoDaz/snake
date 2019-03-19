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
            if (evt.key === 'ArrowUp' && this._direction !== 'v') {
                evt.preventDefault();
                this._direction = "^";
                //mettre prevent default uniquement a ces touches permet de garder le controle des f comme f5 ou d'espace pour faire pause.
                this.changeDirectionPossible = false;

            } else if (evt.key === 'ArrowDown' && this._direction !== '^') {
                evt.preventDefault();
                this._direction = "v";
                this.changeDirectionPossible = false;

            } else if (evt.key === 'ArrowRight' && this._direction !== '<') {
                evt.preventDefault();
                this._direction = ">";
                this.changeDirectionPossible = false;

            } else if (evt.key === 'ArrowLeft' && this._direction !== '>') {
                evt.preventDefault();
                this._direction = "<";
                this.changeDirectionPossible = false;
            }
        }
    }

    reset(){
        this._direction = '>';
    }
}

export default DirectionManager;