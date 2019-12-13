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

  this.el.onmouseover = (e) => {
    console.log(e.target.sayName());
  };
}


Board.prototype.draw = function draw() {
  this.blocks.forEach((b) => {
    this.el.appendChild(b);
  });
};
