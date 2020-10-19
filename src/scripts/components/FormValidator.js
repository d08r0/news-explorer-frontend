export default class FormValidator {
    constructor(form) {
        this.form = form;
    }

    setEventListeners() {
        this
            .form
            .addEventListener('input', this.setSubmitButtonState);
        this
            .form
            .addEventListener('input', this.checkInputValidity);
    }

    checkInputValidity(event) {
      const errorMessages = {
        empty: 'Это обязательное поле',
        wrongLength: 'Должно быть от 2 до 30 символов',
        wrongEmail: 'Здесь должна быть email',
      }

        const input = event.target
        const errorElem = input.nextElementSibling;
        input.setCustomValidity("");
        errorElem.textContent = "";

        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessages.empty);
            errorElem.textContent = input.validationMessage;
        } else if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessages.wrongLength);
            errorElem.textContent = input.validationMessage;
        } else if (input.validity.typeMismatch && input.type === 'email') {
            input.setCustomValidity(errorMessages.wrongEmail);
            errorElem.textContent = input.validationMessage;
        }
    }

    setSubmitButtonState(event) {
        const submit = event.currentTarget.querySelector('.button');
        const popupForm = event.target.closest("form");

        if (popupForm.checkValidity()) {
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', "");
        }
    }

    resetError() {
        this.form.querySelectorAll(".error").forEach(function (elem) {
            elem.textContent = "";
        });
    }
}
