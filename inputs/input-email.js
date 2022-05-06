import SimpleInput from "./simple-input";
import isEmail from 'validator/es/lib/isEmail';

export default class InputEmail extends SimpleInput {
	errors(errors = {}) {
		if(!isEmail(this.val())) {
			errors.emailFormat = this.polyglot.t('Please enter a valid e-mailaddress');
		}
		return super.errors(errors);
	}
}
