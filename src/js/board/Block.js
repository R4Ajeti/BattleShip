/* eslint-disable no-undef */
/* eslint arrow-parens: ["error", "as-needed"] */
import '../../css/board/block.css';
import bombImg from '../../assets/images/bomb.png';
import WatImg from '../../assets/images/water.png';

class Block extends HTMLLIElement {
  constructor(blkId) {
    super();
    this.defColor = '#7f91a4';
    this.appendChild(document.createTextNode(blkId));
    this.style.backgroundColor = this.defColor;
    this.blkId = blkId;
    this.owner = null;
    this.hitFlag = false;
  }

  reset() {
    this.defColor = '#7f91a4';
    this.removeChild(document.firstChild);
    this.appendChild(document.createTextNode(blkId));
    this.style.backgroundColor = this.defColor;
    this.owner = null;
    this.hitFlag = false;
  }


  clean() {
    if (!this.owner) {
      this.style.backgroundColor = this.defColor;
    } else {
      this.style.backgroundColor = this.owner.color;
      this.textContent = this.blkId;
    }
  }

  cleanDef() {
    if (this.owner) {
      if (this.owner.sunken) {
        this.style.backgroundColor = this.owner.color;
      } else {
        this.style.backgroundColor = this.defColor;
      }
    } else {
      this.style.backgroundColor = this.defColor;
    }
  }


  hide() {
    if (this.owner) {
      this.style.backgroundColor = this.defColor;
      this.style.border = 0;
    }
  }

  show() {
    if (this.owner) {
      this.style.backgroundColor = this.owner.color;
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

  hit() {
    const bomb = document.createElement('img');
    bomb.onmouseover = e => { e.stopPropagation(); };
    bomb.onmouseup = e => { e.stopPropagation(); };
    bomb.onmouseout = e => { e.stopPropagation(); };
    this.textContent = '';

    this.appendChild(bomb);
    this.hitFlag = true;
    if (this.owner) {
      bomb.src = bombImg;
      this.owner.isSunk();
    } else {
      bomb.src = WatImg;
    }
  }
}

customElements.define('blk-br', Block, { extends: 'li' });

export default Block;
