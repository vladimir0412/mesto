import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Объект с ссылками на изображения
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

// Переменные PopupTypeProfile
const popupTypeProfile = document.querySelector('.popup_type_profile');
const buttonPopupProfile = document.querySelector('.profile__name-button');
let ESC_KEY = "Escape";

// // Переменные PopupTypeCard
const popupTypeCard = document.querySelector('.popup_type_card');
const buttonPopupCard = document.querySelector('.profile__button');

// Переменные PopupProfile
const popupProfileForm = document.querySelector('.popup__form');
const popupName = popupProfileForm.querySelector('.popup__input_type_name');
const popupProfession = popupProfileForm.querySelector('.popup__input_type_other');
const profileName = document.querySelector('.profile__name-text');
const profileProfession = document.querySelector('.profile__profession');

// Переменные добавления Cards через форму
const popupCardForm = popupTypeCard.querySelector('.popup__form');
const cardName = popupTypeCard.querySelector('.popup__input_type_name');
const cardLink = popupTypeCard.querySelector('.popup__input_type_other');
const elements = document.querySelector('.elements');

// Переменная для закрытия Popup через Overlay
const popupWindow = document.querySelectorAll('.popup');

// Открытие Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscapeKey);
}

// Закрытие Popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляем собития, которые мы передавали в addEventListener (с обработчика событий)
  document.removeEventListener('keyup', handleEscapeKey);
}

// Функция закрытия Popup через Esc
function handleEscapeKey(event) {
  if (event.key === ESC_KEY) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

// Функция закрытия Popup через Overlay
popupWindow.forEach((popup) => {
  popup.addEventListener('mousedown', function(evt) {
    if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
})

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

// Функция создания разметки карточки
const createNewCard = (data) => {
  const card = new Card(data.link, data.name, '#template');
  const elementsCard = card.generateCard();
  return elementsCard;
}

// Функция добавления карточек из объекта initialCards
initialCards.forEach((card) => {
  const cardFromObject = createNewCard(card);
  elements.append(cardFromObject);
});

// Функция добавления карточки из формы .popup_type_card
const renderCard = (card) => {
  const cardFromPopup = createNewCard(card);
  elements.prepend(cardFromPopup);
};

// Стрелочная функция создания новых Cards
const addCard = (event) => {
  event.preventDefault();
  const card = {};
  card.name = cardName.value;
  card.link = cardLink.value;

  renderCard(card);
  closePopup(popupTypeCard);
}

popupTypeCard.addEventListener('submit', addCard);

// Обработчики событий открытия/закрытия popups
// Для popupProfile
buttonPopupProfile.addEventListener('click', () => {
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  validationPopupProfileForm.toggleButtonState();
  openPopup(popupTypeProfile);
});

// Для popupCard
buttonPopupCard.addEventListener('click', () => {
  popupCardForm.reset();
  validationPopupCardForm.toggleButtonState();
  openPopup(popupTypeCard);
});

const enableValidationObject = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};

const formTypeProfile = document.querySelector('.popup__form_type_profile');
const formTypeCard = document.querySelector('.popup__form_type_card');

const validationPopupProfileForm = new FormValidator(enableValidationObject, formTypeProfile);
validationPopupProfileForm.enableValidation();

const validationPopupCardForm = new FormValidator(enableValidationObject, formTypeCard);
validationPopupCardForm.enableValidation();

export { openPopup };
