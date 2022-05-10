import { AbstractComponent } from 'hamtaro.js';

/**
 * A modale.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
export class AbstractModal extends AbstractComponent {
  /**
   * The Bootstrap modal instance.
   *
   * @type {null}
   */
  BsInstance = null;

  /**
   * Returns the custom selector.
   *
   * @return {string}
   */
  getCustomSelector() {
    return `.hamtaro-modal[data-ctrl="${this.ctrl}"]`;
  }

  /**
   * Runs when modal is showing.
   *
   * @param {object} event
   */
  show(event) {
  }

  /**
   * Runs when modal is shown.
   *
   * @param {object} event
   */
  shown(event) {
  }

  /**
   * Runs when modal is hiding.
   *
   * @param {object} event
   */
  hide(event) {
  }

  /**
   * Runs when modal is hidden.
   *
   * @param {object} event
   */
  hidden(event) {
  }

  /**
   * Returns true if the modal is destroyable after hide.
   *
   * @return {boolean}
   */
  isDestroyable() {
    return true;
  }

  /**
   * Returns true if the modal is closable.
   *
   * @return {boolean}
   */
  isClosable() {
    return true;
  }
}