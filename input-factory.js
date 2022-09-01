import InputEmail from "./inputs/input-email";
import InputText from "./inputs/input-text";
import InputNumber from "./inputs/input-number";
import InputPassword from "./inputs/input-password";
import InputCheckbox from "./inputs/input-checkbox";
import InputRadio from "./inputs/input-radio";
import Select from "./inputs/select";
import TextArea from "./inputs/textarea";

export default class InputFactory {
	static make(el, polyglot) {
		switch (el.nodeName.toLowerCase()) {
			case 'textarea':
				return InputFactory.textarea(el, polyglot);
			case 'select':
				return InputFactory.select(el, polyglot);

			default:
				return InputFactory.input(el, polyglot);
		}
	}

	static input(el, polyglot) {
		switch (el.getAttribute('type')) {
			case 'email':
				return new InputEmail(el, polyglot);
			case 'number':
				return new InputNumber(el, polyglot);
			case 'password':
				return new InputPassword(el, polyglot);
			case 'radio':
				return new InputRadio(el, polyglot);
			case 'checkbox':
				return new InputCheckbox(el, polyglot);

			default:
				return new InputText(el, polyglot);
		}
	}

	static textarea(el, polyglot) {
		return new TextArea(el, polyglot);
	}

	static select(el, polyglot) {
		return new Select(el, polyglot);
	}
}
