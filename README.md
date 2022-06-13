# Otomaties Form Validator

Vanilla javascript library for adding form validation.

## WARNING
This package is incomplete. Some validation is missing:
- Required checkboxes

## Installation
`npm i @tombroucke/otomaties-form-validator`

## Usage

```javascript
window.addEventListener('DOMContentLoaded', (event) => {
	const registrationForm = document.querySelector('.js-form-event-registration');
	if (registrationForm) {
		new FormValidator(registrationForm);
	}
});
```

## i18n

This library implements [polyglot](https://github.com/airbnb/polyglot.js). 

```javascript
import Polyglot from 'node-polyglot';

window.addEventListener('DOMContentLoaded', (event) => {
	const registrationForm = document.querySelector('.js-form-event-registration');
	if (registrationForm) {
		var polyglot = new Polyglot();
		polyglot.extend({
			'This field is required': 'Dit veld is verplicht',
			'Enter a value less than or equal to {0}': 'Geef een waarde lager dan of gelijk aan {0} in',
			'Please enter a valid e-mailaddress': 'Geef een geldig e-mailadres in',
			'Enter a value greater than or equal to {0}': 'Geef een waarde hoger dan of gelijk aan {0} in',
		})
		new FormValidator(registrationForm, polyglot);
	}
});
```

## Custom Rules (addErrorFunction)

You can add a custom error function to inputs. The `addErrorFunction()` function will be called during validation. 2 arguments are passed, the first one is the errors object, second one is the input object. The error object may already contain some errors. 

```javascript
const validator = new FormValidator(this.el);
const pickupDateElements = this.el.querySelectorAll('[name*="pickupdates"]');
pickupDateElements.forEach(element => {
	validator.addErrorFunction(element, function(errors, input){
		const categoryProducts = orderForm.el.querySelectorAll('[name*="products"][data-category-id="' + input.el.getAttribute('data-category-id') + '"]');
		categoryProducts.forEach(categoryProduct => {
			if (categoryProduct.value > 0 && element.value.length == 0) {
				errors.required = input.polyglot.t('Please select a pickup date');
			}
		});
		return errors;
	});
});
```
