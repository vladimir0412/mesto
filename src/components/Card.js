// Класс добавления карточек
export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const elementsCard  = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return elementsCard ;
  }

  generateCard() {
    this._element = this._getTemplate();

    // Переменная изображения Card
    this._imageCard = this._element.querySelector('.card__image');

    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;

    // Переменная кнопки Like
    this._cardLikeButton = this._element.querySelector('.card__like');

    // Переменная кнопки удаления Card
    this._cardRemoveButton = this._element.querySelector('.card__trash');

    // Переменные открытия изображения Card
    this._popupTypeImage = document.querySelector('.popup_type_image');
    this._popupOpenedImage = document.querySelector('.popup__image');
    this._popupImageTitle = document.querySelector('.popup__image-title');

    this._setEventListeners();
    return this._element;
  }

  // Метод открытия изображения Card
  _openImage() {
    this._popupOpenedImage.src = this._link;
    this._popupOpenedImage.alt = this._name;
    this._popupImageTitle.textContent = this._name;
    openPopup(this._popupTypeImage);
  }

  // Метод добавления Like
  _toggleLike() {
    this._cardLikeButton.classList.toggle('card__like_active');
  }

  // Метод удаления Card
  _removeCard() {
    this._element.remove();
    this._element = null
  }

  _setEventListeners() {
    // Обработчик собития и стрелочная функция добавления Like
    this._cardLikeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    // Обработчик собития удаления Card
    this._cardRemoveButton.addEventListener('click', () => {
      this._removeCard();
    });

    // Обработчик собития и стрелочная функция открытия изображения Card
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

