
class Piece {
  constructor(len, blocks, color) {
    this.len = len;
    this.axis = 'y';
    this.coor = [];
    this.status = 0;
    this.sibs = null;
    this.blkId = null;
    this.blocks = blocks;
    this.color = color;
  }

  chageAxis() {
    if (this.status === 0) {
      this.axis = this.axis === 'x' ? 'y' : 'x';
      this.clean();
      this.sibs = this.getSiblings(this.axis, this.len);
      this.paint(this.color);
    }
  }

  setPosition() {
    this.status = 1;
    this.sibs.forEach((blk) => {
      this.blocks[blk].owner = this;
    });
    this.paint(this.color);
  }

  draw(target) {
    if (this.status === 0) {
      this.blkId = target.blkId;
      this.sibs = this.getSiblings(this.axis, this.len);
      this.paint(this.color);
    }
  }

  paint() {
    this.sibs.forEach((blk) => {
      this.blocks[blk].paint(this.color);
    });
  }

  clean() {
    if (this.sibs && this.status === 0) {
      this.sibs.forEach((blk) => {
        this.blocks[blk].clean();
      });
    }
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
      rmin = this.blkId + (dist);
      inc = 1;
    }

    if (axis === 'y') {
      const dv = (this.blkId / 10);
      min = 10 * (dv - Math.floor(dv)).toFixed(2);
      max = min + (90);
      rmin = this.blkId + (dist * 10);
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


export default Piece;
