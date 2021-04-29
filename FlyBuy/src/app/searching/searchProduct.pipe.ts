import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../../interfaces/product';
@Pipe({
  name: 'ProductFilter'
})
export class SearchProducntPipe implements PipeTransform{
  transform(products: Product[], search: string = ''): Product[] {
    if (!search.trim()) {
      console.log('not input entered');
      return products;
    }

    return products.filter(product => {
      return product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}