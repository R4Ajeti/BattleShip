/* eslint-disable no-undef */
/* eslint arrow-parens: ["error", "as-needed"] */
import '../../css/board/block.css';

class Block extends HTMLLIElement {
  constructor(blkId) {
    super();
    this.appendChild(document.createTextNode(blkId));
    this.blkId = blkId;
  }

  sayName() {
    console.log(this.getSibblings());
  }

  clean() {
    this.style.backgroundColor = '#790707';
  }

  paint() {
    this.style.backgroundColor = 'green';
  }

  getSiblings(axis = 'x', dist = 2) {
    const sibs = [];
    let min;
    let max;
    let rmin;
    let inc;

    if (axis === 'x') {
      const fl = Math.floor(this.blkId / 10);
      min = (fl * 10);
      max = (fl * 10) + 9;
      rmin = Math.abs(this.blkId + (dist));
      inc = 1;
    }

    if (axis === 'y') {
      const dv = (this.blkId / 10);
      min = 10 * (dv - Math.floor(dv)).toFixed(2);
      max = min + (90);
      rmin = Math.abs(this.blkId + (dist * 10));
      inc = 10;
    }

    let i = dist < 0 ? rmin : this.blkId;
    i = i >= min ? i : min;
    let f = dist < 0 ? this.blkId : rmin;
    f = f <= max ? f : max;

    for (i; i <= f; i += inc) {
      sibs.push(i);
    }

    return sibs;
  }
}

customElements.define('blk-br', Block, { extends: 'li' });

export default Block;
