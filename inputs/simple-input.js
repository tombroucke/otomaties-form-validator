import Input from "./input";

export default class SimpleInput extends Input {
	constructor(el, polyglot) {
		super(el, polyglot);
		this.isRequired = this.el.hasAttribute('required');
	}

	errors(errors = {}) {
		if(this.isRequired && this.el.value.length == 0) {
			errors.required = this.polyglot.t('This field is required');
		}
		return super.errors(errors);
	}
}
