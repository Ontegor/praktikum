import Card from './Card.js';
import Popup from './Popup.js';

class CardList {
  constructor(container, cardsData = {}) {
    this.container = container;
    this.cardsData = cardsData;
    this.cardTemplate = document.getElementById('card');
    this.cards = {};

    if (cardsData) {
      this.render();
      this.cardHandler();
    }
  }

  addCard(cardData = {}, id) {
    const card = new Card(cardData, this.cardTemplate, id);
    this.cards[id] = card;
    this.container.append(card.element);
  }

  render() {
    this.cardsData.forEach((cardData, index) => {
      this.addCard(cardData, index);
    });
  }

  cardHandler() {
    this.container.addEventListener('click', (e) => {
      const target = e.target;
      const card = e.target.closest('.place-card');

      if (!card) {
        return;
      }

      const id = card.dataset.id;

      if (target.classList.contains('place-card__like-icon')) {
        this.cards[id].like();
      } else if (target.classList.contains('place-card__delete-icon')) {
        this.cards[id].remove();
        delete this.cards[id];
      } else if (target.closest('.place-card__image')) {
        const imgSrc = target.style.backgroundImage.slice(4, -1).replace(/"/g, '');
        new Popup('image', imgSrc).open();
      }
    });
  }
}

export default CardList;
