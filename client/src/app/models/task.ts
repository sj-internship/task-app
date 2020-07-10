export interface TaskModel {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tasks:[string];
}

export interface TaskUpdateModel{
    _id:string;
    title: string;
    description:string;
}
export interface TaskAddModel{
    title: string;
    description:string;
    createdBy:string;
    parentId?:string;
}