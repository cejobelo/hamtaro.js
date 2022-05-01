import { AbstractModule, Ajax, Events, App } from 'hamtaro.js';

/**
 * Modals module.
 *
 * @author Phil'dy Jocelyn Belcou <pj.belcou@gmail.com>
 */
class ModalsModuleClass extends AbstractModule {
    /**
     * Loading.
     *
     * @type {boolean}
     */
    loading = false;

    /**
     * Close the current modal.
     *
     * @return {void}
     */
    closeCurrent() {
        let ModalElement = document.querySelector('.modal.show[ctrl]');
        if (!ModalElement) {
            return;
        }

        let ModalInstance = this.get(ModalElement.dataset.ctrl),
            DialogElement = document.querySelector('.modal.show .modal-dialog');

        if (ModalInstance) {
            DialogElement.classList.add('fadeOut');
            DialogElement.classList.remove('slideInDown');
        }
    }

    /**
     * Show a modal.
     *
     * @param {string} ctrl
     * @param {object} oData (optionnel) Additional params for the server request
     * @return {Promise}
     */
    show(ctrl, oData = {}) {
        if (!ctrl) {
            throw `[Modals.show] unknown ctrl : ${ctrl}`;
        }

        const _this = this;
        const ModalElement = document.querySelector(`.hamtaro-modal[data-ctrl="${ctrl}"]`);

        // The modal is in the DOM
        if (ModalElement) {
            let oEvent = new Event('show.modal');

            // Adds the additional params
            if (oData && !oData.hasOwnProperty('modal')) {
                oEvent['ModalData'] = oData;
            }

            // Adds the id to the url
            let urlid = $(ModalElement).attr('data-modal-urlid');
            if (urlid) {
                App.urlParam('modal', urlid);
            }

            ModalElement.dispatchEvent(oEvent);

            let oModal = window.MODALS[ctrl];

            if (oModal) {
                oModal.show(oEvent);
            }

            ModalElement.classList.add('show');
            document.querySelector('body').classList.add('modal-open');

            $('body').append('<div class="modal-backdrop fade show"></div>');
            $(ModalElement).find('.modal-dialog').addClass('slideInDown');
            Events.bindEventHandlers();
        } else {
            if (this.loading) {
                return Promise.reject('Loading in progress');
            } else {
                this.loading = true;
            }

            $('body').append(`
                <div id="HamtaroModalBackdrop" class="modal-backdrop fade show">
                  <div>Loading...</div>
                </div>
           `);

            $('#HamtaroModalBackdrop').animate({opacity: 0.5}, 0, function () {
                return Ajax.loadModal(ctrl, oData).then((AxiosResponse) => {
                    if (AxiosResponse['data']['success']) {
                        $('#HamtaroModalBackdrop').remove();

                        _this.loading = false;

                        _this.initModalResponse(AxiosResponse['data']);
                    } else {
                        _this.loading = false;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            });
        }
    }

    /**
     * Inits the ModalResponse.
     *
     * @param {Object} Response
     * @return {void}
     */
    initModalResponse(Response) {
        // No ModalResponse
        if (!Response.hasOwnProperty('modal')) {
            throw `[Modals.initModalResponse] No ModalResponse`;
        }

        let ctrl = Response['modal']['ctrl'],
            jsData = Response['modal']['jsData'],
            html = Response['modal']['html'];

        // Invalid ModalResponse
        if (!ctrl || !html) {
            throw `[Modals.initModalResponse] Invalid ModalResponse`;
        }

        // Close the current modal
        this.closeCurrent();

        // Adds the new modal
        let $modal = $(html);
        $('body').append($modal);

        // The modal class
        let oModal = window.MODALS[ctrl];

        if (oModal) {
            oModal.init(jsData);
        } else {
            Events.bindEventHandlers();
        }

        this.show(ctrl, jsData);
    }

    /**
     * Returns a modal instance.
     *
     * @param {string} ctrl
     * @return {AbstractModal}
     */
    get(ctrl) {
        return window.MODALS[ctrl];
    }
}

export const Modals = new ModalsModuleClass;