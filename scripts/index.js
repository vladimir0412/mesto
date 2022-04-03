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
const popupProfileForm = document.querySelector('.popup__form');
const popupName = popupProfileForm.querySelector('.popup__name');
const popupProfession = popupProfileForm.querySelector('.popup__profession');
const profileName = document.querySelector('.profile__name-text');
const profileProfession = document.querySelector('.profile__profession');

// Переменные добавления Cards через форму
const popupCardForm = popupTypeCard.querySelector('.popup__form');
const cardName = popupTypeCard.querySelector('.popup__name');
const cardLink = popupTypeCard.querySelector('.popup__profession');
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
    closePopup(document.querySelector('.popup_opened'));
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
popupProfileForm.addEventListener('submit', editFormProfile);

// Добавление и удаление Cards
// Стрелочная функция создания cards из массива
const createCard = (card) => {
  const elementsCard = template.content.querySelector('.card').cloneNode(true);
  const imageCard = elementsCard.querySelector('.card__image');
  imageCard.src = card.link;
  imageCard.alt = card.name;
  elementsCard.querySelector('.card__name').textContent = card.name;

  // Обработчик собития и стрелочная функция открытия PopupImage
  imageCard.addEventListener('click', () => {
    popupOpenedImage.src = card.link;
    popupOpenedImage.alt = card.name;
    popupImageTitle.textContent = card.name;
    openPopup(popupTypeImage);
  });

  // Функция добавления like на Card + обработчик события и колбэк (к сожалению, не смог реализовать как нужно)
  function pushLikeButtonCard () {
    elementsCard.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    });
  }

  pushLikeButtonCard();

  // Обработчик собития и стрелочная функция удаления cards (к сожалению, не смог реализовать как нужно)
  function pushRemoveButtonCard() {
    elementsCard.querySelector('.card__trash').addEventListener('click', () => {
      elementsCard.remove();
    });
  }

  pushRemoveButtonCard();

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
  popupCardForm.reset();
  closePopup(popupTypeCard);
}

const newElements = initialCards.map(function(card) {
  return createCard(card);
})

elements.append(...newElements);

popupTypeCard.addEventListener('submit', addCard);

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
