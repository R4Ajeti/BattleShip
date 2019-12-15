/* eslint-disable no-undef */
import Piece from './Piece';
import Block from './Block';
import '../../css/board/board.css';

class Board extends HTMLUListElement {
  constructor() {
    super();
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
    this.hidden = false;

    [this.cPiece] = this.pieces;

    for (let i = 0; i < 100; i += 1) {
      this.blocks.push(new Block(i));
    }


    this.onwheel = () => {
      if (this.cPiece) {
        this.cPiece.chageAxis();
      }
    };

    this.onmouseup = (e) => {
      if (this.cPiece) {
        this.cPiece.setPosition();
        this.cPiece = this.pieces.find((pc) => pc.status === 0);
        if (this.cPiece) { this.cPiece.draw(e.target); }
      } else if (e.target.owner && !this.hidden) {
        const pc = e.target.owner;
        pc.reset();
        pc.status = 0;
        pc.draw(e.target);
        this.cPiece = pc;
      }
    };


    this.onmouseover = (e) => {
      if (this.cPiece) { this.cPiece.draw(e.target); }
      if (e.target.owner && !this.cPiece && !this.hidden) {
        e.target.owner.select();
      }
    };

    this.onmouseout = (e) => {
      if (this.cPiece) { this.cPiece.clean(); }
      if (e.target.owner && !this.hidden) {
        e.target.owner.clean();
      }
    };
  }


  autoMove() {
    this.pieces.forEach((spc) => {
      if (spc.status === 0) {
        const axis = Math.floor(Math.random() * 2 + 0) === 0 ? 'x' : 'y';
        spc.setAxis(axis);
        const pos = this.getPosibleMoves(spc);
        spc.draw(this.blocks[pos[Math.floor(Math.random() * pos.length)]]);
        spc.setPosition();
      }
    });
    this.cPiece = null;
  }

  getPosibleMoves(spc) {
    let posb = [];
    const { axis } = spc;

    if (axis === 'y') {
      let avlb;
      for (let i = 0; i < 10; i += 1) {
        // get availables
        avlb = [];
        for (let j = i; j < (91 + i); j += 10) {
          if (!this.blocks[j].owner) {
            avlb.push(j);
          }
        }

        // get chunks
        const chnks = [];
        for (let k = 0; k < avlb.length; k += 1) {
          const chnk = [];
          let last = null;
          let j = k - 1;
          do {
            j += 1;
            chnk.push(avlb[j]);
            last = j;
          } while (j < avlb.length - 1 && avlb[j + 1] - avlb[j] === 10);

          if (last) {
            k = last;
          }

          // get posibles
          chnks.push(chnk);
          if (chnk.length > spc.len) {
            posb = posb.concat(chnk.slice(0, chnk.length - spc.len));
          }
        }
      }

      // console.log(posb);
    }


    if (axis === 'x') {
      let avlb;
      for (let i = 0; i < 91; i += 10) {
        // get availables
        avlb = [];
        for (let j = i; j < (10 + i); j += 1) {
          if (!this.blocks[j].owner) {
            avlb.push(j);
          }
        }

        // get chunks
        const chnks = [];
        for (let k = 0; k < avlb.length; k += 1) {
          const chnk = [];
          let last = null;
          let j = k - 1;
          do {
            j += 1;
            chnk.push(avlb[j]);
            last = j;
          } while (j < avlb.length - 1 && avlb[j + 1] - avlb[j] === 1);

          if (last) {
            k = last;
          }

          // get posibles
          chnks.push(chnk);


          if (chnk.length > spc.len) {
            posb = posb.concat(chnk.slice(0, chnk.length - spc.len));
          }
        }
      }
    }
    return posb;
  }

  draw() {
    this.blocks.forEach((b) => {
      this.appendChild(b);
    });
  }

  hide() {
    this.pieces.forEach((pc) => {
      pc.hide();
    });
    this.hidden = true;
  }


  show() {
    this.pieces.forEach((pc) => {
      pc.show();
      pc.addBorders();
    });
    this.hidden = false;
  }
}

customElements.define('board-ul', Board, { extends: 'ul' });


export default Board;
