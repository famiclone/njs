class UIElement {
  type: string;

  constructor(type: string, cb?: (event: Event) => void) {
    this.type = type;
  }

  render() {}
}

export default class UI {
  elements: UIElement[] = [];

  create(type: string) {
    const element = new UIElement("input-file");
  }

  render() {
    this.elements.forEach((element) => {
      element.render();
    });
  }
}
