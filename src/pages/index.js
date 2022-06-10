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
      imageFromCard.open(link, name);
    },
    deleteCardClick: (cardElement, id) => {
      popupWithConfirmation.open(cardElement, id);
    },
    likeCardClick: (cardElement, id) => {
      api.addLike(cardElement, id)
        .then((data) => {
          card.addCardLike(data);
        })
        .catch((error) => {
          console.log(error);
        })
      },
    removeLikeCardClick: (cardElement, id) => {
      api.removeLike(cardElement, id)
        .then((data) => {
          card.removeCardLike(data);
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
const cardSection = new Section({ renderer: (item) => {
  const cardFromServer = createNewCard(item);
  cardSection.addItem(cardFromServer);
}
}, '.elements');

// Переменная открытия картинки Card
const imageFromCard = new PopupWithImage('.popup_type_image');
imageFromCard.setEventListeners();

// Переменная открытия PopupConfirm
const popupWithConfirmation = new PopupWithConfirmation({
  callbackSubmitForm: (data, element, id) => {
  popupWithConfirmation.playLoading(true, 'Удаление...');
  api.deleteCard(data, id)
  .then((data) => {
    element.remove();
    popupWithConfirmation.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupWithConfirmation.playLoading(false, '');
  })
}
}, '.popup_type_confirm');
popupWithConfirmation.setEventListeners();

// Функция редактирования PopupProfile
function editFormProfile() {
  const profileValues = createProfileValues.getUserInfo();
  popupName.value = profileValues.nameValueSelector;
  popupProfession.value = profileValues.professionValueSelector;
  validationPopupProfileForm.resetValidation();
  editProfileFromForm.open();
}

// Экземпляр класса добавления карточки из формы
const cardCreateFromForm = new PopupWithForm ({ callbackSubmitForm: (data) => {
  cardCreateFromForm.playLoading(true, 'Cоздание...');
  api.createCard(data)
  .then((data) => {
    const cardFromPopup = createNewCard(data);
    cardSection.addItem(cardFromPopup);
    cardCreateFromForm.close();
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    cardCreateFromForm.playLoading(false, '');
  })
}
}, '.popup_type_card');
cardCreateFromForm.setEventListeners();

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
  .finally(() => {
    editProfileFromForm.playLoading(false, '');
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
  .finally(() => {
    editProfileAvatar.playLoading(false, '');
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
  validationPopupCardForm.resetValidation();
  cardCreateFromForm.open();
});

// Для popupAvatar
buttonPopupAvatar.addEventListener('click', () => {
  validationPopupAvatarForm.resetValidation();
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

Promise.all([ api.getProfile(), api.getCards() ])
  .then(([info, data])=>{
    userId = info._id;
    cardSection.renderItems(data);
    createProfileValues.setUserInfo(info);
  })
  .catch((error)=>{
    console.log(error);
  })
