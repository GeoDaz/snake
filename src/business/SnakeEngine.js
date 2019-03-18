//module
import React from 'react';
import {observable, computed} from 'mobx';
import {inject} from "mobx-react";
//class
import Position from './Position'
import {createSnakeSquare} from './Square'
import {createRandomColorSquare} from './Square'

class SnakeEngine{
    isBlocked = false;
    initialSnakeSize = 5;
    @observable snake = [];
    @observable food = null; //a Square
    gridSize;
    
    constructor(gridSize){
        this.gridSize = gridSize;
        this.reset();
    }

    move(direction){
        if(this.isBlocked) return -1;
        
        if(this.food === null){
            this.createFood();
        }
        
        let futurSnakeHead = this.computedFuturSnakeHead(direction);
        
        if(futurSnakeHead.equals(this.food.position)){
            this.growSnake();
            this.createFood();
            
            return 1;
        }
        
        if(this.snakeIsOn(futurSnakeHead)){
            this.isBlocked = true;
            return -1;
        }
        
        this.moveSnake(futurSnakeHead);
        return 0;
    }

    createFood(){
        const T = this.gridSize * this.gridSize;
        if(this.snake.length === T) return;

        let i = Math.floor(Math.random() * (T - this.snake.length));
        const snakeUnidimensionalPosition = this.snake.map(
          position => position.y * this.gridSize + position.x
        ).sort();

        for (let j = 0; j < snakeUnidimensionalPosition.length && snakeUnidimensionalPosition[j] <= i; j++){
            i++;
        }
        //i est l'indice d'une case libre en une dimension
        const $foodPosition = new Position(i % this.gridSize, Math.floor(i / this.gridSize));// % = modulo
        this.food = createRandomColorSquare($foodPosition);
    }

    computedFuturSnakeHead(direction){
        const currentSnakeHead = this.snake[this.snake.length -1].position;
        
        //Pas de break parce que return
        switch(direction){
            case '^' : 
                return new Position(
                    currentSnakeHead.x, 
                    currentSnakeHead.y === 0 ? this.gridSize -1 : currentSnakeHead.y -1 
                );
                
            case 'v' :
                return new Position(
                    currentSnakeHead.x, 
                    currentSnakeHead.y === this.gridSize -1 ? 0 : currentSnakeHead.y +1 
                );
                
            case '<' :
                return new Position(
                    currentSnakeHead.x === 0 ? this.gridSize -1 : currentSnakeHead.x -1, 
                    currentSnakeHead.y 
                );
                
            case '>' :
                return new Position(
                    currentSnakeHead.x === this.gridSize -1 ? 0 : currentSnakeHead.x +1, 
                    currentSnakeHead.y 
                );
                
            default:
                throw `Illegale direction : ${direction}`;
        }
    }

    growSnake(){
        if(this.food === null) return;

        this.snake.push(this.food);
        this.food = null;
    }

    snakeIsOn(position){
        return this.snake.some(
            (square) => square.position.equals(position)
        );
    }

    moveSnake(newSnakeHead){
        let i;
        //on ne peut pas utiliser map ici car on a besoin d'utiliser i+1 et de s'arrter a lentgth - 1
        for(i = 0;  i < this.snake.length -1; i++){
            this.snake[i].position = this.snake[i+1].position;
        }
        this.snake[i].position = newSnakeHead;
    }

    reset(){
        console.log('reset engine');
        const y = Math.ceil(this.gridSize /2);
        const xBase = Math.ceil( (this.gridSize - this.initialSnakeSize) /2);

        this.snake = new Array(this.initialSnakeSize);
        this.snake = this.snake.map(
            (Square, i) => {
                let position = new Position(xBase + i, y);
                return createSnakeSquare(position);
            }
        );
        
        this.food = null;
        this.isBlocked = false;
    }
}

export default SnakeEngine;