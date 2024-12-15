import { BaseComponent } from "../../../utils";
import sortItemTmpl from './sortItem.tmpl.html'

export class SortItem extends BaseComponent {
    private _currentOrder: 'asc' | 'desc' | null = null
    sortParameter: string;

    onSort: (parameter: string, order: 'asc' | 'desc') => void

    constructor(sortParameter: string, parent: HTMLElement, onSort: (parameter: string, order: 'asc' | 'desc') => void) {
        super(sortItemTmpl);
        this.sortParameter = sortParameter;
        this.onSort = onSort;

        this.render(parent, sortParameter);
    }

    render(parent: HTMLElement, sortParameter: string) {
        this.view.root.textContent = this.sortParameter;
        this.view.root.classList.add(`sort__item--${sortParameter}`);
        this.view.root.addEventListener('click', this._handleClick.bind(this));
        parent.append(this.view.root);
    }

    clearOrder() {
        this.currentOrder = null;
    }

    private _handleClick() {
        this.currentOrder = this._currentOrder === 'asc' ? 'desc' : 'asc';
        this.onSort(this.sortParameter, this.currentOrder);
    }

    set currentOrder(value: 'asc' | 'desc' | null) {
        this._currentOrder = value;
        this.view.root.classList.toggle('sort__item--asc', value === 'asc');
        this.view.root.classList.toggle('sort__item--desc', value === 'desc');
    }

    get currentOrder() {
        return this._currentOrder;
    }
}