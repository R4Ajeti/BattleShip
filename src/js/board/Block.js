/* eslint-disable no-undef */
/* eslint arrow-parens: ["error", "as-needed"] */
import '../../css/board/block.css';

class Block extends HTMLLIElement {
  constructor(name) {
    super();

    this.name = name;
  }

  sayName() {
    this.style.backgroundColor = 'green';
  }
}

customElements.define('board-block', Block, { extends: 'li' });

export default Block;
