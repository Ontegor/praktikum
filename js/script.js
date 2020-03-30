import InitialCardsData from './data/InitialCardsData.js';
import CardsList from './classes/CardsList.js';
import InputField from './classes/InputField.js';
import Form from './classes/Form.js';
import Popup from './classes/Popup.js';

const initScripts = {
  cards: undefined,

  init: function () {
    this.cardsList();
    this.userForm();
    this.addUserCard();
  },

  cardsList: function () {
    const cardsWrapper = document.querySelector('.places-list');

    if (!cardsWrapper) {
      return;
    }

    this.cards = new CardsList(cardsWrapper, InitialCardsData);
  },

  userForm: function () {
    const buttonUserInfo = document.querySelector('.user-info__edit');

    buttonUserInfo.addEventListener('click', () => {
      const formFields = [
        new InputField({
          name: 'name',
          defaultValue: 'Имя',
          value: document.querySelector('.user-info__name').textContent,
          validate: true,
          validateParams: {
            minLength: 2,
            maxLength: 40,
          },
        }),
        new InputField({
          name: 'job',
          defaultValue: 'О себе',
          value: document.querySelector('.user-info__job').textContent,
          validate: true,
          validateParams: {
            minLength: 2,
            maxLength: 40,
          },
        }),
      ];

      const formEntity = new Form(formFields, {
        heading: 'Редактировать профиль',
        formClass: 'popup__form',
        buttonClass: 'button popup__button popup__button_text18 popup__button_enable',
        buttonText: 'Сохранить',
      });
      const formFragment = formEntity.render();
      const form = formFragment.querySelector('form');

      const popup = new Popup('form', formFragment);

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!formEntity.validate()) {
          return false;
        }

        const name = form.querySelector('[name="name"]').value;
        const job = form.querySelector('[name="job"]').value;

        document.querySelector('.user-info__name').textContent = name;
        document.querySelector('.user-info__job').textContent = job;

        popup.close();

        return false;
      });

      popup.open();
    });
  },

  addUserCard: function () {
    const buttonAddCard = document.querySelector('.user-info__button');

    buttonAddCard.addEventListener('click', () => {
      const formFields = [
        new InputField({
          name: 'name',
          defaultValue: 'Название',
          value: '',
          validate: true,
          validateParams: {
            minLength: 2,
            maxLength: 40,
          },
        }),
        new InputField({
          name: 'link',
          defaultValue: 'Ссылка на картинку',
          value: '',
          validate: true,
          validateParams: {
            url: true,
          },
        }),
      ];

      const formEntity = new Form(formFields, {
        heading: 'Новое место',
        formClass: 'popup__form',
        buttonClass: 'button popup__button popup__button_enable',
        buttonText: '+',
      });

      const formFragment = formEntity.render();
      const form = formFragment.querySelector('form');
      const popup = new Popup('form', formFragment);

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!formEntity.validate()) {
          return false;
        }

        const name = form.querySelector('[name="name"]').value;
        const link = form.querySelector('[name="link"]').value;

        console.log(Object.keys(this.cards.cards));

        const newCardKey = +Object.keys(this.cards.cards).pop() + 1;
        this.cards.addCard({ name, link }, newCardKey);
        popup.close();

        return false;
      });

      popup.open();
    });
  },
};

initScripts.init();
