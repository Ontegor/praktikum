class Popup {
  constructor(type, content = null) {
    this.type = type;
    this.content = content;
    this.popup = document.getElementById('popup');
  }

  open() {
    const popupContentWrapper = this.popup.querySelector('.popup__content_js');
    const popupContent = popupContentWrapper.querySelector('.popup__content-html');
    popupContent.textContent = '';

    if (this.type === 'image') {
      popupContentWrapper.classList.add('popup__content-image');
      popupContentWrapper.classList.remove('popup__content');

      const image = new Image();
      image.className = 'popup__image';
      image.src = this.content;

      popupContent.append(image);
    } else {
      popupContentWrapper.classList.remove('popup__content-image');
      popupContentWrapper.classList.add('popup__content');

      popupContent.append(this.content);
    }

    if (!this.closeIcon) {
      this.closeIcon = this.popup.querySelector('.popup__close');
      this.closeIcon.addEventListener('click', () => this.close());
    }

    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    this.content = null;
  }
}

export default Popup;
