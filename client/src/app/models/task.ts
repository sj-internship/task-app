export interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    tasks:[string];
}

export interface TaskUpdate{
    _id:string;
    title: string;
    description:string;
}
export interface TaskAdd{
    title: string;
    description:string;
    createdBy:string;
    parentId:string;
}