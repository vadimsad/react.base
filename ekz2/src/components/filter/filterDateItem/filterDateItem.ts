import { BaseComponent, } from "../../../utils";
import filterDateItemTmpl from './filterDateItem.tmpl.html'

export class FilterDateItem extends BaseComponent {
    private startDateInput: HTMLInputElement;
    private endDateInput: HTMLInputElement;
    onDateUpdate: ((dates: [number, number]) => void)

    constructor(onDateUpdate: (dates: [number, number]) => void) {
        super(filterDateItemTmpl);
        this.startDateInput = this.view.dateStart;
        this.endDateInput = this.view.dateEnd;
        this.onDateUpdate = onDateUpdate;
    }

    render(parent: HTMLElement) {
        this.startDateInput.addEventListener('input', this._inputDate.bind(this));
        this.endDateInput.addEventListener('input', this._inputDate.bind(this));
        parent.append(this.view.root);
    }

    getDateSpan(): [number, number] {
        return [this.startDateInput.valueAsNumber, this.endDateInput.valueAsNumber]
    }

    private _inputDate() {
        if (this.endDateInput.value) {
            this.startDateInput.setAttribute('max', this.endDateInput.value);
        } else {
            this.startDateInput.removeAttribute('max');
        }

        if (this.startDateInput.value) {
            this.endDateInput.setAttribute('min', this.startDateInput.value);
        } else {
            this.endDateInput.removeAttribute('min');
        }

        this.onDateUpdate(this.getDateSpan())
    }
}