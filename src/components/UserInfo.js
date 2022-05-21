// Класс отвечающий за управление отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameValueSelector, professionValueSelector}) {
    this._nameValue = document.querySelector(nameValueSelector);
    this._professionValue = document.querySelector(professionValueSelector);

    this._inputName = document.querySelector('.popup__input_type_name');
    this._inputProfession = document.querySelector('.popup__input_type_other');
  }

  getUserInfo() {
    const data = {};
    this._inputName.value = this._nameValue.textContent;
    this._inputProfession.value = this._professionValue.textContent;
    data.nameValueSelector = this._inputName.value;
    data.professionValueSelector = this._inputProfession.value;
    return data;
  }

  setUserInfo(data) {
    this._nameValue.textContent = data.name;
    this._professionValue.textContent = data.profession;
  }
}
