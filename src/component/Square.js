//modules
import React, {Component} from 'react';
import {observer} from "mobx-react";
import {render} from 'react-dom';
//Components
import {PIXEL_PAR_CASE} from '../business/Position'

@observer
export default class Square extends Component {
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render(){
        return(
            <div className={`square ${this.props.color ? this.props.color : this.props.values.color}`} style={{
                top: this.props.values.yPixel,
                left: this.props.values.xPixel,
                height: PIXEL_PAR_CASE,
                width: PIXEL_PAR_CASE,
                borderRadius: this.props.radius,
            }}></div>
        );
    }
}
