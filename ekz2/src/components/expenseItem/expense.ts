import { EXPENSE_CATEGORIES } from "../../shared/settings";
import { ExpenseCategories } from "../../shared/types";
import { BaseComponent, uuidv4 } from "../../utils";
import { ExpenseData } from "../appForm/appForm";
import expenseTmpl from './expense.tmpl.html'

export class Expense extends BaseComponent {
    private title: string;
    private category: ExpenseCategories;
    amount: number;
    date: Date;
    id: string;

    onRemove: (id: string) => void

    constructor(expenseData: ExpenseData, onRemove: (id: string) => void) {
        super(expenseTmpl);

        this.title = expenseData.title;
        this.amount = expenseData.amount;
        this.category = expenseData.category;
        this.date = this._getValidDate(expenseData.date);
        this.id = expenseData.id ?? uuidv4();

        this.onRemove = onRemove;

        this._attachListeners();
    }

    render(parent: HTMLElement) {
        this.view.name.textContent = this.title;
        this.view.amount.textContent = this.amount;
        this.view.category.textContent = EXPENSE_CATEGORIES[this.category].title;
        this.view.createDt.textContent = this.date.toLocaleDateString('ru');

        parent.append(this.view.root);
    }

    isValid() {
        return (
            this.title != null &&
            this.amount != null &&
            this.category != null &&
            this.date != null &&
            this.id != null
        );
    }

    private _attachListeners() {
        this.view.removeBtn.addEventListener('click', () => this.onRemove(this.id));
    }

    private _getValidDate(date: Date | string) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (isNaN(date.getTime())) {
            date = new Date(0);
        }
        return date;
    }
}