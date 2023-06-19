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
    <Card className="relative w-full max-h-full">
      <div className="w-full h-[300px] max-h-full pb-1 border-b border-slate-100">
        <img src={product.images[0] || images.logo} alt="" className="object-contain w-full h-full" />
      </div>
      <div className="w-full p-2">
        <div className="flex justify-between">
          <div>
            <Link
              to={`${router.home.lookup}/${product?._id}`}
              target="_blank"
              className="text-xl font-bold text-[#0f455d] hover:text-primary20 transition-all"
            >
              <h3>{product.name}</h3>
            </Link>
            <p className="font-bold text-icon2">{`Giống cà phê ${product.product_type}`}</p>
            <span className="font-bold text-icon">
              Giá niêm yết: <b className="text-primary">{formatCurrency(product.price || 0)}</b>
            </span>
          </div>
          <div className="w-1/5 h-full p-[1px] border-2 rounded-md border-primary60">
            <img src={QRData} alt="" className="object-contain" />
          </div>
        </div>

        <div className="flex items-center mt-2 gap-x-1">
          <img
            src={product.producer?.avatar || images.logo}
            alt=""
            className="object-contain w-10 h-10 p-1 border rounded-full border-primary"
          />
          <span className="text-sm font-bold text-[#0f455d]">{product.producer?.full_name}</span>
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
