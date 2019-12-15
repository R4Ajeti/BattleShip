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


content.appendChild(mBoard);
content.appendChild(compBoard);


const btn = document.createElement('input');
btn.setAttribute('type', 'button');
btn.value = 'Test';
btn.onclick = () => compBoard.autoMove();

const btn2 = document.createElement('input');
btn2.setAttribute('type', 'button');
btn2.value = 'Hide';
btn2.onclick = () => compBoard.hide();

const btn3 = document.createElement('input');
btn3.setAttribute('type', 'button');
btn3.value = 'Show';
btn3.onclick = () => compBoard.show();

content.appendChild(btn);
content.appendChild(btn2);
content.appendChild(btn3);
