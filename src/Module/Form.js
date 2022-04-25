import { AbstractModule } from 'hamtaro.js';

/**
 * Form module.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
class FormModuleClass extends AbstractModule {
  /**
   * Reset a form.
   *
   * @param {string} sCtrl
   */
  reset(sCtrl) {
    let Form = window.FORMS[sCtrl] || undefined;

    if (!Form) {
      throw `[Form.reset] Can't reset unknown form : ${sCtrl}`;
    }

    Form.reset();
  }

  /**
   * Submit a form.
   *
   * @param {string} sCtrl
   * @return {void}
   */
  submit(sCtrl) {
    window.FORMS[sCtrl].submit();
  }

  /**
   * Returns a form instance.
   *
   * @param {string} sCtrl
   * @return {AbstractForm}
   */
  get(sCtrl) {
    return window.FORMS[sCtrl];
  }
}

export const Form = new FormModuleClass;