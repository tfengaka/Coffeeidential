import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { Card } from '~/components';
import router from '~/constants/routers';
import { useQRCode } from '~/hooks';
import { TopProduct } from '~/types';
import { formatCurrency } from '~/utils';

interface ProductCardProps {
  product: TopProduct;
}

function ProductCard({ product }: ProductCardProps) {
  const QRData = useQRCode(`${window.location.protocol}//${window.location.host}/lookup/${product._id}`);
  return (
    <Card className="relative w-full max-h-full pb-10">
      <div className="w-full h-[300px] max-h-full pb-1 border-b border-slate-100">
        <img src={product.images[0] || images.logo} alt="" className="object-contain w-full h-full" />
      </div>
      <div className="w-full px-4 py-2">
        <div className="flex justify-between">
          <div className="max-w-[75%]">
            <Link
              to={`${router.home.lookup}/${product?._id}`}
              target="_blank"
              className="text-xl font-bold text-[#0f455d] hover:text-primary20 transition-all max-w-full min-h-[50px] overflow-hidden inline-block truncate whitespace-normal"
            >
              {product.name}
            </Link>

            <p className="font-bold text-icon">
              Giống cây: <b className="text-primary">{product.product_type}</b>
            </p>
            <span className="font-bold text-icon">
              Giá niêm yết:{' '}
              <b className="text-primary">{`${formatCurrency(product.price || 0)}/${product.selling_unit}`}</b>
            </span>
          </div>
          <div className="flex-shrink-0 w-1/5 h-full p-[1px] border-2 rounded-md border-primary60">
            <img src={QRData} alt="" className="object-contain" />
          </div>
        </div>
      </div>
      <div className="absolute flex items-center gap-x-1 bottom-2 left-2">
        <img
          src={product.producer?.avatar || images.logo}
          alt=""
          className="object-contain w-8 h-8 p-1 border rounded-full border-primary"
        />
        <span className="text-sm font-bold text-[#0f455d] uppercase">{product.producer?.full_name}</span>
      </div>
    </Card>
  );
}

export default ProductCard;
