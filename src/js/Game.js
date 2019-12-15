/* eslint-disable no-undef */
import Board from './board/Board';
import '../css/game.css';
import Notifier from './Notifier';

class Game extends HTMLDivElement {
  constructor() {
    super();
    this.boards = [
      new Board('Player1'),
      new Board('Computer'),
    ];

    this.notifier = new Notifier();
    this.classList.add('game');

    this.boards.forEach((board) => {
      this.appendChild(board);
      board.draw();
    });

    const btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.value = 'Test';
    btn.onclick = () => this.boards[1].autoMove();

    const btn2 = document.createElement('input');
    btn2.setAttribute('type', 'button');
    btn2.value = 'Hide';
    btn2.onclick = () => this.boards[1].hide();

    const btn3 = document.createElement('input');
    btn3.setAttribute('type', 'button');
    btn3.value = 'Show';
    btn3.onclick = () => this.boards[1].show();

    this.appendChild(this.notifier);

    this.appendChild(btn);
    this.appendChild(btn2);
    this.appendChild(btn3);

    this.boards[0].addEventListener('selection_finished', () => {
      this.notifier.showText('You can also reposition the ships by clicking over them, when you are ready press Start!');
    });
  }

  start() {
    this.notifier.showText('Welcome!!, to start the game, select your ships positions, '
    + 'by clicking over the board, you can rotate them using the mouse wheel.');


    // setting computed board:
    this.boards[1].autoMove();
    this.boards[1].hide();
  }
}

customElements.define('game-div', Game, { extends: 'div' });

export default Game;
