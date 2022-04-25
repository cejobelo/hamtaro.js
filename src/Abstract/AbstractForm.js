import { AbstractComponent } from 'hamtaro.js';

/**
 * A form.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
export class AbstractForm extends AbstractComponent {
  /**
   * Returns the custom selector.
   *
   * @return {string}
   */
  getCustomSelector() {
    return `.hamtaro-form[data-ctrl="${this.getCtrl()}"]`;
  }

  /**
   * Returns the form data.
   *
   * @return {Object}
   */
  getData() {
    let aData = this.jQuery().serializeArray(),
        oData = {};

    for (let i = 0; i < aData.length; i++) {
      oData[aData[i]['name']] = aData[i]['value'];
    }

    return oData;
  }

  /**
   * Runs before the form is submitted.
   *
   * @return void
   */
  beforeSubmit() {
  }

  /**
   * Runs after the form is submitted.
   *
   * @return void
   */
  afterSubmit() {
  }

  /**
   * Runs if the request is succeded.
   *
   * @param {Object} Response
   * @return {void}
   */
  success(Response) {
  }

  /**
   * Runs if error.
   *
   * @param {Object} Response
   * @return {void}
   */
  error(Response) {
    console.error(Response);
  }

  /**
   * Reset the form.
   *
   * @return {void}
   */
  reset() {
    let $form = this.jQuery();
    $form[0].reset();
    $form.find('[type="hidden"]').val('');
  }

  /**
   * Submit the form.
   *
   * @return {void}
   */
  submit() {
    document.querySelector(this.selector).dispatchEvent(new Event('submit'));
  }
}