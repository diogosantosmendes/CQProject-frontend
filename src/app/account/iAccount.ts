export interface Account {
    email:string;
    password:string;
    token:string;
    userID: number;
    roles: number[];
    classes:number[];
    name:string;
    photo:string;
}