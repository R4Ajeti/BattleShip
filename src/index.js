/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint arrow-parens: ["error", "as-needed"] */

import './css/style.css';
import Board from './js/board/Board';


const content = document.querySelector('div.content');
const mBoard = new Board();
const compBoard = new Board();


mBoard.draw();
compBoard.draw();


content.appendChild(mBoard.el);
content.appendChild(compBoard.el);


const btn = document.createElement('input');
btn.setAttribute('type', 'button');
btn.value = 'Test';
btn.onclick = () => compBoard.autoMove();
content.appendChild(btn);
