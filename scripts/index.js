// Переменные FirstPopup

const popupProfile = document.querySelector('.popup_profile');
const navPopupProfile = document.querySelector('.profile__name-button').addEventListener('click', openPopupProfile);
const closePopupProfile = popupProfile.querySelector('.popup__close-button').addEventListener('click', closePopups);
const ESC_KEY = "Escape";

// Переменные SecondPopup

const popupCard = document.querySelector('.popup_card');
const navPopupCard = document.querySelector('.profile__button').addEventListener('click', openPopupCard);
const closePopupCard = popupCard.querySelector('.popup__close-button').addEventListener('click', closePopups);

// Переменные ThirdPopup

const popupImage = document.querySelector('.popup_image');
const closePopupImage = popupImage.querySelector('.popup__close-button').addEventListener('click', closePopups);
const openedImageLink = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__title-third');

// Открытие Popups

function openPopupProfile() {
  popupProfile.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

function openPopupCard() {
  popupCard.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
}

// Закрытие Popups

function closePopups() {
  popupProfile.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
  // Удаляем собития, которые мы передавали в addEventListener (с обработчика событий)
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === ESC_KEY) {
    closePopups();
  }
}

// Редактирование Popup

let popupForm = document.querySelector('.popup__form');
let popupName = popupForm.querySelector('.popup__name');
let popupProfession = popupForm.querySelector('.popup__profession');

let profileName = document.querySelector('.profile__name-text');
let profileProfession = document.querySelector('.profile__profession');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;

  closePopups();
}

popupForm.addEventListener('submit', formSubmitHandler);

// Добавление и удаление Cards

const initialCards = [
  {
    name: 'Берлин',
    link: 'https://unsplash.com/photos/rCOpnW9mxvc/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mjd8fGJlcmxpbnxlbnwwfHx8fDE2NDg1NTQ4OTI&force=true&w=640'
  },
  {
    name: 'Хельсинки',
    link: 'https://unsplash.com/photos/NIjvMFfWE1A/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTV8fGhlbHNpbmtpfGVufDB8fHx8MTY0ODU2MTE5NQ&force=true&w=640'
  },
  {
    name: 'Москва',
    link: 'https://unsplash.com/photos/qltdT9VN3AU/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mzd8fG1vc2Nvd3xlbnwwfHx8fDE2NDg1NjM1NTA&force=true&w=640'
  },
  {
    name: 'Париж',
    link: 'https://unsplash.com/photos/UO02gAW3c0c/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTV8fHBhcmlzfGVufDB8fHx8MTY0ODU2MDYwNQ&force=true&w=640'
  },
  {
    name: 'Прага',
    link: 'https://unsplash.com/photos/S7PKp7eAEdE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTZ8fHByYWd1ZXxlbnwwfHx8fDE2NDg1NjEzMjY&force=true&w=640'
  },
  {
    name: 'Стокгольм',
    link: 'https://unsplash.com/photos/inbePXjTh-A/download?force=true&w=640'
  }
];

const elements = document.querySelector('.elements');

// переменные добавления cards через форму
const addCardForm = document.querySelector('.popup_card');
const cardName = addCardForm.querySelector('.popup__name');
const cardLink = addCardForm.querySelector('.popup__profession');

// создание cards из массива
const createCard = (card) => {
  const template = document.querySelector('#elements');
  const elementsCard = template.content.querySelector('.elements__card').cloneNode(true);
  const openedImage = elementsCard.querySelector('.elements__image');

  elementsCard.querySelector('.elements__image').src = card.link;
  elementsCard.querySelector('.elements__name').textContent = card.name;

  openedImage.addEventListener('click', () => {
    openedImageLink.src = card.link;
    openedImageLink.alt = card.name;
    popupImageTitle.textContent = card.name;
    popupImage.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
  });

  elementsCard.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  });

  elementsCard.querySelector('.elements__trash').addEventListener('click', () => {
    elementsCard.remove();
  });

  return elementsCard;
}

const renderCard = (card) => {
  elements.prepend(createCard(card));
}

// создание новых cards
const addCard = (event) => {
  event.preventDefault();
  const card = {};
  card.name = cardName.value;
  card.link = cardLink.value;

  renderCard(card);
  cardName.value = '';
  cardLink.value = '';
  closePopups();

  likeCard();
}

// функция добавления Like + обработчик и колбэк
function likeCard () {
  elementsCard.querySelector('.elements__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__like_active');
  });
}

const newElements = initialCards.map(function(card) {
  return createCard(card);
})

elements.append(...newElements);

addCardForm.addEventListener('submit', addCard);
