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
            evt.preventDefault();

        }else if(evt.key === 'ArrowDown' && this._direction !== '^'){
            this._direction = "v";
            evt.preventDefault();

        }else if(evt.key === 'ArrowRight' && this._direction !== '<'){
            this._direction = ">";
            evt.preventDefault();

        }else if(evt.key === 'ArrowLeft' && this._direction !== '>') {
            this._direction = "<";
            evt.preventDefault();
        }
        //mettre prevent default uniquement a ces touches permet de garder le controle des f comme f5 ou d'espace pour faire pause.
    }

    reset(){
        this._direction = '>';
    }
}

export default DirectionManager;