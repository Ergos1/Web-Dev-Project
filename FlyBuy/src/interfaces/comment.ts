import {User} from "../interfaces/user";
export interface Comment {
    from:User,
    text:string,
    data:string,
    likes:number
}
