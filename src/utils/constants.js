export const buttonPopupProfile = document.querySelector('.profile__name-button');
export const popupTypeCard = document.querySelector('.popup_type_card');
export const buttonPopupCard = document.querySelector('.profile__button');
export const popupName = document.querySelector('.popup__input_type_name');
export const popupProfession = document.querySelector('.popup__input_type_other');
export const cardName = popupTypeCard.querySelector('.popup__input_type_name');
export const cardLink = popupTypeCard.querySelector('.popup__input_type_other');
export const popupProfileValues = {
  nameValueSelector: '.profile__name-text',
  professionValueSelector: '.profile__profession'
};
export const formTypeProfile = document.querySelector('.popup__form_type_profile');
export const formTypeCard = document.querySelector('.popup__form_type_card');

export const initialCards = [
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

export const enableValidationObject = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error'
};
