import SimpleInput from "./simple-input";

export default class Select extends SimpleInput {
	errors(errors = {}) {
		if(this.isRequired && this.el.value.length == 0) {
			errors.required = this.errorMessage('required', this.polyglot.t('Please select an option'));
		}
		return super.errors(errors);
	}
}
