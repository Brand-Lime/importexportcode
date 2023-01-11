/**
 * Geeks Tutor JS
 */
; (function ($) {
	'use strict';

	const addStepperHeader = () => {
		let items = document.querySelectorAll('#courseForm .bs-stepper-content > .bs-stepper-pane:not(#course-general-info)');

		if (items.length < 1) {
			return;
		}

		let contentHeader = document.querySelector('#courseForm .bs-stepper-header');

		items.forEach((item, index) => {
			let id = item.getAttribute('id');
			let contentTitle = item.querySelector('.card-header h4');
			let title = contentTitle.innerHTML;

			contentHeader.innerHTML += `<div class="bs-stepper-line"></div><div class="step" data-target="#${id}"><button type="button" class="step-trigger" role="tab" id="${id}-tigger" aria-controls="${id}"><span class="bs-stepper-circle">${index + 2}</span><span class="bs-stepper-label">${title}</span></button></div>`;
		});
	}

	addStepperHeader();

})(jQuery);