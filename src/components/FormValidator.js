// Класс валидации форм
export default class FormValidator {
  constructor(obj, formElement) {
    this._formElement = formElement;
    this._inputElement = obj.inputElement;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;

    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputElement));
  };

  // Метод добавления класса с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Метод удаления класса с ошибкой
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Метод проверки валидности поля
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Метод добавления неактивной кнопки Popup
  setDisabledButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // Метод добавления активной кнопки Popup
  _setEnabledButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Метод принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.setDisabledButton(this._buttonElement);
    } else {
      this._setEnabledButton(this._buttonElement);
    }
  };

  // Метод принимает массив полей
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // Метод добавления обработчиков всем полям формы
  _setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this.toggleButtonState(this._inputList);
      });
    });
  };

  // Метод добавления обработчиков всем формам
  enableValidation = () => {
    this._setEventListeners();
  };
}
