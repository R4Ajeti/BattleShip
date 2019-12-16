/* eslint-disable no-undef */
import Board from './board/Board';
import '../css/game.css';
import Notifier from './Notifier';

class Game extends HTMLDivElement {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    while (this.firstChild) {
      this.removeChild(this.firstChild);
    }

    this.boards = [
      new Board('Player1'),
      new Board('Computer'),
    ];

    this.notifier = new Notifier();
    this.classList.add('game');

    this.boards.forEach((board) => {
      const cont = document.createElement('div');
      const pNameEl = document.createElement('div');
      pNameEl.classList.add('playerName');
      pNameEl.style.width = '100%';
      pNameEl.textContent = board.player.name;
      cont.appendChild(pNameEl);
      cont.appendChild(board);
      this.appendChild(cont);
      board.draw();
    });

    this.btn = document.createElement('input');
    this.btn.setAttribute('type', 'button');
    this.btn.value = 'start';
    this.btn.onclick = () => this.start();

    this.appendChild(this.notifier);

    this.appendChild(this.btn);

    this.boards[0].addEventListener('selection_finished', () => {
      this.notifier.showText('You can also reposition the ships by clicking over them, when you are ready press Start!');
    });

    this.notifier.showText('Welcome!!, to start the game, select your ships positions, '
      + 'by clicking over the board, you can rotate them using the mouse wheel.');


    // setting computed board:
    this.boards[1].autoMove();
    this.boards[1].hide();
    this.boards[1].lock();
  }

  async start() {
    if (this.btn.value === 'restart') {
      this.reset();
    }
    if (this.boards[0].lock()) {
      this.boards[1].unlock();
      while (!this.boards[0].hasLost() && !this.boards[1].hasLost()) {
        this.notifier.showText('Click over the enemy\'s board to attack him');
        // eslint-disable-next-line no-await-in-loop
        await this.boards[1].waitForMove().then((resp) => {
          if (resp) {
            this.boards[0].autoHit();
          }
        });
      }
      this.boards[0].lock();
      this.boards[1].lock();
      const winner = !this.boards[0].hasLost() ? this.boards[0].player : this.boards[1].player;
      this.notifier.showText(`${winner.name} wins!!!`);
      this.btn.value = 'restart';
    }
  }
}

customElements.define('game-div', Game, { extends: 'div' });

export default Game;
