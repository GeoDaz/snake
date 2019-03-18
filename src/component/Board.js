//modules
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {render} from 'react-dom';
//class
import Snake from './Snake'
import Square from './Square'
import {PIXEL_PAR_CASE} from '../business/Position'

@observer
class Board extends Component {
    border = PIXEL_PAR_CASE + "px solid transparent";

    constructor(props){
        super(props);
        this.size = props.size * PIXEL_PAR_CASE;
    }

    render(){

        return(
            <div id="board" style={{
                height: this.size,
                width: this.size,
                border: this.border,
            }}>
                <Snake/>
                {this.props.engine.food ? <Square values={this.props.engine.food} /> : null}
            </div>
        );
    }
}

export default Board;

