import { ExpenseCategories } from "../../shared/types";
import { BaseComponent, EventEmitter } from "../../utils";
import filtersTmpl from './filters.tmpl.html'
import { FitlerCategoryItem } from "./filterCategoryItem/filterCategoryItem";
import { FilterDateItem } from "./filterDateItem/filterDateItem";

export type FilterShape = {
    [parameter: string]: Array<string | number | Date>
};

export enum FilterEvents {
    CATEGORY_SELECTED = 'category-selected',
    DATE_SELECTED = 'date-selected'
};

export class Filters extends BaseComponent {
    private filterCategoryItem: FitlerCategoryItem | null = null;
    private filterDateItem: FilterDateItem | null = null;

    readonly eventEmitter: EventEmitter<ExpenseCategories[] | [number, number]> = new EventEmitter();

    constructor(parent: HTMLElement) {
        super(filtersTmpl);
        parent.append(this.view.root);
    }

    init(categories: ExpenseCategories[]) {
        this.filterCategoryItem = new FitlerCategoryItem(categories, this._onFilterCategory.bind(this));
        this.filterCategoryItem.render(this.view.root);
        this.filterDateItem = new FilterDateItem(this._onFilterDate.bind(this));
        this.filterDateItem.render(this.view.root);
    }

    getFilters() {
        const filters: FilterShape = {};
        if (this.filterCategoryItem?.selectedCategories) {
            filters['category'] = this.filterCategoryItem.selectedCategories;
        }
        if (this.filterDateItem) {
            filters['date'] = this.filterDateItem.getDateSpan();
        }
        return filters;
    }

    private _onFilterCategory(categories: ExpenseCategories[]) {
        this.eventEmitter.emit(FilterEvents.CATEGORY_SELECTED, categories);
    }

    private _onFilterDate(dates: [number, number]) {
        this.eventEmitter.emit(FilterEvents.DATE_SELECTED, dates);
    }
}