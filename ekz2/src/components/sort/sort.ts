import { BaseComponent, EventEmitter } from "../../utils";
import sortTmpl from './sort.tmpl.html';
import { SortItem } from "./sortItem/sortItem";

export enum SortEvents {
    SORT = 'sort'
}

export type SortEventType = {
    parameter: string;
    order: 'asc' | 'desc';
}

export class Sort extends BaseComponent {
    private sortParameters: string[] = [];
    private currentSortParameter: string | null = null;
    private sortItems: SortItem[] = [];

    readonly eventEmitter: EventEmitter<SortEventType> = new EventEmitter();

    constructor(parent: HTMLElement) {
        super(sortTmpl);
        parent.append(this.view.root);
    }

    init(sortParameters: string[]) {
        this.sortParameters = sortParameters;
        this.render();
    }

    render() {
        this.view.root.innerHTML = '';
        this.sortItems = [];

        this.sortParameters.forEach(parameter => {
            const sortItem = new SortItem(parameter, this.view.root, this.onSort.bind(this));
            this.sortItems.push(sortItem);
        });
    }

    onSort(parameter: string, order: 'asc' | 'desc') {
        this.currentSortParameter = parameter;

        this.sortItems.forEach(sortItem => {
            if (sortItem.sortParameter !== this.currentSortParameter) {
                sortItem.clearOrder();
            }
        })

        this.eventEmitter.emit(SortEvents.SORT, {
            parameter: this.currentSortParameter,
            order: order
        });
    }
}