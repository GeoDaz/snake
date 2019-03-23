//modules
import React from 'react';
import {observable, computed, decorate} from 'mobx';
import { render } from 'react-dom';
//Components
import Position from './Position';

const colorList = [
    'red',
    'green',
    // 'black',
    'orange',
    'pink',
    'purple',
    // 'white',
    'blue',
    'yellow',
    // 'cyan',
];

export default class Square extends Position {
    @observable color = '';

    @computed get position(){
        return this;
    }

    set position(position){
        this.x = position.x;
        this.y = position.y;
    }
    
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }
}

export function createSnakeSquare(position){
    return new Square(position.x, position.y, 'snake-brick');
}

export function createRandomColorSquare(position){
    const i = Math.floor(Math.random() * colorList.length);
    return new Square(position.x, position.y, colorList[i]);
}
