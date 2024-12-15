import { View } from "./view";

export class ViewTemplate {
    private _htmlElement: HTMLTemplateElement

    constructor(html: string) {
        this._htmlElement = document.createElement('template');
        this._htmlElement.innerHTML = html;
    }

    cloneView() {
        const element = (this._htmlElement.content.cloneNode(true) as HTMLElement).firstElementChild as HTMLElement;
        return ViewTemplate.getView(element);
    }

    static getView(element: HTMLElement) {
        const view = new View(element);
        (element.querySelectorAll('[data-tag') as NodeListOf<HTMLElement>).forEach(el => {
            if (el.dataset.tag) {
                view[el.dataset.tag] = el;
            }
        });
        return view;
    }
}