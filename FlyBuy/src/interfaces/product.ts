import { Comment } from "../interfaces/comment";
import { Image } from "../interfaces/image";
export interface Product {
    id:number,
    name:string,
    price:number,
    images:Image[],
    description:string,
    rating:number,
    likes:number,
    coments:Comment[],
    views:number
}
