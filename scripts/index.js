// Переменные PopupTypeProfile
const popupTypeProfile = document.querySelector('.popup_type_profile');
const buttonPopupProfile = document.querySelector('.profile__name-button');
const buttonClosePopupProfile = popupTypeProfile.querySelector('.popup__close-button');
const ESC_KEY = "Escape";

// Переменные PopupTypeCard
const popupTypeCard = document.querySelector('.popup_type_card');
const buttonPopupCard = document.querySelector('.profile__button');
const buttonClosePopupCard = popupTypeCard.querySelector('.popup__close-button');

// Переменные PopupTypeCard
const popupTypeImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = popupTypeImage.querySelector('.popup__close-button');
const popupOpenedImage = popupTypeImage.querySelector('.popup__image');
const popupImageTitle = popupTypeImage.querySelector('.popup__image-title');

// Переменные PopupProfile
const popupForm = document.querySelector('.popup__form');
const popupName = popupForm.querySelector('.popup__name');
const popupProfession = popupForm.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name-text');
const profileProfession = document.querySelector('.profile__profession');

// Переменные добавления Cards через форму
const addCardForm = document.querySelector('.popup_type_card');
const cardName = addCardForm.querySelector('.popup__name');
const cardLink = addCardForm.querySelector('.popup__profession');
const elements = document.querySelector('.elements');

// Переменная создания Cards из массива
const template = document.querySelector('#template');

// Открытие Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

// Закрытие Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляем собития, которые мы передавали в addEventListener (с обработчика событий)
  document.removeEventListener('keyup', onDocumentKeyUp);
}

// Функция закрытия Popup через Esc
function onDocumentKeyUp(event) {
  if (event.key === ESC_KEY) {
    closePopup(popupTypeProfile);
    closePopup(popupTypeCard);
    closePopup(popupTypeImage);
  }
}

// Редактирование Popup
// Функция редактирования PopupProfile
function editFormProfile (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(popupTypeProfile);
}

// Обработчик события редактирования PopupProfile
popupForm.addEventListener('submit', editFormProfile);

// Добавление и удаление Cards
// Стрелочная функция создания cards из массива
const createCard = (card) => {
  const elementsCard = template.content.querySelector('.card').cloneNode(true);
  const openedImage = elementsCard.querySelector('.card__image');
  openedImage.src = card.link;
  elementsCard.querySelector('.card__name').textContent = card.name;

  // Обработчик собития и стрелочная функция открытия PopupImage
  openedImage.addEventListener('click', () => {
    popupOpenedImage.src = card.link;
    popupOpenedImage.alt = card.name;
    popupImageTitle.textContent = card.name;
    openPopup(popupTypeImage);
    document.addEventListener('keyup', onDocumentKeyUp);
  });

  // Обработчик собития и стрелочная функция добавления like на cards
  elementsCard.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });

  // Обработчик собития и стрелочная функция удаления cards
  elementsCard.querySelector('.card__trash').addEventListener('click', () => {
    elementsCard.remove();
  });

  return elementsCard;
}

// Стрелочная функция рендера Cards
const renderCard = (card) => {
  elements.prepend(createCard(card));
}

// Стрелочная функция создания новых Cards
const addCard = (event) => {
  event.preventDefault();
  const card = {};
  card.name = cardName.value;
  card.link = cardLink.value;

  renderCard(card);
  cardName.value = '';
  cardLink.value = '';
  closePopup(popupTypeCard);
}

// функция добавления Like + обработчик и колбэк
function likeCard () {
  elementsCard.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });
}

const newElements = initialCards.map(function(card) {
  return createCard(card);
})

elements.append(...newElements);

addCardForm.addEventListener('submit', addCard);

// Обработчики событий открытия/закрытия popups
buttonPopupProfile.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  openPopup(popupTypeProfile);
});
buttonPopupCard.addEventListener('click', () => openPopup(popupTypeCard));
buttonClosePopupProfile.addEventListener('click', () => closePopup(popupTypeProfile));
buttonClosePopupCard.addEventListener('click', () => closePopup(popupTypeCard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupTypeImage));
