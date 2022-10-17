import SimpleInput from "./simple-input";
import isEmail from 'validator/es/lib/isEmail';

export default class InputEmail extends SimpleInput {
	errors(errors = {}) {
		if(this.val().length > 0 && !isEmail(this.val())) {
			errors.emailFormat = this.errorMessage('email-format', this.polyglot.t('Please enter a valid e-mailaddress'));
		}
		return super.errors(errors);
	}
}
