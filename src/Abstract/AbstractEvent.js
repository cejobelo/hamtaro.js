/**
 * An event.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
export class AbstractEvent {
  /**
   * Returns the event name.
   *
   * @return {string}
   */
  getEvent() {
    return '';
  }

  /**
   * Returns element selector.
   *
   * @return {string}
   */
  getSelector() {
    throw `The method AbstractEvent::getSelector must be implemented`;
  }

  /**
   * Returns the event's id.
   *
   * @return {string}
   */
  getId() {
    return `${this.getEvent()}}${this.getSelector()}`;
  }

  /**
   * Returns true if is prevent default.
   *
   * @return {boolean}
   */
  isPreventDefault() {
    return false;
  }

  /**
   * Handler.
   *
   * @param {object }event
   * @param {HTMLElement} element
   * @return {void}
   */
  handler(event, element) {
  }
}