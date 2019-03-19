//module
import React from 'react';
import {observable, computed} from 'mobx';
//class
import SnakeEngine from './SnakeEngine';
import DirectionManager from './DirectionManager';

class SnakeGame {
    @observable state = "NEW_GAME";// [  PLAY PAUSE GAME_OVER ]
    @observable score = 0;
    @observable _level = 1; //1 to 5
    @observable engine;
    size = 25;
    intervalId = null;
    
    constructor(){
        this.engine = new SnakeEngine(this.size);
        this.directionManager = new DirectionManager();
    }

    @computed get level(){
        return this._level;
    }
    set level(lvl){
        if (lvl < 1 || lvl > 5) throw "Illegal level";
        if (this.state === 'PLAY' || this.state === 'PAUSE') return;

        if(typeof lvl !== 'number'){
            this._level = parseInt(lvl);
        } else {
            this._level = lvl;
        }


    }

    start(){
        if(this.state === "PLAY") return;

        this.intervalId = setInterval(() => {
            this.playTurn()
        }, this.computeInterval());

        this.state = "PLAY";
    }

    pause(){
        if(this.state !== "PLAY") return;
        
        this.stopTurn();
        this.state = "PAUSE";
    }

    reset(){
        if(this.state === "NEW_GAME") return;
        
        if(this.state === "PLAY"){
            this.stopTurn();
        }

        if(this.intervalId){
            clearInterval(this.intervalId);
        }

        this.engine.reset();
        this.directionManager.reset();
        this.score = 0;
        this.state = "NEW_GAME";
    }
    
    playTurn(){
        if(this.state !== "PLAY") return;
        
        switch(this.engine.move(this.directionManager.direction)){
            case 0: //le serpent a bougé, il ne s'est rien passé
                break;

            case -1: //le serpent s'est mordu
                this.state = "GAME_OVER";
                clearInterval(this.intervalId);
                break;

            case 1: //le serpent a mangé
                this.incrementScore();
                break;

            default:
                throw "Illegal return of SnakeEngine";
        }
    }

    stopTurn(){
        if(this.intervalId !== null){
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    incrementScore(){
        this.score += (this.level +1) *5;
    }
        
    computeInterval(){
        return this.level *(-50) +300;
    }
}

export default SnakeGame;