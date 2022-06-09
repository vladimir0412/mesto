import Popup from './Popup.js';

// Класс подтверждения данных из форм
export default class PopupWithForm extends Popup {
  constructor({ callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;

    this._formElement = this._popup.querySelector('.popup__form');
    this._inputElement = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmitTextForm = this._popup.querySelector('.popup__button');
    this._defaultButtonSubmitTextForm = this._buttonSubmitTextForm.textContent;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputElement.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  playLoading(isLoading, textButton) {
    if (isLoading) {
      this._buttonSubmitTextForm.textContent = textButton;
    } else {
      this._buttonSubmitTextForm.textContent = this._defaultButtonSubmitTextForm;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
