//modules
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {render} from 'react-dom';
//class
import Square from './Square'
import {PIXEL_PAR_CASE} from '../business/Position'

@inject('snakeGame')
@observer
class Snake extends Component {
    radiusValue = {
        '^': `${PIXEL_PAR_CASE}px ${PIXEL_PAR_CASE}px 0 0`,
        '>': `0 ${PIXEL_PAR_CASE}px ${PIXEL_PAR_CASE}px 0`,
        'v': `0 0 ${PIXEL_PAR_CASE}px ${PIXEL_PAR_CASE}px`,
        '<': `${PIXEL_PAR_CASE}px 0 0 ${PIXEL_PAR_CASE}px`,
    };
    snake = [];

    constructor(props){
        super(props);
    }

    headRadius(){
        if (this.props.snakeGame.directionManager.direction) {
            return this.radiusValue[this.props.snakeGame.directionManager.direction];
        }
        return null;
    }

    tailRadius(i){
        if(this.snake[i].x > this.snake[i + 1].x){
            return this.radiusValue['>'];

        }else if(this.snake[i].x < this.snake[i + 1].x){
            return this.radiusValue['<'];

        }else if(this.snake[i].y < this.snake[i + 1].y){
            return this.radiusValue['^'];

        }else if(this.snake[i].y > this.snake[i + 1].y){
            return this.radiusValue['v'];
        }

        return null;
    }

    render(){
        this.snake = this.props.snakeGame.engine.snake;

        return(
            <div id="snake">
                {this.snake.map(
                    (square, i) => {
                        let radius = "0";
                        let color = '';
                        if(i === 0){
                            radius = this.tailRadius(i);
                        }else if(i === (this.snake.length - 1)){
                            radius = this.headRadius();
                        }
                        if(typeof this.snake[i +1] !== 'undefined'){
                            color = this.snake[i +1].color;
                        }
                        return <Square key={i} values={square} color={color} radius={radius}/>;
                    }
                )}
            </div>
        );
    }
}

export default Snake;

