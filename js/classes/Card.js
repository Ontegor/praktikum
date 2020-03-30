class Card {
  constructor({ name, link }, template, id) {
    this.name = name;
    this.link = link;
    this.template = template;
    this.id = id;
    this.card = null;
  }

  like() {
    this.card
      .querySelector('.place-card__like-icon')
      .classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.card.remove();
    this.card = null;
  }

  create() {
    this.card = this.template.cloneNode(true).firstElementChild;
    this.card.dataset.id = this.id;
    const imageElement = this.card.querySelector('.place-card__image');
    const nameElement = this.card.querySelector('.place-card__name');

    imageElement.style.backgroundImage = `url(${this.link})`;
    nameElement.textContent = this.name;

    return this.card;
  }

  get element() {
    return this.create();
  }
}

export default Card;
