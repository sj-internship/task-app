export interface Task {
    _id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    tasks:[string]
}