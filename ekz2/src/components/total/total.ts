import { BaseComponent } from "../../utils";
import { Expense } from "../expenseItem/expense";
import totalTmpl from './total.tmpl.html';

export class Total extends BaseComponent {
    constructor(parent: HTMLElement) {
        super(totalTmpl);
        parent.append(this.view.root);
    }

    init(expenses: Expense[]) {
        this.update(expenses);
    }

    update(expenses: Expense[]) {
        const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        this.view.total.textContent = 'Total expenses amount: ' + total.toFixed(2);
        this.view.average.textContent = 'Average expense amount: ' + (expenses.length ? (total / expenses.length) : 0).toFixed(2);
    }
}