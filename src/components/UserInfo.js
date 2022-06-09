// Класс отвечающий за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameValueSelector, professionValueSelector, avatarValueSelector}) {
    this._nameValue = document.querySelector(nameValueSelector);
    this._professionValue = document.querySelector(professionValueSelector);
    this._avatarValue = document.querySelector(avatarValueSelector);

    this._inputName = document.querySelector('.popup__input_type_name');
    this._inputProfession = document.querySelector('.popup__input_type_other');
  }

  getUserInfo() {
    return {
      nameValueSelector: this._nameValue.textContent,
      professionValueSelector: this._professionValue.textContent
    }
  }

  setUserInfo(data) {
    this._nameValue.textContent = data.name;
    this._professionValue.textContent = data.about;
    this._avatarValue.src= data.avatar;
  }
}
