//modules
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import { render } from 'react-dom';

@observer
class ControlPanel extends Component {

    constructor(props){
        super(props);
    }

    render(){
        switch(this.props.game.state) {
            case 'PLAY':
                return (
                    <div id="control-panel">
                        <button id="reset" className="disabled">Reset</button>
                        <button id="pause" onClick={() => this.props.game.pause()}>Pause</button>
                    </div>
                );
            case 'PAUSE':
                return (
                    <div id="control-panel">
                        <button id="reset" onClick={() => this.props.game.reset()}>Reset</button>
                        <button id="play" onClick={() => this.props.game.start()}>Play</button>
                    </div>
                );
            case 'NEW_GAME':
                return (
                    <div id="control-panel">
                        <button id="reset" className="disabled">Reset</button>
                        <button id="play" onClick={() => this.props.game.start()}>Play</button>
                    </div>
                );
            case 'GAME_OVER':
                return (
                    <div id="control-panel">
                        <button id="reset" onClick={() => this.props.game.reset()}>Reset</button>
                        <button id="play" className="disabled">Play</button>
                    </div>
                );
        }
    }
}

export default ControlPanel;

