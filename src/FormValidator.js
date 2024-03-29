import InputFactory from './InputFactory';
import Translator from './Translator';

export default class FormValidator {

	constructor(el, polyglot = null) {
		this.el = el;
		this.polyglot = polyglot ? polyglot : new Translator();
		this.inputs = [];
		this.valid = false;
		this.init();
		this.bindEvents();
	}

	init() {
		this.el.setAttribute('novalidate', '');
		const inputElements = this.el.querySelectorAll('input:not([type="button"], [type="submit"]), textarea, select');
		for (let index = 0; index < inputElements.length; index++) {
			const input = inputElements[index];
			this.inputs.push(InputFactory.make(input, this.polyglot));
		}
	}

  isValid() {
    return this.valid;
  }

  isInvalid() {
    return !this.isValid();
  }

	bindEvents() {
		this.el.addEventListener('submit', this.submit.bind(this));
	}

	submit(e) {
		if (this.validate()) {
			return;
		}

		if (this.invalidInputs().length > 0) {
			this.invalidInputs()[0].el.focus();
		}
		e.preventDefault();
	}

	invalidInputs() {
		return this.inputs.filter(input => Object.keys(input.errors()).length > 0);
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
    this.valid = valid;
		return this.valid;
	}

	addErrorFunction(element, errorFunction) {
		let foundInput = false;
		this.inputs.forEach(input => {
			if(input.el == element) {
				foundInput = input;
			}
		});
		foundInput.customErrors(errorFunction);
	}
}
