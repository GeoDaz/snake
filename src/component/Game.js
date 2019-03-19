//modules
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {render} from 'react-dom';

//class
import Board from './Board'
import ControlPanel from './ControlPanel'
import Level from './Level'

@inject('snakeGame')
@observer
class Game extends Component {

    render(){
        const game = this.props.snakeGame;

        return(
            <div id="game">
                <div className="game-over" style={game.state === "GAME_OVER" ? {display:block} : {display:none}}>GAME OVER</div>
                <Board size={game.size} engine={game.engine}/>
                <ControlPanel game={game}/>
                <p id="score">{game.score} points</p>
                <Level/>
            </div>
        );
    }
}

export default Game;

