import { NumberSymbol } from "@angular/common";
import {User} from "../interfaces/user";
export interface Comment {
    username:string,
    text:string,
    date:string,
    likes:number,
    product_id:number
}
