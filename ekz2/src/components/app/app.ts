import { EXPENSE_CATEGORIES } from "../../shared/settings";
import { ExpenseCategories } from "../../shared/types";
import { BaseComponent } from "../../utils";
import { AppForm, AppFormEvents } from "../appForm/appForm";
import { Expense } from "../expenseItem/expense";
import { ExpensesList, ExpensesListEvents } from "../expensesList/expensesList";
import { FilterEvents, Filters } from "../filter/filters";
import { Sort, SortEvents } from "../sort/sort";
import { Total } from "../total/total";
import appTmpl from './app.tmpl.html'

export class App extends BaseComponent {
    private appForm: AppForm;
    private filters: Filters;
    private sort: Sort;
    private expensesList: ExpensesList;
    private total: Total;

    constructor(parent: HTMLElement) {
        super(appTmpl)
        parent.append(this.view.root);

        this.appForm = new AppForm(this.view.appBody);
        this.filters = new Filters(this.view.appBody);
        this.sort = new Sort(this.view.appBody);
        this.expensesList = new ExpensesList(this.view.appBody);
        this.total = new Total(this.view.appBody);
    }

    init() {
        this.appForm.init();
        this.filters.init(Object.keys(EXPENSE_CATEGORIES) as ExpenseCategories[]);
        this.sort.init(['title', 'amount', 'category', 'date']);
        this.expensesList.init(this.restoreExpenses(), this.filters.getFilters());
        this.total.init(this.expensesList.expensesListFiltered);

        this._attachListeners();
    }

    restoreExpenses() {
        try {
            const expenses = JSON.parse(localStorage.getItem('expenses')!);
            return this.validateExpenses(expenses);
        } catch (e) {
            console.log(e);
            localStorage.removeItem('expenses');
            return [];
        }
    }

    saveExpenses() {
        try {
            localStorage.setItem('expenses', JSON.stringify(this.expensesList.expensesList));
        } catch (e) {
            console.log(e);
        }
    }

    validateExpenses(expenses: unknown) {
        if (!Array.isArray(expenses)) {
            return [];
        }

        try {
            const expensesArr = expenses.map(expense => new Expense(expense, this.expensesList.removeExpense.bind(this.expensesList)));
            if (expensesArr.every(exp => exp.isValid())) {
                return expensesArr;
            } else {
                throw new Error('Invalid expenses');
            }
        } catch (e) {
            localStorage.removeItem('expenses');
            return [];
        }
    }

    private _attachListeners() {
        this.appForm.eventEmitter.subscribe(AppFormEvents.EXPENSE_ADD, expenseData => {
            if (expenseData) {
                this.expensesList.addExpense(expenseData);
                this.total.update(this.expensesList.expensesListFiltered);
                this.saveExpenses();
            }
        });

        this.filters.eventEmitter.subscribe(FilterEvents.CATEGORY_SELECTED, categories => {
            if (categories) {
                this.expensesList.updateFilters('category', categories);
                this.total.update(this.expensesList.expensesListFiltered);
            }
        })

        this.filters.eventEmitter.subscribe(FilterEvents.DATE_SELECTED, dates => {
            if (dates) {
                this.expensesList.updateFilters('date', dates);
                this.total.update(this.expensesList.expensesListFiltered);
            }
        })

        this.sort.eventEmitter.subscribe(SortEvents.SORT, additionalData => {
            if (additionalData?.parameter && additionalData?.order) {
                this.expensesList.updateSort(additionalData.parameter as keyof Expense, additionalData.order);
            }
        })

        this.expensesList.eventEmitter.subscribe(ExpensesListEvents.EXPENSE_REMOVED, () => {
            this.total.update(this.expensesList.expensesListFiltered);
            this.saveExpenses();
        });
    }
}
