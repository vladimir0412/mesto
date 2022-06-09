export default class Card {
  constructor({ data, handleCardClick, deleteCardClick,
     likeCardClick, removeLikeCardClick }, userId, cardSelector) {
    this._cardSelector = cardSelector;
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._owner = data.owner;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._likeCardClick = likeCardClick;
    this._removeLikeCardClick = removeLikeCardClick;
    this._userId = userId;
  }

  _getTemplate() {
    const elementsCard  = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return elementsCard ;
  }

  _getMyLike() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        return true;
      }
    }
  }

  generateCard() {
    this._element = this._getTemplate();

    // Переменная изображения Card
    this._imageCard = this._element.querySelector('.card__image');

    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._element.querySelector('.card__name').textContent = this._name;

    // Переменные кнопки Like
    this._cardLikeButton = this._element.querySelector('.card__like');
    this._likeNumber = this._element.querySelector('.card__like-number');
    this._likeNumber.textContent = this._likes.length;

    if (this._getMyLike()) {
      this._cardLikeButton.classList.add('card__like_active');
    }

    //Переменная кнопки удаления Card
    this._cardRemoveButton = this._element.querySelector('.card__trash');

    if (this._userId === this._owner._id) {
      this._cardRemoveButton.classList.add('card__trash_active');
    } else {
      this._cardRemoveButton.classList.remove('card__trash_active');
    };

    this._setEventListeners();
    return this._element;
  }

  // Метод удаления Card
  _removeCard() {
    this._element.remove();
    this._element = null
  }

  _setEventListeners() {
    // Обработчик собития и стрелочная функция добавления Like
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton =! this._cardLikeButton;
      if (!this._cardLikeButton) {
        this._likeCardClick(this._element, this._id, this._likeNumber);
      } else {
        this._removeLikeCardClick(this._element, this._id, this._likeNumber);
      }
    });

    // Обработчик собития удаления Card
    this._cardRemoveButton.addEventListener('click', () => {
      this._deleteCardClick(this._element, this._id);
    });

    // Обработчик собития и стрелочная функция открытия изображения Card
    this._imageCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

