# Otomaties Form Validator

Vanilla javascript library for adding form validation. The error placement is specifically designed to work with Bootstrap 5's form structure.

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
import FormValidator from '@tombroucke/otomaties-form-validator';
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
			'Please select an option': 'Selecteer een optie',
		})
		new FormValidator(registrationForm, polyglot);
	}
});
```

## Custom Rules (addErrorFunction)

You can add a custom error function to inputs. The `addErrorFunction()` function will be called during validation. 2 arguments are passed, the first one is the errors object, second one is the input object. The error object may already contain some errors. 

```javascript
import FormValidator from '@tombroucke/otomaties-form-validator';

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

## Custom error messages

You can replace the default error messages with HTML data attributes:

```html
<input type="text" class="form-control" name="name" placeholder="Name" data-message-required="Please enter your name" required>
<input type="email" class="form-control" name="email" data-message-email-format="This format seems invalid" data-message-required="Please enter your email address" placeholder="E-mailadres" required>
<input class="form-check-input" type="checkbox" name="policy" id="policy-checkbox" data-message-required="Please accept our privacy policy" required>
```

## WordPress / HTML Forms / Sage 10

Add some custom code to support Ibericode's HTML Forms

```php
add_action('wp_enqueue_scripts', function () {
    bundle('app')->enqueueCss()->enqueueJs()->localize('sageVars', [
        'strings' => [
            'fieldRequired' => __('This field is required', 'sage'),
            'validEmail' => __('Please enter a valid e-mailaddress', 'sage'),
            'selectOption' => __('Please select an option', 'sage'),
        ]
    ]);
}, 100);
```

```javascript
/* global sageVars:true */

import FormValidator from '@tombroucke/otomaties-form-validator';
import Polyglot from 'node-polyglot';

const htmlForms = document.querySelectorAll('.hf-form');

var polyglot = new Polyglot();
polyglot.extend({
  'This field is required': sageVars.strings.fieldRequired,
  'Please enter a valid e-mailaddress': sageVars.strings.validEmail,
  'Please select an option': sageVars.strings.selectOption,
});

for (let index = 0; index < htmlForms.length; index++) {
  const element = htmlForms[index];
  const validator = new FormValidator(element, polyglot);
  element.addEventListener('submit', function (e) {
    if (validator.isInvalid()) { // Or !validator.isValid()
      e.stopPropagation();
    }
  });
}
```

## FAQ

### Uncaught TypeError: Cannot read properties of null (reading 'replace')
- One of the input elements probably doesn't have the "name" attribute
