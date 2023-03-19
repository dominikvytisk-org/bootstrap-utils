/*!
  * Bootstrap.utils.js (https://github.com/dominikvytisk/bootstrap5-utils)
  * Copyright 2023 Dominik Vytisk (dominik@vytisk.cz)
  * Licensed under MIT (https://github.com/dominikvytisk/bootstrap5-utils/LICENSE)
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define([], factory) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bsUtils = factory());
})(this, function () {
    'use strict';
    const bsUtils = {
        bootstrapVersion: null,
        bootstrapMajorVersion: null,
        modalEl: {},
        modalDefault: {
            draggable: false,
            disableCloseOutside: false,
            showCloseButton: true,
            size: ''
        }
    };
    bsUtils.version = '1.0.0';

    bsUtils.compabilityTest = () => {
        if (bsUtils.bootstrapVersion) {
            const [major, minor, patch] = bsUtils.bootstrapVersion.split('.').map(Number);
            const isSupported = (major === 4 && minor >= 6) || (major === 5 && minor === 0) || (major === 5 && minor === 1) || (major === 5 && minor === 2);
            if (!isSupported) {
                throw new Error(`Bootstrap version is not supported. \nYour version of bootstrap is: ${bsUtils.bootstrapVersion} `);
            }
        }
    }
    bsUtils.getBootstrapVersion = () => {
        if (typeof bootstrap !== 'undefined' && typeof bootstrap.Tooltip !== 'undefined' && typeof bootstrap.Tooltip.VERSION !== 'undefined') {
            const versionRegex = bootstrap.Tooltip.VERSION.match(/^(\d+\.\d+(?:\.\d+)*)/);
            const versionNumber = versionRegex ? versionRegex[1] : null;
            if(versionNumber !== null){
                bsUtils.bootstrapVersion = versionNumber;
                const [major] = versionNumber.split('.').map(Number);
                bsUtils.bootstrapMajorVersion = major;
            }else{
                console.error('Bootstrap version detection error.');
            }
        } else {
            console.error('Bootstrap is not loaded or does not exist.');
        }
        bsUtils.compabilityTest();
    }
    bsUtils.getBootstrapVersion();

    bsUtils.createModal = (options) => {
        const { title, body, buttons, ...modalOptions } = options;
        const validateSizeModal = (size) => {
            if(['modal-sm','modal-lg','modal-xl'].includes(size)){
                return size;
            }
        }
        const draggableModal = (selector, options) => {
            const elements = document.querySelectorAll(selector);
            options = Object.assign({handle: "", cursor: "move"}, options);
                function onMouseDown(event) {
                    const isInputElement = event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA";
                    if (isInputElement) {
                        return;
                    }
                    event.preventDefault();
                    let drag = event.target.closest(selector);
                    if (!drag) {
                        return;
                    }

                    if (options.handle !== "") {
                        if (!event.target.matches(options.handle)) {
                            return;
                        }
                        drag = event.target.closest(selector + " " + options.handle);
                    }
                    drag.classList.add("draggable");
                    const dragHeight = drag.offsetHeight;
                    const dragWidth = drag.offsetWidth;
                    const positionY = drag.offsetTop + dragHeight - event.pageY;
                    const positionX = drag.offsetLeft + dragWidth - event.pageX;
                    const zIndex = drag.style.zIndex;
                    drag.style.zIndex = "1000";

                    document.addEventListener("mousemove", onMouseMove);
                    document.addEventListener("mouseup", onMouseUp);

                    function onMouseMove(event) {
                        const top = event.pageY + positionY - dragHeight;
                        const left = event.pageX + positionX - dragWidth;
                        drag.style.top = top + "px";
                        drag.style.left = left + "px";
                    }
                    function onMouseUp() {
                        document.removeEventListener("mousemove", onMouseMove);
                        document.removeEventListener("mouseup", onMouseUp);
                        drag.classList.remove("draggable");
                        drag.style.zIndex = zIndex;
                    }
                }
                elements.forEach(function(element) {
                    element.querySelector('.modal-header').style.cursor = options.cursor;
                    element.addEventListener("mousedown", onMouseDown);
                });
        }

        // Create the modal container
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'show');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'modalTitle');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        if(modalOptions.disableCloseOutside ?? bsUtils.modalDefault.disableCloseOutside){
            modal.setAttribute('data-bs-backdrop', 'static');
            modal.setAttribute('data-bs-keyboard', 'false');
        }
        modal.style.display = 'block';

        // Create the modal dialog
        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        if(typeof modalOptions.size !== "undefined" && validateSizeModal(modalOptions.size)){
            modalDialog.classList.add(modalOptions.size);
        }
        modal.appendChild(modalDialog);

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalDialog.appendChild(modalContent);

        // Create the modal header
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        modalContent.appendChild(modalHeader);

        // Create the modal title
        const modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.setAttribute('id', 'modalTitle');
        modalTitle.textContent = title || 'Modal title';
        modalHeader.appendChild(modalTitle);

        // Create the close button
        const closeBut = document.createElement('button');
        closeBut.classList.add(bsUtils.bootstrapMajorVersion <= 4 ? 'close':'btn-close');
        closeBut.setAttribute('type', 'button');
        closeBut.setAttribute(bsUtils.bootstrapMajorVersion <= 4 ? 'data-dismiss' : 'data-bs-dismiss', 'modal');
        closeBut.setAttribute('aria-label', 'Close');
        if(bsUtils.bootstrapMajorVersion <= 4){
            closeBut.innerHTML = `<span aria-hidden="true">&times;</span>`;
        }
        modalHeader.appendChild(closeBut);

        // Create the modal body
        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.innerHTML = body;
        modalContent.appendChild(modalBody);

        // Create the modal footer
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        modalContent.appendChild(modalFooter);

        if (buttons.hasOwnProperty('save')) {
            const saveButton = document.createElement('button');
            saveButton.classList.add('btn', 'btn-primary');
            saveButton.setAttribute('type', 'button');
            saveButton.innerHTML = 'Save';
            saveButton.addEventListener('click', (event) =>
                buttons?.save(event, modal)
            );
            modalFooter.appendChild(saveButton);
        }

        if (buttons.hasOwnProperty('edit')) {
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary');
            editButton.setAttribute('type', 'button');
            editButton.innerHTML = 'Edit';
            editButton.addEventListener('click', (event) =>
                buttons?.edit(event, modal)
            );
            modalFooter.appendChild(editButton);
        }

        if (buttons.hasOwnProperty('delete')) {
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.setAttribute('type', 'button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.addEventListener('click', (event) =>
                buttons?.delete(event, modal)
            );
            modalFooter.appendChild(deleteButton);
        }

        if(modalOptions.showCloseButton ?? bsUtils.modalDefault.showCloseButton){
            const closeButton = document.createElement('button');
            closeButton.classList.add('btn', 'btn-secondary');
            closeButton.setAttribute('type', 'button');
            closeButton.setAttribute(bsUtils.bootstrapMajorVersion <= 4 ? 'data-dismiss' : 'data-bs-dismiss', 'modal');
            closeButton.innerHTML = 'Close';
            closeButton.addEventListener('click', (event) =>
                buttons?.close(event, modal)
            );
            modalFooter.appendChild(closeButton);
        }

        // Append the modal to the body
        document.body.appendChild(modal);

        // Show the modal
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
        bsUtils.modalEl = modal;
        if (modalOptions.draggable ?? bsUtils.modalDefault.draggable){
            draggableModal('.modal-content');
        }

        // Remove the modal when it is closed
        modalInstance._element.addEventListener('hidden.bs.modal', function (e) {
            modalOptions?.hideCallback(modal);
            modalInstance.dispose();
            modal.remove();
        });

        modalInstance._element.addEventListener('shown.bs.modal', function (e) {
            modalOptions?.showCallback(modal);
        });

        return modal;
    };



    return bsUtils;
});
