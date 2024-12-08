import { TaskModificators } from "../task/task";
import { EditableType, TaskModificatorsOptions } from "./types";

export const taskModificatorsData: Record<TaskModificators, TaskModificatorsOptions> = {
    [TaskModificators.DEADLINE]: {
        fieldType: EditableType.INPUT,
        value: 'deadline'
    },
    [TaskModificators.ASSIGNEE]: {
        fieldType: EditableType.INPUT,
        value: 'assignee'
    },
    [TaskModificators.PLACE]: {
        fieldType: EditableType.INPUT,
        value: 'place'
    },
    [TaskModificators.PRIORITY]: {
        fieldType: EditableType.SELECT,
        value: 'priority',
        options: ['low', 'medium', 'high']
    }
};