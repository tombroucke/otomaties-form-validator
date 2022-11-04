import Input from "./input";

export default class InputRadio extends Input {
	errors(errors = {}) {
		return super.errors(errors);
	}
 
	id() {
		const name = this.el.getAttribute('name') + '-' + this.val();
		return name.replace('[', '-').replace(']', '');
	}
}
