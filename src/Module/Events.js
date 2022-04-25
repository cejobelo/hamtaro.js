import { AbstractModule } from 'hamtaro.js';

/**
 * Events module.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
class EventsModuleClass extends AbstractModule {
    /**
     * Adds events.
     *
     * @param {AbstractEvent[]|object[]} EventClasses
     * @return {this}
     */
    addEventHandlers(EventClasses) {
        if (!window.Array.isArray(EventClasses)) {
            throw `[EventsModuleClass.addEventHandlers] EventClasses must be an array`;
        }

        EventClasses.forEach((EventClass) => {
            this.addEventHandler(EventClass);
        });

        return this;
    }

    /**
     * Adds an event.
     *
     * @param {AbstractEvent} EventInstance
     * @return {this}
     */
    addEventHandler(EventInstance) {
        if (typeof EventInstance !== 'object') {
            throw `[Events.addEventHandler] param EventInstance must be an AbstractEvent instance`;
        }

        window.EVENTS.push(EventInstance);

        return this;
    }

    /**
     * Binds events.
     *
     * @return {this}
     */
    bindEventHandlers() {
        for (let i = 0; i < window.EVENTS.length; i++) {
            this.bindEventHandler(window.EVENTS[i]);
        }

        return this;
    }

    /**
     * Binds an event.
     *
     * @param {AbstractEvent} EventInstance
     * @return {this}
     */
    bindEventHandler(EventInstance) {
        window.document.querySelectorAll(EventInstance.getSelector()).forEach((element) => {
            this.bindElementEvent(element, EventInstance);
        });

        return this;
    }

    /**
     * Binds an element with an event.
     *
     * @param element
     * @param {AbstractEvent} EventInstance
     * @return {this}
     */
    bindElementEvent(element, EventInstance) {
        let callback = function(oNativeEvent) {
            if (EventInstance.isPreventDefault()) {
                oNativeEvent.preventDefault();
            }

            EventInstance.handler.bind(window.Object.assign(this, EventInstance), oNativeEvent, element)();
        };

        // The event is already attached to the element
        if (element.hasOwnProperty(EventInstance.getId())) {
            return this;
        } else {
            element[EventInstance.getId()] = true;
        }

        EventInstance.getEvent().split(',').forEach(function(event) {
            element.addEventListener(event.trim(), callback, false);
        });

        return this;
    }
}

export const Events = new EventsModuleClass;