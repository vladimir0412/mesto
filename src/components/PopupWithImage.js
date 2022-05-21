import Popup from './Popup.js';

// Класс открытия картинки Card
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupOpenedImage = document.querySelector('.popup__image');
    this._popupImageTitle = document.querySelector('.popup__image-title');
  }

  open(link, name) {
    this._popupOpenedImage.src = link;
    this._popupOpenedImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
