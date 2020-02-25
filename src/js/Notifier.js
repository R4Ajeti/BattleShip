/* eslint-disable no-undef */
import '../css/notifier.css';

class Notifier extends HTMLDivElement {
  constructor() {
    super();
    this.classList.add('notifier');
  }

  showText(msg) {
    this.textContent = msg;
  }
}

customElements.define('notf-div', Notifier, { extends: 'div' });
export default Notifier;
