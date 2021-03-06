import { AbstractModule, Ajax, Events, App } from 'hamtaro.js';
import $ from 'jquery';
const bootstrap = require('bootstrap');

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
        let ModalElement = document.querySelector('.modal.show[data-ctrl]');
        if (!ModalElement) {
            return;
        }

        let Modal = this.get(ModalElement.dataset.ctrl);
        Modal.BsInstance.hide();
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

            Events.bindEventHandlers();

            // Adds the additional params
            if (oData && !oData.hasOwnProperty('modal')) {
                oEvent['ModalData'] = oData;
            }

            // Adds the id to the url
            let urlid = $(ModalElement).attr('data-modal-urlid');
            if (urlid) {
                App.urlParam('modal', urlid);
            }

            let BackdropDiv = document.querySelector('#HamtaroModalBackdrop div');
            if (BackdropDiv) {
                BackdropDiv.remove();
            }

            let BootstrapModal = new bootstrap.Modal(ModalElement, {
                backdrop: !Boolean(document.querySelector('.modal-backdrop')),
            });

            BootstrapModal.show();

            ModalElement.dispatchEvent(oEvent);

            let Modal = window.MODALS[ctrl];

            Modal.BsInstance = BootstrapModal;

            if (Modal) {
                Modal.show(oEvent);
            }

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
                        //$('#HamtaroModalBackdrop').remove();

                        _this.loading = false;

                        _this.initModalResponse(AxiosResponse['data']);
                    } else {
                        _this.loading = false;
                        console.error(AxiosResponse['data']);
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

        let oModal = this.get(ctrl);

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