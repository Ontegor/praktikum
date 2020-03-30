class InputField {
  constructor(options) {
    this.options = options;
    this.input = null;
    this.errorWrapper = null;
  }

  setErrors() {
    this.errorWrapper.textContent = this.validateField();
    return this.validateField();
  }

  validateField() {
    const { validateParams } = this.options;
    const { minLength, maxLength, url } = validateParams;

    const inputValue = this.input.value;
    const inputValueLength = inputValue.length;

    if (minLength && inputValueLength === 0) {
      return 'Значение не может быть пустым';
    }

    if (minLength && inputValueLength < minLength) {
      return `Количество символов не может быть меньше ${minLength}`;
    }

    if (maxLength && inputValueLength > maxLength) {
      return `Количество символов не может быть больше ${maxLength}`;
    }

    if (url && !this.validateURL(inputValue)) {
      return 'Значение не является url';
    }

    return '';
  }

  validateURL(str) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    );

    return !!pattern.test(str);
  }

  fieldCreator() {
    const { name, defaultValue, value, className, validate } = this.options;
    const elementClass = ['popup__input', className];

    this.input = document.createElement('input');
    this.input.name = name;
    this.input.placeholder = defaultValue;
    this.input.value = value;
    this.input.className = elementClass.join(' ');

    if (validate) {
      this.input.oninput = () => this.setErrors();
    }
  }

  validateCreator() {
    const { validate } = this.options;

    if (validate) {
      this.errorWrapper = document.createElement('div');
      this.errorWrapper.className = 'popup__input-error';
      this.errorWrapper.setAttribute('aria-live', 'polite');

      return this.errorWrapper;
    }

    return false;
  }

  render() {
    this.fieldCreator();
    const errorWrapper = this.validateCreator();

    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.input);

    if (errorWrapper) {
      fragment.appendChild(errorWrapper);
    }

    return fragment;
  }
}

export default InputField;
