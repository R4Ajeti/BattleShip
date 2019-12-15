/* eslint-disable no-undef */
/* eslint arrow-parens: ["error", "as-needed"] */
import '../../css/board/block.css';

class Block extends HTMLLIElement {
  constructor(blkId) {
    super();
    this.defColor = '#3c82cd';
    this.appendChild(document.createTextNode(blkId));
    this.style.backgroundColor = this.defColor;
    this.blkId = blkId;
    this.blkOwnr = null;
    this.owner = null;
  }

  clean() {
    if (!this.owner) {
      this.style.backgroundColor = this.defColor;
    } else {
      this.style.backgroundColor = this.owner.color;
      this.textContent = this.blkId;
    }
  }

  select() {
    this.style.backgroundColor = '#9c1616';
  }

  paint(color) {
    this.style.backgroundColor = color;
    if (this.owner) {
      this.textContent = 'X';
    }
  }
}

customElements.define('blk-br', Block, { extends: 'li' });

export default Block;
