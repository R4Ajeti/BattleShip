/* eslint-disable no-undef */
import Piece from './Piece';
import Block from './Block';
import '../../css/board/board.css';

export default function Board() {
  this.el = document.createElement('ul');
  this.blocks = [];
  this.mPiece = new Piece();

  for (let i = 0; i < 100; i += 1) {
    this.blocks.push(new Block(i));
  }

  // const a = new Block();
  // console.log(a);

  let sibs;
  let axis = 'x';

  this.el.onclick = (e) => {
    sibs.forEach((blk) => {
      this.blocks[blk].clean();
    });

    axis = axis === 'x' ? 'y' : 'x';
    sibs = e.target.getSiblings(axis, 3);

    sibs.forEach((blk) => {
      this.blocks[blk].paint();
    });
  };

  this.el.onmouseover = (e) => {
    sibs = e.target.getSiblings(axis, 3);

    sibs.forEach((blk) => {
      this.blocks[blk].paint();
    });
  };

  this.el.onmouseout = (e) => {
    sibs.forEach((blk) => {
      this.blocks[blk].clean();
    });
  };
}


Board.prototype.draw = function draw() {
  this.blocks.forEach((b) => {
    this.el.appendChild(b);
  });
};
