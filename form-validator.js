import InputFactory from './input-factory';
import Translator from './translator';

export default class FormValidator {

	constructor(el, polyglot = null) {
		this.el = el;
		this.polyglot = polyglot ? polyglot : new Translator();
		this.inputs = [];
		this.init();
		this.bindEvents();
	}

	init() {
		this.el.setAttribute('novalidate', '');

		for (let index = 0; index < this.el.querySelectorAll('input, textarea, select').length; index++) {
			const input = this.el.querySelectorAll('input, textarea, select')[index];
			this.inputs.push(InputFactory.make(input, this.polyglot));
		}
	}

	bindEvents() {
		this.el.addEventListener('submit', this.submit.bind(this));
	}

	submit(e) {
		if (this.validate()) {
			return;
		}
		e.preventDefault();
	}

	validate() {
		let valid = true;
		for (let index = 0; index < this.inputs.length; index++) {
			const input = this.inputs[index];
			input.update();
			if (Object.keys(input.errors()).length !== 0) {
				valid = false;
			}
		}
		return valid;
	}
}
