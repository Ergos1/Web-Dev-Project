import { Comment } from '../interfaces/comment';
import { Image } from '../interfaces/image';
export interface Product {
    id: number;
    name: string;
    price: number;
    image_urls: Image[];
    description: string;
    rating: number;
    likes: number;
    comments: Comment[];
    views: number;
    category_id: number;
}
