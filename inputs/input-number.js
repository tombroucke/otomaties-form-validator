import SimpleInput from "./simple-input";

export default class InputNumber extends SimpleInput {
	errors(errors = {}) {
		// Check max
		const max = this.el.getAttribute('max');
		if(max && this.val() && this.val() > max) {
			let errorMessage = this.polyglot.t('Enter a value less than or equal to {0}');
			errors.max = errorMessage.replace('{0}', max);
		}

		// Check min
		const min = this.el.getAttribute('min');
		if(min && this.val() && this.val() < min) {
			let errorMessage = this.polyglot.t('Enter a value greater than or equal to {0}');
			errors.min = errorMessage.replace('{0}', min);
		}

		return super.errors(errors);
	}
}
