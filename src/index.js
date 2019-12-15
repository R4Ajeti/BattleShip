/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint arrow-parens: ["error", "as-needed"] */

import './css/style.css';
import Game from './js/Game';


const content = document.querySelector('div.content');
const game = new Game();
game.start();

content.appendChild(game);
