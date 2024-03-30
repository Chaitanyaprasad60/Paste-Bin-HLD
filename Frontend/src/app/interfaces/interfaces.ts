export interface StandardResponse {
    status:"success"|"error";
    response:any
}

export interface Paste {
    title:string;
    content:string;
    createdBy:string
    expireAt:Date|null
}