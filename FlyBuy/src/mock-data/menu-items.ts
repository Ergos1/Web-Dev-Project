import { MenuItem } from '../interfaces/menu-item';

export const menuItems:MenuItem[] = [
    {name:"Home", link:"home",active:false,icon:"home", need_permission:false},
    {name:"Category", link:"categories",active:false,icon:"store", need_permission: false},
    {name:"Cart", link:"cart",active:false,icon:"shopping_cart", need_permission: false},
    {name:"Tools", link:'staff-tools', active:false, icon:"build", need_permission: true}
]