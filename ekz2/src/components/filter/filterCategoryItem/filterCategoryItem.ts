import { BaseComponent, EventEmitter } from "../../../utils";
import filterItemTmpl from './filterCategoryItem.tmpl.html'
import filterSingleItemTmpl from './filterCategorySingle.tmpl.html'
import { ExpenseCategories } from "../../../shared/types";
import { ViewTemplate } from "../../../shared/view/viewTemplate";
import { EXPENSE_CATEGORIES } from "../../../shared/settings";

export class FitlerCategoryItem extends BaseComponent {
    private categories: ExpenseCategories[];
    selectedCategories: ExpenseCategories[];
    onFilter: (categories: ExpenseCategories[]) => void;

    constructor(categories: ExpenseCategories[], onFilter: (categories: ExpenseCategories[]) => void) {
        super(filterItemTmpl);
        this.categories = categories;
        this.selectedCategories = categories;
        this.onFilter = onFilter;
    }

    render(parent: HTMLElement) {
        this.view.filterCategoryItems.innerHTML = '';
        this.categories.forEach(category => {
            const categoryItem = new ViewTemplate(filterSingleItemTmpl).cloneView();
            categoryItem.title.textContent = EXPENSE_CATEGORIES[category].title;
            categoryItem.input.checked = this.selectedCategories.includes(category);
            categoryItem.root.addEventListener('input', e => this._handleCategoryClick.call(this, e, category));
            this.view.filterCategoryItems.append(categoryItem.root);
        })

        parent.append(this.view.root);
    }

    private _handleCategoryClick(e: Event, category: ExpenseCategories) {
        const target = e.target as HTMLInputElement;

        if (target.checked && !this.selectedCategories.includes(category)) {
            this.selectedCategories.push(category);
        } else if (!target.checked && this.selectedCategories.includes(category)) {
            this.selectedCategories = this.selectedCategories.filter(item => item !== category);
        }

        this.onFilter(this.selectedCategories);
    }
}