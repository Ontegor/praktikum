class Form {
  constructor(fields, options) {
    this.fields = fields;
    this.options = options;
    this.form = null;
  }

  validate() {
    let valid = true;

    this.fields.forEach((field) => {
      const validate = field.setErrors();

      if (validate) {
        valid = false;
      }
    });

    return valid;
  }

  render() {
    const { heading, formClass, buttonClass, buttonText } = this.options;

    const fragment = document.createDocumentFragment();
    this.form = document.createElement('form');
    const button = document.createElement('button');
    button.textContent = buttonText;

    if (heading) {
      const title = document.createElement('h3');
      title.textContent = heading;
      fragment.appendChild(title);
    }

    if (formClass) {
      this.form.className = formClass;
    }

    if (buttonClass) {
      button.className = buttonClass;
    }

    this.fields.forEach((field) => {
      this.form.appendChild(field.render());
    });

    this.form.appendChild(button);

    fragment.appendChild(this.form);

    return fragment;
  }
}

export default Form;
