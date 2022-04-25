import { AbstractModule } from 'hamtaro.js';
import axios from 'axios';

/**
 * Ajax module.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
class AjaxModuleClass extends AbstractModule {
  /**
   * POST request.
   *
   * @param {string} ctrl
   * @param {object} data
   */
  async request(ctrl, data) {
    return await axios.post('/ajax', Object.assign(data, {ctrl: `App/Controller/Ajax/${ctrl}`}));
  }

  /**
   * Loads a modal.
   *
   * @param {string} ctrl
   * @param {object} data
   */
  async loadModal(ctrl, data) {
    return await axios.post('/ajax', Object.assign(data, {ctrl: `App/Controller/Modal/${ctrl}`}));
  }

  /**
   * Submit a form.
   *
   * @param {string} ctrl
   * @param {object} data
   */
  async submitForm(ctrl, data) {
    return await axios.post('/ajax', Object.assign(data, {ctrl: `App/Controller/Form/${ctrl}`}));
  }
}

export const Ajax = new AjaxModuleClass;