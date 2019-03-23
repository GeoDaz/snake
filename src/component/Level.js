//modules
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {render} from 'react-dom';


@inject('snakeGame')
@observer
class Level extends Component {
    levels = [1,2,3,4,5];

    constructor(props){
        super(props);
    }

    render(){
        let disabled = false;
        if(this.props.snakeGame.state === 'PLAY' || this.props.snakeGame.state === 'PAUSE'){
            disabled = true;
        }

        return(
            <select id="difficulte" name="difficulte" className={disabled ? "disabled" : ''} disabled={disabled} defaultValue={`Niveau ${this.props.snakeGame.level}`} onChange={(evt) => {
                this.props.snakeGame.level = evt.target.value;
            }}>
                {this.levels.map(
                    (level, i) => <option key={i} value={level}>Niveau {level}</option>
                )}
            </select>
        );
    }
}

export default Level;

