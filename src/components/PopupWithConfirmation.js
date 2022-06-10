import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ data, callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._data = data;

    this._formElement = this._popup.querySelector('.popup__form');
    this._buttonSubmitTextForm = this._popup.querySelector('.popup__button');
    this._defaultButtonSubmitTextForm = this._buttonSubmitTextForm.textContent;
  }

  open(cardElement, id) {
    this._element = cardElement;
    this._id = id;
    super.open();
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
      this._callbackSubmitForm(this._data, this._element, this._id);
    });
    super.setEventListeners();
  }
}
