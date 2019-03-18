//modules
import React from 'react';
import {observable, computed, autorun, decorate, when} from 'mobx';
import { render } from 'react-dom';
import {Provider} from 'mobx-react';
//css
import './index.css';
//class
import Game from './component/Game';
import SnakeGame from './business/SnakeGame';

const snakeGame = new SnakeGame();

render(
    <Provider snakeGame={snakeGame}>
        <Game />
    </Provider>, 
    document.getElementById('root')
);
