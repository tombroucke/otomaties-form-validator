import Input from "./input";

export default class InputCheckbox extends Input{
	constructor(el, polyglot) {
		super(el, polyglot);
		this.isRequired = this.el.hasAttribute('required');
    	this.errorPlacement = this.el.parentNode;
	}

	errors(errors = {}) {
		if(this.isRequired && !this.el.checked) {
			errors.required = this.errorMessage('required', this.polyglot.t('This field is required'));
		}
		return super.errors(errors);
	}
}
