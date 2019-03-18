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

        return(
            <select id="difficulte" name="difficulte" defaultValue={`Niveau ${this.props.snakeGame.level}`} onChange={() => {
                this.props.snakeGame.level = document.getElementById("difficulte").value.replace('Niveau ','');
            }}>
                {this.levels.map(
                    (level, i) => <option key={i}>Niveau {level}</option>
                )}
            </select>
        );
    }
}

export default Level;

