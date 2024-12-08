import { TaskModificators } from "../task/task";
import { BaseComponent, EventEmitter } from "../utils";

const filters = {
    STATE: 'state',
    TITLE: 'title',
    ...TaskModificators,
    CREATE_DT: 'createDt',
}

export enum FilterEvents {
    FILTER_CHANGED = 'filter-changed'
}

export class Filter extends BaseComponent {
    currentFilter: string | null = null;
    currentOrder: 'asc' | 'desc' | null = null;

    readonly eventEmitter: EventEmitter<string>;

    constructor(root: HTMLElement) {
        super(root);
        this.eventEmitter = new EventEmitter();
    }

    init() {
        this.render();
    }

    render() {
        this.root.innerHTML = '';
        const filterElements = Object.values(filters).map(f => {
            const isActive = f === this.currentFilter;
            const isAsc = this.currentOrder === 'asc';
            const isDessc = this.currentOrder === 'desc';
            const wrapper = document.createElement('div');
            wrapper.classList.add('filters__item-wrapper');
            const filterElement = document.createElement('button');
            filterElement.classList.add('filters__item', `filters__item--${f}`);
            filterElement.classList.toggle('filters__item--asc', isActive && isAsc);
            filterElement.classList.toggle('filters__item--desc', isActive && isDessc);
            filterElement.setAttribute('data-filter', f);
            filterElement.textContent = f;
            filterElement.addEventListener('click', e => {
                const filterName = (e.target as HTMLElement).getAttribute('data-filter');
                if (filterName) {
                    if (filterName === this.currentFilter) {
                        this.currentOrder = this.currentOrder === 'asc' ? 'desc' : 'asc';
                    } else {
                        this.currentOrder = 'asc';
                    }
                    this.currentFilter = filterName;
                    this.render();
                    this.eventEmitter.emit(FilterEvents.FILTER_CHANGED, filterName, { order: this.currentOrder, isModifier: Object.values(TaskModificators).includes(filterName as TaskModificators) });
                }
            });

            wrapper.append(filterElement)
            return wrapper;
        });

        this.root.append(...filterElements);
    }

}