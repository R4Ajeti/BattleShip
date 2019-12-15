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
    new Piece(1, this.blocks, '#901388'),
    new Piece(1, this.blocks, '#901388'),
    new Piece(1, this.blocks, '#901388'),
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
    if (this.cPiece) {
      this.cPiece.chageAxis();
    }
  };

  this.el.onmouseup = (e) => {
    if (this.cPiece) {
      this.cPiece.setPosition();
      this.cPiece = this.pieces.find((pc) => pc.status === 0);
      if (this.cPiece) { this.cPiece.draw(e.target); }
    } else if (e.target.owner) {
      const pc = e.target.owner;
      pc.reset();
      pc.status = 0;
      pc.draw(e.target);
      this.cPiece = pc;
    }
  };


  this.el.onmouseover = (e) => {
    if (this.cPiece) { this.cPiece.draw(e.target); }
    if (e.target.owner && !this.cPiece) {
      e.target.owner.select();
    }
  };

  this.el.onmouseout = (e) => {
    if (this.cPiece) { this.cPiece.clean(); }
    if (e.target.owner) {
      e.target.owner.clean();
    }
  };
}

Board.prototype.autoMove = function autoMove() {
  const spc = this.pieces.find((pc) => pc.status === 0);
  // const axis = Math.floor(Math.random() * 2 + 0) === 0 ? 'x' : 'y';
  const axis = 'y';
  if (axis === 'y') {
    let pos;
    let chnk;
    for (let i = 0; i < 10; i += 1) {
      pos = [];
      chnk = [];
      for (let j = i; j < (90 + i) - (spc.len * 10); j += 10) {
        pos.push(j);
        if (!this.blocks[j].owner) {
          chnk.push(j);
        }
      }
      console.log(pos);
      console.log(chnk);
    }
  }
};

Board.prototype.draw = function draw() {
  this.blocks.forEach((b) => {
    this.el.appendChild(b);
  });
};
