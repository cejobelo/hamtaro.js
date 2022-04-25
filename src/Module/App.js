import { AbstractModule } from 'hamtaro.js';

/**
 * App module.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
class AppModuleClass extends AbstractModule {
  /**
   * Returns the url params.
   *
   * @return {Object}
   */
  getUrlParams() {
    let sSearch = location.search.substring(1);

    if (sSearch) {
      return JSON.parse('{"' + decodeURI(sSearch.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
    }

    return {};
  }

  /**
   * Modifies an url param.
   *
   * @param name
   * @param value
   * @return {void}
   */
  urlParam(name, value) {
    let url = new URL(window.location);

    if (value) {
      url.searchParams.set(name, value);
    } else {
      url.searchParams.delete(name);
    }

    window.history.pushState({}, '', url);
  }
}

export const App = new AppModuleClass;