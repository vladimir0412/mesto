import Popup from './Popup.js';

// Класс открытия картинки Card
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupOpenedImage = this._popup.querySelector('.popup__image');
    this._popupImageTitle = this._popup.querySelector('.popup__image-title');
  }

  open(link, name) {
    this._popupOpenedImage.src = link;
    this._popupOpenedImage.alt = name;
    this._popupImageTitle.textContent = name;
    super.open();
  }
}
