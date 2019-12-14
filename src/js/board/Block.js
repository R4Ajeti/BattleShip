/* eslint-disable no-undef */
/* eslint arrow-parens: ["error", "as-needed"] */
import '../../css/board/block.css';

class Block extends HTMLLIElement {
  constructor(blkId) {
    super();
    this.appendChild(document.createTextNode(blkId));
    this.blkId = blkId;
    this.blkOwnr = null;
    this.owner = null;
  }

  clean() {
    if (!this.owner) {
      this.style.backgroundColor = '#790707';
    } else {
      this.style.backgroundColor = this.owner.color;
      this.textContent = this.blkId;
    }
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
