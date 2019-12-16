/* eslint-disable no-undef */
import Ship from './Ship';
import Block from './Block';
import '../../css/board/board.css';
import Player from '../Player';

class Board extends HTMLUListElement {
  constructor(playerName) {
    super();
    this.blocks = [];
    this.Ships = [
      new Ship(3, this.blocks, 'green'),
      new Ship(2, this.blocks, 'blue'),
      new Ship(2, this.blocks, 'blue'),
      new Ship(1, this.blocks, '#901388'),
      new Ship(1, this.blocks, '#901388'),
      new Ship(1, this.blocks, '#901388'),
      new Ship(0, this.blocks, '#ffcd1a'),
      new Ship(0, this.blocks, '#ffcd1a'),
      new Ship(0, this.blocks, '#ffcd1a'),
      new Ship(0, this.blocks, '#ffcd1a'),
    ];
    this.hidden = false;
    this.locked = false;
    this.player = new Player(playerName);

    [this.cShip] = this.Ships;

    for (let i = 0; i < 100; i += 1) {
      this.blocks.push(new Block(i));
    }


    this.onwheel = () => {
      if (this.cShip) {
        this.cShip.chageAxis();
      }
    };

    this.onmouseup = (e) => {
      if (!this.locked) {
        if (this.cShip) {
          this.cShip.setPosition();
          this.cShip = this.Ships.find((pc) => pc.status === 0);
          if (this.cShip) {
            this.cShip.draw(e.target);
          } else {
            this.dispatchEvent(new Event('selection_finished'));
          }
        } else if (e.target.owner && !this.hidden) {
          const pc = e.target.owner;
          pc.reset();
          pc.status = 0;
          pc.draw(e.target);
          this.cShip = pc;
        } else if (this.hidden) {
          e.target.hit();
          this.dispatchEvent(new Event('move_done'));
        }
      }
    };

    this.onmouseover = (e) => {
      if (!this.locked) {
        if (this.cShip) {
          this.cShip.draw(e.target);
        } else if (e.target.owner && !this.hidden) {
          e.target.owner.select();
        } else if (this.hidden) {
          e.target.select();
        }
      }
    };

    this.onmouseout = (e) => {
      if (this.cShip) {
        this.cShip.clean();
      } else if (e.target.owner && !this.hidden) {
        e.target.owner.clean();
      } else if (this.hidden) {
        e.target.cleanDef();
      }
    };
  }

  waitForMove() {
    return new Promise((resolve) => {
      this.addEventListener('mouseup', () => {
        resolve(true);
      }, { once: true });
    });
  }

  hasLost() {
    return this.Ships.every((ship) => ship.sunken);
  }

  autoMove() {
    this.Ships.forEach((spc) => {
      if (spc.status === 0) {
        const axis = Math.floor(Math.random() * 2 + 0) === 0 ? 'x' : 'y';
        spc.setAxis(axis);
        const pos = this.getPosibleMoves(spc);
        spc.draw(this.blocks[pos[Math.floor(Math.random() * pos.length)]]);
        spc.setPosition();
      }
    });
    this.cShip = null;
  }

  autoHit() {
    let posb = this.blocks.reduce((acc, item) => {
      if (!item.hitFlag) {
        acc.push(item.blkId);
      }
      return acc;
    }, []);
    posb = posb[Math.floor(Math.random() * posb.length)];

    this.blocks[posb].hit();
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

      // console.log(posb); sdfsd
    }

    // probando
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
    this.Ships.forEach((pc) => {
      pc.hide();
    });
    this.hidden = true;
  }


  show() {
    this.Ships.forEach((pc) => {
      pc.show();
      pc.addBorders();
    });
    this.hidden = false;
  }

  lock() {
    if (this.Ships.every((ship) => ship.status === 1)) {
      this.locked = true;
      return true;
    }
    return false;
  }

  unlock() {
    if (this.locked) {
      this.locked = false;
    }
  }
}

customElements.define('board-ul', Board, { extends: 'ul' });


export default Board;
