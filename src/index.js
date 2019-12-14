/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint arrow-parens: ["error", "as-needed"] */

import './css/style.css';
import Board from './js/board/Board';


const content = document.querySelector('div.content');
const mBoard = new Board();
mBoard.draw();

content.appendChild(mBoard.el);
