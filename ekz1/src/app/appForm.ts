import { taskModificatorsData } from "../shared/settings";
import { EditableType, TaskModificatorsOptions } from "../shared/types";
import { Task, TaskStates, TaskModificators } from "../task/task";
import { TaskEvents } from "../task/taskList";
import { BaseComponent, capitalize, EventEmitter } from "../utils";

export class AppForm extends BaseComponent {
    titleInput: HTMLInputElement;
    descriptionInput: HTMLTextAreaElement;
    taskStateSelect: HTMLSelectElement;
    modificatorFields?: NodeListOf<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    button: HTMLButtonElement;
    readonly eventEmitter: EventEmitter<Task>;

    constructor(root: HTMLElement) {
        super(root);
        this.titleInput = root.querySelector('#titleInput')!;
        this.descriptionInput = root.querySelector('#descriptionInput')!;
        this.taskStateSelect = root.querySelector('#taskStateSelect')!;
        this.button = root.querySelector('#formButton')!;
        this.eventEmitter = new EventEmitter<Task>();

        this._createTask = this._createTask.bind(this);
    }

    init() {
        this.root.addEventListener('submit', this._createTask);
        this.renderModificators(taskModificatorsData);
        this.modificatorFields = this.root.querySelector('#modificatorsContainer')!.querySelectorAll('.form__input')!;
    }

    private _createTask(event: Event) {
        event.preventDefault();

        const notValidReason = Task.validateFields({ title: this.titleInput.value, description: this.descriptionInput.value });
        if (notValidReason) {
            alert(notValidReason);
            return;
        }

        const task = new Task({
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            state: this.taskStateSelect.value as TaskStates,
            modificators: Array.from(this.modificatorFields || []).reduce((acc, curr) => {
                acc[curr.name as TaskModificators] = curr.value;
                return acc;
            }, {} as Record<TaskModificators, string>)
        });
        this.eventEmitter.emit(TaskEvents.TASK_CREATED, task);
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.taskStateSelect.selectedIndex = 0;
        this.modificatorFields?.forEach(field => {
            if (field instanceof HTMLInputElement) {
                field.value = '';
            } else if (field instanceof HTMLSelectElement) {
                field.selectedIndex = 0;
            }
        });
    }

    renderModificators(modificators: Record<TaskModificators, TaskModificatorsOptions>) {
        const modificatorsContainer = this.root.querySelector('#modificatorsContainer')!;
        for (const modificatorData of Object.values(modificators)) {
            const modificatorElement = document.createElement('div');
            modificatorElement.classList.add('form__element');
            const modificatorLabel = document.createElement('label');
            modificatorLabel.textContent = capitalize(modificatorData.value);
            const modificatorInput = document.createElement(modificatorData.fieldType);
            
            if (modificatorData.fieldType === EditableType.INPUT) {
                modificatorInput.setAttribute('type', 'text');
            } else if (modificatorData.fieldType === EditableType.SELECT) {
                const options = modificatorData.options!.map(option => {
                    const optionElem = document.createElement('option');
                    optionElem.value = option;
                    optionElem.textContent = option;
                    return optionElem;
                });
                modificatorInput.append(...options);
            }
            modificatorInput.setAttribute('name', modificatorData.value);
            modificatorInput.setAttribute('id', `${modificatorData.value}Field`);
            modificatorInput.classList.add('form__input', `form__input--${modificatorData.value}`);
            
            modificatorLabel.append(modificatorInput);
            modificatorElement.append(modificatorLabel);
            modificatorsContainer.append(modificatorElement);
        }
    }
}