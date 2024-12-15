import { EXPENSE_CATEGORIES } from "../../shared/settings";
import { ExpenseCategories } from "../../shared/types";
import { BaseComponent, EventEmitter } from "../../utils";
import appFormTmpl from './appForm.tmpl.html'

export type ExpenseData = {
    title: string;
    amount: number;
    category: ExpenseCategories;
    date: Date
    id?: string;
}

export enum AppFormEvents {
    EXPENSE_ADD = 'expense-add'
}

export class AppForm extends BaseComponent {
    private titleInput: HTMLInputElement;
    private amountInput: HTMLInputElement;
    private categorySelect: HTMLSelectElement;
    private dateInput: HTMLInputElement;

    readonly eventEmitter: EventEmitter<ExpenseData> = new EventEmitter()

    constructor(parent: HTMLElement) {
        super(appFormTmpl);
        
        this.titleInput = this.view.titleInput;
        this.amountInput = this.view.amountInput;
        this.categorySelect = this.view.categorySelect;
        this.dateInput = this.view.dateInput;
        
        this._renderCategoriesOptions();
        parent.append(this.view.root);
    }

    init() {
        this._attachListeners();
    }

    private _attachListeners() {
        this.view.root.addEventListener('submit', e => {
            e.preventDefault();

            const expenseData = {
                title: this.titleInput.value,
                amount: +this.amountInput.value,
                category: this.categorySelect.value as ExpenseCategories,
                date: this.dateInput.valueAsDate ?? undefined
            };
            const errorText = this._validateFields(expenseData);
            if (errorText) {
                alert(errorText);
                return;
            }

            this._clearFields();
            this.eventEmitter.emit(AppFormEvents.EXPENSE_ADD, expenseData as ExpenseData);
        })
    }

    private _renderCategoriesOptions() {
        Object.entries(EXPENSE_CATEGORIES).forEach(([value, category]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = category.title;
            this.categorySelect.append(option);
        })
    }

    private _validateFields({ title, amount, category, date }: Partial<ExpenseData>) {
        if (!title || title.length < 3) {
            return 'Please enter title longer than 3 symbols';
        }

        if (!amount) {
            return 'Amount should be more than 0';
        } else if (!Number.isFinite(amount)) {
            return 'Please enter valid amount';
        }

        if (!category) {
            return 'Please select category';
        }

        if (!date) {
            return 'Please select date';
        }
    }

    private _clearFields() {
        this.titleInput.value = '';
        this.amountInput.value = '';
        this.categorySelect.selectedIndex = 0;
    }
}