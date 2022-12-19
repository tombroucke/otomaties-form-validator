import SimpleInput from "./SimpleInput";

export default class InputNumber extends SimpleInput {
	errors(errors = {}) {
		if (!isNaN(this.el.value)) {
			const floatValue = parseFloat(this.el.value);
	
			// Check max
			const max = parseFloat(this.el.getAttribute('max'));
			if(max && floatValue > max) {
				let errorMessage = this.errorMessage('max', this.polyglot.t('Enter a value less than or equal to {0}'));
				errors.max = errorMessage.replace('{0}', max);
			}
	
			// Check min
			const min = parseFloat(this.el.getAttribute('min'));
			if(min && floatValue < min) {
				let errorMessage = this.errorMessage('min', this.polyglot.t('Enter a value greater than or equal to {0}'));
				errors.min = errorMessage.replace('{0}', min);
			}
		}

		return super.errors(errors);
	}
}
