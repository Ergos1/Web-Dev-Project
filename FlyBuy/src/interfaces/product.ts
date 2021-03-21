import {Comment} from "../interfaces/comment";
export interface Product {
    id:number,
    name:string,
    price:number,
    photo:string[],
    description:string,
    rating:number,
    likes:number,
    coments:Comment[],
    views:number
}
