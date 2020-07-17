export interface TaskModel {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: [string];
    tags: string[];
    deadline:Date
}

export interface TaskUpdateModel {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    deadline?:Date
}
export interface TaskAddModel {
    title: string;
    description: string;
    createdBy: string;
    parentId?: string;
    tags?: string[];
    deadline?:Date
}