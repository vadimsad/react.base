export enum EditableType {
    SELECT = 'select',
    INPUT = 'input',
    TEXTAREA = 'textarea'
}

export type TaskModificatorsOptions = 
    | { fieldType: EditableType.INPUT; value: string }
    | { fieldType: EditableType.SELECT; value: string; options: string[] }
