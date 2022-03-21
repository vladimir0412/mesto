// Открытие и закрытие Popup

const popupElement = document.querySelector('.popup');
const navButton = document.querySelector('.profile__name-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const ESC_KEY = "Escape";

function openPopup() {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', onDocumentKeyUp);
  popupName.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
  // Удаляем собития, которые мы передавали в addEventListener (с обработчика событий)
  document.removeEventListener('keyup', onDocumentKeyUp);
}

function onDocumentKeyUp(event) {
  if (event.key === ESC_KEY) {
    closePopup();
  }
}

navButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

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

  closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
