import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ data, callbackSubmitForm }, popupSelector) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._data = data;

    this._formElement = this._popup.querySelector('.popup__form');
  }

  open(cardElement, id) {
    this._element = cardElement;
    this._id = id;
    super.open();
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._data, this._element, this._id);
    });
    super.setEventListeners();
  }
}
