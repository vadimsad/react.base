import { taskModificatorsData } from "../shared/settings";
import { EditableType } from "../shared/types";
import { BaseComponent, EventEmitter } from "../utils";
import { TaskStates, TaskModificators, Task } from "./task";

type BaseEditableOptions<T> = {
    type: T;
    value: string;
    classNameCurrent: string;
    classNameEditField: string;
    inputHandler: (event: Event) => void;
    attributes?: {[key: string]: string}
}

type EditableOptions<T extends EditableType> =
    T extends EditableType.SELECT
        ? BaseEditableOptions<T> & {options: string[]}
        : BaseEditableOptions<T>

const taskStates = Object.values(TaskStates);

export enum TaskEvents {
    TASK_REMOVED = 'task-removed',
    TASK_CREATED = 'task-created',
    TASK_EDIT_TOGGLED = 'task-edit-toggled',
    TASK_STATE_TOGGLED = 'task-state-toggled'
}

export class TaskList extends BaseComponent {
    tasks: Task[] = [];

    readonly eventEmitter: EventEmitter<Task>;

    constructor(root: HTMLElement) {
        super(root);
        this.eventEmitter = new EventEmitter();
    }

    init(tasks: Task[]) {
        this.tasks = tasks;
        this.update()
    }

    addTask(task: Task) {
        this.tasks.push(task);
        this.update();
    }

    update() {
        this.renderTasks();
    }

    renderTasks() {
        this.root.innerHTML = '';
        const fragment = document.createDocumentFragment();
        this.tasks.forEach(task => {
            const taskElem = this.renderTask(task);
            taskElem.addEventListener('click', this._taskClickHandle.bind(this, task));
            fragment.appendChild(taskElem);
        });
        this.root.appendChild(fragment);
    }

    renderTask(task: Task) {
        const item = document.createElement('li');
        item.classList.add('items-list__item', 'item');
        if (task.isEditing) {
            item.classList.add('on-edit');
        } else {
            item.classList.add(task.state);
        }
        const itemContent = document.createElement('div');
        itemContent.classList.add('item__content');
        itemContent.append(this.renderTaskContents(task));
        item.append(itemContent);
        item.append(this.renderControls(task));
        return item
    }

    renderTaskContents(task: Task) {
        const fragment = document.createDocumentFragment();

        const state = document.createElement('div');
        state.classList.add('item__state');
        const stateFields = this.renderEditableField(task, {
            type: EditableType.SELECT,
            classNameEditField: 'item__state-select',
            classNameCurrent: 'item__state-current',
            options: taskStates,
            value: task.state,
            inputHandler: e => {
                task.state = (e.target as HTMLSelectElement).value as TaskStates;
                this.update();
            }
        });
        state.append(stateFields);

        const textInfo = document.createElement('div');
        textInfo.classList.add('item__text-info');
        textInfo.append(this.renderTextInfo(task));

        let modificators: HTMLElement[] | undefined;
        if (task.modificators) {
            modificators = Object.entries(task.modificators).map(([modificator]) => {
                return this.renderModificator(task, modificator as TaskModificators);
            });
        }

        const date = document.createElement('div');
        date.classList.add('item__date');
        date.textContent = task.createDt.toLocaleString();

        fragment.append(state, textInfo, ...modificators ?? '', date);
        return fragment;
    }

    renderTextInfo(task: Task) {
        const fragment = document.createDocumentFragment();

        const title = document.createElement('div');
        title.classList.add('item__title');
        const titleFields = this.renderEditableField(task, {
            type: EditableType.INPUT,
            classNameEditField: 'item__title-select',
            classNameCurrent: 'item__title-current',
            value: task.title,
            inputHandler: e => {
                task.title = (e.target as HTMLInputElement).value;
            },
            attributes: {
                placeholder: 'title'
            }
        });
        title.append(titleFields);

        const description = document.createElement('div');
        description.classList.add('item__description');
        const descriptionFields = this.renderEditableField(task, {
            type: EditableType.TEXTAREA,
            classNameEditField: 'item__description-select',
            classNameCurrent: 'item__description-current',
            value: task.description ?? '',
            inputHandler: e => {
                task.description = (e.target as HTMLInputElement).value;
            },
            attributes: {
                placeholder: 'description',
                rows: '3',
                cols: '30',
                maxlength: '100',
                resize: 'none'
            }
        });
        description.append(descriptionFields);

        fragment.append(title, description);
        return fragment
    }

    renderModificator(task:Task, modificator: TaskModificators) {
        const container = document.createElement('div');
        container.classList.add('item__modificator', `item__modificator--${modificator}`);

        const modificatorData = taskModificatorsData[modificator];
        let optionsForRender;
        let modificatorField;

        if (modificatorData.fieldType === EditableType.SELECT) {
            optionsForRender = {
                type: modificatorData.fieldType,
                classNameEditField: 'item__modificator-select',
                classNameCurrent: 'item__modificator-current',
                value: task.modificators?.[modificator] ?? '',
                options: modificatorData.options!,
                inputHandler: (e: Event) => {
                    if (task.modificators?.[modificator]) {
                        task.modificators[modificator] = (e.target as HTMLInputElement).value;
                    }
                }
            };
            modificatorField = this.renderEditableField(task, optionsForRender);
        } else if (modificatorData.fieldType === EditableType.INPUT) {
            optionsForRender = {
                type: modificatorData.fieldType,
                classNameEditField: 'item__modificator-input',
                classNameCurrent: 'item__modificator-current',
                value: task.modificators?.[modificator] ?? '',
                inputHandler: (e: Event) => {
                    if (task.modificators?.[modificator]) {
                        task.modificators[modificator] = (e.target as HTMLInputElement).value;
                    }
                }
            };
            modificatorField = this.renderEditableField(task, optionsForRender);
        }

        container.append(modificatorField!);
        return container
    }

    renderEditableField<T extends EditableType>(task: Task, editableOptions: EditableOptions<T>) {
        const fragment = document.createDocumentFragment();

        let editableField: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        editableField = document.createElement(editableOptions.type);
        editableField.classList.add(editableOptions.classNameEditField);
        editableField.classList.toggle('hide', !task.isEditing);
        if (editableOptions.type === EditableType.SELECT) {
            editableOptions.options.forEach(option => {
                const optionElem = document.createElement('option');
                optionElem.value = option;
                optionElem.textContent = option;
                editableField.append(optionElem);
                if (option === editableOptions.value) {
                    optionElem.selected = true;
                }
            });
        } else {
            editableField.value = editableOptions.value ?? '';
        }

        Object.entries(editableOptions.attributes ?? {}).forEach(([key, value]) => {
            editableField.setAttribute(key, value);
        })

        editableField.addEventListener('input', editableOptions.inputHandler);

        const currentField = document.createElement('div');
        currentField.textContent = editableOptions.value;
        currentField.classList.add(editableOptions.classNameCurrent);
        currentField.classList.toggle('hide', task.isEditing);

        fragment.append(currentField, editableField);
        return fragment
    }

    renderTaskCustomField(options: string[], currentOption?: string) {
        const select = document.createElement('select');

        options.forEach(option => {
            const optionElem = document.createElement('option');
            optionElem.value = option;
            optionElem.textContent = option;
            select.append(optionElem);
            if (option === currentOption) {
                optionElem.selected = true;
            }
        });
        return select
    }

    renderControls(task: Task) {
        const editBtn = document.createElement('button');
        editBtn.classList.add('item__edit');
        editBtn.textContent = task.isEditing ? 'save' : 'edit';
        editBtn.addEventListener('click', e => this._taskEditClickHandle(e, task));

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('item__remove');
        removeBtn.textContent = 'del';
        removeBtn.addEventListener('click', e => this._taskRemoveClickHandle(e, task));

        const controlsBlock = document.createElement('div');
        controlsBlock.classList.add('item__controls');
        controlsBlock.append(editBtn, removeBtn);
        return controlsBlock
    }

    filterTasks(filterName: keyof Task, order: 'asc' | 'desc', isModifier: boolean = false) {
        this.tasks = this.tasks.sort((a, b) => {
            let aSort: any = a;
            let bSort: any = b;
            if (isModifier) {
                aSort = a.modificators!;
                bSort = b.modificators!;
            }
            if (aSort[filterName] == undefined || bSort[filterName] == undefined) {
                return 0;
            }
            if (aSort[filterName] < bSort[filterName]) {
                return -1;
            } else if (aSort[filterName] > bSort[filterName]) {
                return 1;
            } else {
                return 0;
            }
        });
        if (order === 'desc') {
            this.tasks.reverse();
        }
        this.update();
    }

    private _taskClickHandle(task: Task) {
        if (!task.isEditing) {
            task.toggleState();
            this.update();
            
            this.eventEmitter.emit(TaskEvents.TASK_STATE_TOGGLED, task);
        }
    }

    private _taskEditClickHandle(event: MouseEvent, task: Task) {
        event.stopPropagation();
        const notValidReason = Task.validateFields({ title: task.title, description: task.description });
        if (task.isEditing && notValidReason) {
            alert(notValidReason);
            return;
        }
        task.toggleEdit();
        this.update();

        this.eventEmitter.emit(TaskEvents.TASK_EDIT_TOGGLED, task)
    }

    private _taskRemoveClickHandle(event: MouseEvent, task: Task) {
        event.stopPropagation();
        this.tasks = this.tasks.filter(t => t !== task);
        this.update();

        this.eventEmitter.emit(TaskEvents.TASK_REMOVED, task);
    }
}