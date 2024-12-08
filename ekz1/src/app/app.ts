import { Task } from "../task/task";
import { TaskEvents, TaskList } from "../task/taskList";
import { BaseComponent } from "../utils";
import { Filter, FilterEvents } from "./appFilters";
import { AppForm } from "./appForm";

export class App extends BaseComponent {
    form: AppForm;
    filter: Filter;
    taskList: TaskList;

    constructor(root: HTMLElement) {
        super(root)
        this.form = new AppForm(root.querySelector('#appForm')!);
        this.filter = new Filter(root.querySelector('#appFilters')!);
        this.taskList = new TaskList(root.querySelector('#appItemsList')!);
    }

    init() {
        this.form.init();
        this.filter.init();
        this.taskList.init(this.restoreTasks());

        this.form.eventEmitter.subscribe(TaskEvents.TASK_CREATED, (newTask?: Task) => {
            if (newTask) this.taskList.addTask(newTask);
            this.saveTasks();
        });

        this.taskList.eventEmitter.subscribe(TaskEvents.TASK_EDIT_TOGGLED, () => {
            this.saveTasks();
        });

        this.taskList.eventEmitter.subscribe(TaskEvents.TASK_STATE_TOGGLED, () => {
            this.saveTasks();
        });

        this.taskList.eventEmitter.subscribe(TaskEvents.TASK_REMOVED, () => {
            this.saveTasks();
        });

        this.filter.eventEmitter.subscribe(FilterEvents.FILTER_CHANGED, (filterName, additionalData) => {
            const { order, isModifier } = additionalData as { order: 'asc' | 'desc', isModifier: boolean };
            this.taskList.filterTasks(filterName as keyof Task, order, isModifier);
        })
    }

    restoreTasks() {
        try {
            const tasks = JSON.parse(localStorage.getItem('tasks')!);
            return this.validateTasks(tasks);
        } catch (e) {
            console.error(e);
            localStorage.removeItem('tasks');
            return [];
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.taskList.tasks));
        } catch (e) {
            console.error(e);
        }
    }

    validateTasks(tasks: unknown) {
        if (!Array.isArray(tasks)) {
            return [];
        }

        try {
            return tasks.map(task => new Task(task));
        } catch (e) {
            localStorage.removeItem('tasks');
            return [];
        }
    }
}
