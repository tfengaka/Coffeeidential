import { Fragment, useEffect, useState } from 'react';
import { LookupApi } from '~/api';
import { TopProduct } from '~/types';
import { ProductCard } from './components';

interface ProductSliderProps {
  className?: string;
}

function ProductSlider(props: ProductSliderProps) {
  const [products, setProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await LookupApi.getTopProducts();
        setProducts(res.top_products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className={`grid grid-cols-3 gap-x-4 ${props.className}`}>
      {products.length > 0 &&
        products.map((product, index) => (
          <Fragment key={index}>
            <ProductCard product={product} />
          </Fragment>
        ))}
    </div>
  );
}

export default ProductSlider;
