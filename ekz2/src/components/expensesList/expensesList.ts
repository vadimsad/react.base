import { BaseComponent, EventEmitter } from "../../utils";
import { ExpenseData } from "../appForm/appForm";
import { Expense } from "../expenseItem/expense";
import { FilterShape } from "../filter/filters";
import expensesListTmpl from './expenseList.tmpl.html';

export enum ExpensesListEvents {
    EXPENSE_REMOVED = 'expense-removed'
}

export class ExpensesList extends BaseComponent {
    expensesList: Expense[] = [];
    expensesListFiltered: Expense[] = [];
    filters!: FilterShape;
    sortParameter?: string;
    sortOrder?: 'asc' | 'desc';

    readonly eventEmitter: EventEmitter<undefined> = new EventEmitter();

    constructor(parent: HTMLElement) {
        super(expensesListTmpl);
        parent.append(this.view.root);
    }

    init(expensesList: Expense[], filters: FilterShape) {
        this.filters = filters;
        this.expensesList = expensesList;
        this._applyFilters();
        this.render();
    }

    render() {
        this.view.root.innerHTML = '';

        this.expensesListFiltered.forEach(expense => expense.render(this.view.root));
    }

    addExpense(expense: ExpenseData) {
        this.expensesList.push(new Expense(expense, this.removeExpense.bind(this)));
        this._applyFilters();
        this._applySort();
        this.render();
    }

    removeExpense(id: string) {
        this.expensesList = this.expensesList.filter(expense => expense.id !== id);
        this.expensesListFiltered = this.expensesListFiltered.filter(expense => expense.id !== id);
        this.render();
        this.eventEmitter.emit(ExpensesListEvents.EXPENSE_REMOVED);
    }

    updateFilters(parameter: string, values: Array<string | number | Date>) {
        this.filters[parameter] = values;
        this._applyFilters();
        this._applySort();
        this.render();
    }

    private _applyFilters() {
        this.expensesListFiltered = this.expensesList.filter(expense => {
            for (const [key, value] of Object.entries(this.filters)) {
                if (key === 'date') {
                    const startDate = value[0] as number;
                    const endDate = value[1] as number;
                    const expenseTimestamp = expense.date.getTime();
                    if (isNaN(expenseTimestamp) || (isNaN(startDate) && isNaN(endDate))) {
                        return true;
                    }
                    if (expenseTimestamp < startDate || expenseTimestamp > endDate) {
                        return false;
                    }
                    continue;
                }
                if (!value.includes(expense[key as keyof ExpenseData])) {
                    return false;
                }
            }
            return true;
        });
    }

    updateSort(parameter: string, order: 'asc' | 'desc') {
        this.sortParameter = parameter;
        this.sortOrder = order;
        this._applyFilters();
        this._applySort();
        this.render();
    }

    private _applySort() {
        if (!this.sortParameter || !this.sortOrder) {
            return;
        }

        this.expensesListFiltered.sort((a, b) => {
            const aSort = a[this.sortParameter as keyof ExpenseData];
            const bSort = b[this.sortParameter as keyof ExpenseData];
            if (aSort == undefined || bSort == undefined) {
                return 0;
            }

            if (typeof aSort === 'string' && typeof bSort === 'string') {
                return this.sortOrder === 'asc' ? aSort.localeCompare(bSort) : bSort.localeCompare(aSort);
            }
            
            if (this.sortOrder === 'asc') {
                return aSort > bSort ? 1 : -1;
            } else {
                return aSort < bSort ? 1 : -1;
            }
        });
    }
}