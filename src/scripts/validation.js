export function validation(obj, input) {
    const errMsg = input.nextElementSibling
    const form = input.closest(obj.formSelector)
    if (input.validity.patternMismatch) {
        const message = input.getAttribute('data-error-pattern')
        input.classList.add(obj.inputErrorClass)
        errMsg.textContent = message
    } else if (input.validity.valueMissing) {
        const message = input.getAttribute('data-error-required')
        input.classList.add(obj.inputErrorClass)
        errMsg.textContent = message
    } else if (input.validity.tooShort || input.validity.tooLong) {
        const message = input.getAttribute('data-error-length')
        input.classList.add(obj.inputErrorClass)
        errMsg.textContent = message
    }
    else {
        input.classList.remove(obj.inputErrorClass)
        errMsg.textContent = ''
    }
    const submit = form.querySelector(obj.submitButtonSelector)
    submit.disabled = !formChecked(obj, form)
}

export function formChecked(obj, form) {
    const elements = form.querySelectorAll(obj.inputSelector)
    console.log(obj.inputSelector);
    return Array.from(elements).every(input => input.validity.valid)
}

export function clearValidation(form, obj) {
    console.log(obj);
    const inputs = document.querySelectorAll(obj.inputSelector)
    inputs.forEach(input => {
        input.classList.remove(obj.inputErrorClass)
        const errMsg = input.nextElementSibling
        errMsg.textContent = ''
    })
    form.reset()
    const submit = document.querySelector(obj.submitButtonSelector)
    submit.disabled = !formChecked(obj, form)
}

export function enableValidation(obj) {
    document.querySelectorAll(obj.inputSelector).forEach((input) => {
        input.addEventListener('input', () => validation(obj, input))
    })
}