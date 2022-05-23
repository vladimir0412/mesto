import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { popupName, popupProfession, popupProfileValues, initialCards,
  formTypeProfile, formTypeCard, buttonPopupProfile, buttonPopupCard,
  enableValidationObject } from '../utils/constants.js'

// Функция создания разметки карточки
const createNewCard = (data) => {
  const card = new Card({data, handleCardClick: (name, link) => {
    openImageFromCard.open(link, name);
  }
  }, '#template');
  return card.generateCard();
}

// Функция добавления карточек из объекта initialCards
const createCard = new Section({ data: initialCards, renderer: (item) => {
  const cardFromObject = createNewCard(item);
  createCard.addItem(cardFromObject);
}
}, '.elements');
createCard.renderItems();

// Переменная открытия картинки Card
const openImageFromCard = new PopupWithImage('.popup_type_image');
openImageFromCard.setEventListeners();

// Функция редактирования PopupProfile
function editFormProfile() {
  const profileValues = createProfileValues.getUserInfo();
  popupName.value = profileValues.nameValueSelector;
  popupProfession.value = profileValues.professionValueSelector;
  validationPopupProfileForm.resetValidation();
  editProfileFromForm.open();
}

// Экземпляр класса добавления карточки из формы
const addCardFromForm = new PopupWithForm ({ callbackSubmitForm: (data) => {
  const cardFromPopup = createNewCard(data);
  createCard.addItem(cardFromPopup);
  addCardFromForm.close();
}
}, '.popup_type_card');
addCardFromForm.setEventListeners();

// Переменная добавления данных пользователя
const createProfileValues = new UserInfo(popupProfileValues);

// Экземпляр класса редактирования информации профиля
const editProfileFromForm = new PopupWithForm({ callbackSubmitForm: (data) => {
  createProfileValues.setUserInfo(data);
  editProfileFromForm.close();
}
}, '.popup_type_profile');
editProfileFromForm.setEventListeners();

// Обработчики событий открытия/закрытия popups
// Для popupProfile
buttonPopupProfile.addEventListener('click', () => {
  editFormProfile();
});

// Для popupCard
buttonPopupCard.addEventListener('click', () => {
  //popupCardForm.reset();
  validationPopupCardForm.resetValidation();
  addCardFromForm.open();
});

const validationPopupProfileForm = new FormValidator(enableValidationObject, formTypeProfile);
validationPopupProfileForm.enableValidation();

const validationPopupCardForm = new FormValidator(enableValidationObject, formTypeCard);
validationPopupCardForm.enableValidation();
