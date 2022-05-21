// Класс отвечающий за открытие и закрытие попапа
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    }
  }

  setEventListeners () {
    const closePopup = this._popup.querySelector('.popup__close-button')
    closePopup.addEventListener('click', () => {
        this.close();
    });
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close(evt.target);
        }
    });
  }
}
