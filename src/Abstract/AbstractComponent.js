import $ from 'jquery';

/**
 * A component.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
export class AbstractComponent {
  constructor() {
    this.ctrl = this.getCtrl();
    this.selector = this.getCustomSelector();
  }

  /**
   * Returns the ctrl.
   *
   * @return {string}
   */
  getCtrl() {
    throw `The method AbstractComponent::getCtrl must be implemented`;
  }

  /**
   * Returns the custom selector.
   *
   * @return {string}
   */
  getCustomSelector() {
    return `.hamtaro-component[data-ctrl="${this.getCtrl()}"]`;
  }

  /**
   * Destroy the component.
   *
   * @return {void}
   */
  destroy() {
    document.querySelector(this.selector).remove();
  }

  /**
   * Returns the jQuery element.
   *
   * @return {jQuery}
   */
  jQuery() {
    return $(this.selector);
  }

  /**
   * Runs at component initialization.
   *
   * @param {object} oData
   * @return {void}
   */
  init(oData) {
  }
}