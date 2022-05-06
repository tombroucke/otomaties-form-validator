export default class Input {
	constructor(el, polyglot) {
		this.el = el;
		this.polyglot = polyglot;
		this.init();
		this.bindEvents();
	}

	init() {}

	bindEvents() {
		const input = this;
		['change', 'blur'].forEach(function(e){
			input.el.addEventListener(e, input.update.bind(input));
		})
	}
 
	id() {
		const name = this.el.getAttribute('name');
		return name.replace('[', '-').replace(']', '');
	}

	errors(errors = {}) {
		return errors;
	}

	val() {
		return this.el.value;
	}

	update() {
		if (!this.errors() || Object.keys(this.errors()).length === 0) {
			this.el.classList.remove('error');
			this.removeErrorMessage();
		} else {
			this.el.classList.add('error');
			this.el.parentNode.insertBefore(this.createErrorMessageElement(this.errors()), this.el.nextSibling);
		}
	}

	createErrorMessageElement(errors) {
		this.removeErrorMessage();
		let errorMessage = document.createElement('span');
		errorMessage.classList.add('error');
		errorMessage.classList.add('error-' + this.id());

		let unorderedList = document.createElement('ul');

		for (const [key, error] of Object.entries(errors)) {
			let errorListItem = document.createElement('li');
			errorListItem.innerHTML = '<li>' + error + '</li>';
			unorderedList.appendChild(errorListItem);
		}
		errorMessage.appendChild(unorderedList);
		return errorMessage;
	}

	findErrorMessage() {
		return document.querySelector('span.error-' + this.id());
	}

	removeErrorMessage() {
		const errorMessage = this.findErrorMessage();
		if(errorMessage) {
			errorMessage.remove();
		}
	}
}
