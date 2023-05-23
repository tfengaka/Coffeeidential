import { Link } from 'react-router-dom';

import Icons from '~/assets/icons';
import router from '~/constants/routers';
import { useAppDispatch, useAppSelector } from '~/redux';
import ProductTable from './ProductTable';
import { useEffect } from 'react';
import { setProducts } from '~/redux/reducers/productSlice';
import { productsdata } from '~/api/mockData';

function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(setProducts(productsdata));
  }, [dispatch]);

  return (
    <div className="w-full mt-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-icon">Danh sách sản phẩm</p>
        </div>
        <div className="flex items-center">
          <Link
            className="flex items-center text-white rounded-sm bg-primary gap-x-1 shadow-success hover:-translate-y-[3px] text-md font-body font-semibold px-3 py-2 transition-all ease-in-out"
            to={router.dashboard.products.create}
          >
            <Icons.Plus />
            <span>Thêm mới</span>
          </Link>
        </div>
      </div>
      <div className="relative">
        <ProductTable height={630} data={products} />
      </div>
    </div>
  );
}

export default Products;
