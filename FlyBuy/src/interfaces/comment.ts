import {User} from "../interfaces/user";
export interface Comment {
    username:User,
    text:string,
    date:string,
    likes:number
}
