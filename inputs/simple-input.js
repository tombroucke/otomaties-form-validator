import Input from "./input";

export default class SimpleInput extends Input {
	errors(errors = {}) {
		if(this.isRequired() && this.el.value.length == 0) {
			errors.required = this.polyglot.t('Field is required');
		}
		return super.errors(errors);
	}

	isRequired() {
		return this.el.hasAttribute('required');
	}
}
