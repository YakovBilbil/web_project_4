/////////////////////////////////
//////// Validation////////////
////////////////////////////////


function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}


function hideError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
}


function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideError(formElement, inputElement, inputErrorClass, errorClass);
    }
}


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}


function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}


function setEventListeners(formElement, settingsObject) {
    const inputList = Array.from(formElement.querySelectorAll(settingsObject.inputSelector));
    const buttonElement = formElement.querySelector(settingsObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settingsObject.inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {
            checkInputValidity(formElement, inputElement, settingsObject.inputErrorClass, settingsObject.errorClass);
            toggleButtonState(inputList, buttonElement, settingsObject.inactiveButtonClass);
        });
    });
}


function enableValidation(settingsObject) {
    const formList = Array.from(document.querySelectorAll(settingsObject.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, settingsObject);
    });
}


enableValidation({
    formSelector: ".popup__form-submit",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-save-button",
    inactiveButtonClass: "popup__form-save-button_inactive",
    inputErrorClass: "popup__form-input_type_error",
    errorClass: "popup__form-input-error_active"
});
