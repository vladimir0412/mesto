// Класс отвечающий за отрисовку элементов на странице
export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
