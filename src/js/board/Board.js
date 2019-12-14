/* eslint-disable no-undef */
import Piece from './Piece';
import Block from './Block';
import '../../css/board/board.css';

export default function Board() {
  this.el = document.createElement('ul');
  this.blocks = [];
  this.pieces = [
    new Piece(3, this.blocks, 'green'),
    new Piece(2, this.blocks, 'blue'),
    new Piece(2, this.blocks, 'blue'),
    new Piece(1, this.blocks, 'gray'),
    new Piece(1, this.blocks, 'gray'),
    new Piece(1, this.blocks, 'gray'),
    new Piece(0, this.blocks, '#efda25'),
    new Piece(0, this.blocks, '#efda25'),
    new Piece(0, this.blocks, '#efda25'),
    new Piece(0, this.blocks, '#efda25'),
  ];

  [this.cPiece] = this.pieces;

  for (let i = 0; i < 100; i += 1) {
    this.blocks.push(new Block(i));
  }


  this.el.onwheel = () => {
    this.cPiece.chageAxis();
  };

  this.el.onclick = () => {
    if (this.cPiece) {
      this.cPiece.setPosition();
      this.cPiece = this.pieces.find((pc) => pc.status === 0);
    }
  };

  this.el.onmouseover = (e) => {
    if (this.cPiece) { this.cPiece.draw(e.target); }
  };

  this.el.onmouseout = () => {
    if (this.cPiece) { this.cPiece.clean(); }
  };
}


Board.prototype.draw = function draw() {
  this.blocks.forEach((b) => {
    this.el.appendChild(b);
  });
};
