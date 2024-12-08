const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 100;

export enum TaskStates {
    OPEN = 'open',
    IN_PROGRESS = 'in-progress',
    SUCCESS = 'success',
    FAIL = 'fail',
    CLOSED = 'closed'
}

export enum TaskModificators {
    DEADLINE = 'deadline',
    ASSIGNEE = 'assignee',
    PLACE = 'place',
    PRIORITY = 'priority'
}

export class Task {
    title: string;
    description?: string;
    createDt: Date;
    state: TaskStates;
    isEditing: boolean = false;

    modificators?: Partial<Record<TaskModificators, string>>;
    prevState?: TaskStates;

    constructor({ title, description, state, modificators, createDt }: { title: string, description?: string, state?: TaskStates, modificators?: Partial<Record<TaskModificators, string>>, createDt?: Date | string }) {
        this.title = title;
        this.description = description;
        this.createDt = new Date();
        this.state = state ?? TaskStates.OPEN;
        this.modificators = modificators;

        if (createDt) {
            if (typeof createDt === 'string') {
                createDt = new Date(createDt);
            }
            this.createDt = createDt;
        }
    }

    toggleState() {
        const tempState = this.state;
        this.state = this.state === TaskStates.CLOSED
            ? (this.prevState ?? TaskStates.OPEN)
            : TaskStates.CLOSED;
        this.prevState = tempState;
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    static validateFields({ title, description }: { title: string, description?: string }) {
        switch (true) {
            case title.length < TITLE_MIN_LENGTH:
                return `field "title" is less than ${TITLE_MIN_LENGTH} symbols`;
            case title.length > TITLE_MAX_LENGTH:
                return `field "title" is more than ${TITLE_MAX_LENGTH} symbols`;
            case description && description.length > DESCRIPTION_MAX_LENGTH:
                return `field "description" is more than ${DESCRIPTION_MAX_LENGTH} symbols`;
            default:
                return '';
        }
    }
}