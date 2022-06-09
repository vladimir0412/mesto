import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { popupName, popupProfession, popupProfileValues, buttonPopupAvatar,
  formTypeProfile, formTypeCard, buttonPopupProfile, buttonPopupCard, formTypeAvatar,
  enableValidationObject } from '../utils/constants.js';
import Api from '../components/Api.js';

// Функция создания разметки карточки
const createNewCard = (data) => {
  const card = new Card({data,
    handleCardClick: (name, link) => {
      openImageFromCard.open(link, name);
    },
    deleteCardClick: (cardElement, id) => {
      openPopupWithConfirmation.open(cardElement, id);
    },
    likeCardClick: (cardElement, id) => {
      api.addLike(cardElement, id)
        .then((data) => {
          cardElement.querySelector('.card__like').classList.add('card__like_active');
          cardElement.querySelector('.card__like-number').textContent = data.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
      },
    removeLikeCardClick: (cardElement, id) => {
      api.removeLike(cardElement, id)
        .then((data) => {
          cardElement.querySelector('.card__like').classList.remove('card__like_active');
          cardElement.querySelector('.card__like-number').textContent = data.likes.length;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, userId, '#template');

  const cardElement = card.generateCard();
  return card.generateCard();
}

let userId;

// Функция добавления карточек от Сервера
const createCard = new Section({ renderer: (item) => {
  const cardFromServer = createNewCard(item);
  createCard.addItem(cardFromServer);
}
}, '.elements');

// Переменная открытия картинки Card
const openImageFromCard = new PopupWithImage('.popup_type_image');
openImageFromCard.setEventListeners();

// Переменная открытия PopupConfirm
const openPopupWithConfirmation = new PopupWithConfirmation({
  callbackSubmitForm: (data, element, id) => {
  openPopupWithConfirmation.close();
  api.deleteCard(data, id)
  .then((data) => {
    element.remove();
    openPopupWithConfirmation.close();
  })
  .catch((error) => {
    console.log(error);
  })
}
}, '.popup_type_confirm');
openPopupWithConfirmation.setEventListeners();

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
  addCardFromForm.close();
  api.createCard(data)
  .then((data) => {
    const cardFromPopup = createNewCard(data);
    createCard.addItem(cardFromPopup);
    addCardFromForm.close();
  })
  .catch((error) => {
    console.log(error);
  })
}
}, '.popup_type_card');
addCardFromForm.setEventListeners();

// Переменная добавления данных пользователя
const createProfileValues = new UserInfo(popupProfileValues);

// Экземпляр класса редактирования информации профиля
const editProfileFromForm = new PopupWithForm({ callbackSubmitForm: (data) => {
  editProfileFromForm.playLoading(true, 'Cохранение...');
  api.editProfile(data)
  .then((data) => {
    createProfileValues.setUserInfo(data);
    editProfileFromForm.close();
  })
  .catch((error) => {
    console.log(error);
  })
}
}, '.popup_type_profile');
editProfileFromForm.setEventListeners();

// Экземпляр класса изменения аватара
const editProfileAvatar = new PopupWithForm({ callbackSubmitForm: (data) => {
  editProfileAvatar.playLoading(true, 'Cохранение...');
  api.editAvatar(data)
  .then((data) => {
    document.querySelector(popupProfileValues.avatarValueSelector).src = data.avatar;
    editProfileAvatar.close();
  })
  .catch((error) => {
    console.log(error);
  })
}
}, '.popup_type_avatar');
editProfileAvatar.setEventListeners();

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

// Для popupAvatar
buttonPopupAvatar.addEventListener('click', () => {
  editProfileAvatar.open();
});

const validationPopupProfileForm = new FormValidator(enableValidationObject, formTypeProfile);
validationPopupProfileForm.enableValidation();

const validationPopupCardForm = new FormValidator(enableValidationObject, formTypeCard);
validationPopupCardForm.enableValidation();

const validationPopupAvatarForm = new FormValidator(enableValidationObject, formTypeAvatar);
validationPopupAvatarForm.enableValidation();

// Экземпляр класса для работы с Api
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'a300aec3-6e18-4e7b-8fa3-4618f0df7f74',
    'Content-Type': 'application/json'
  }
});

api.getCards()
  .then((data) => {
    createCard.renderItems(data);
  })
  .catch((error) => {
    console.log(error);
  })

api.getProfile()
  .then((info) => {
    userId = info._id;
    createProfileValues.setUserInfo(info);
  })
  .catch((error) => {
    console.log(error);
  })
