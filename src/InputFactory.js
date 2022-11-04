import InputEmail from "./inputs/InputEmail";
import InputText from "./inputs/InputText";
import InputNumber from "./inputs/InputNumber";
import InputPassword from "./inputs/InputPassword";
import InputCheckbox from "./inputs/InputCheckbox";
import InputRadio from "./inputs/InputRadio";
import Select from "./inputs/Select";
import TextArea from "./inputs/Textarea";

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
