import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LookupApi } from '~/api';
import images from '~/assets/images';
import { Card, Loading } from '~/components';
import { CompanyPane, DescriptionPane, DistributionPane, HistoriesPane, NavPanel, ProductInfo } from '~/modules/Lookup';
import { LookUpData } from '~/types';

function ProductLookup() {
  const { id } = useParams();
  const [productData, setProductData] = useState<LookUpData>();
  const [activePanel, setActivePanel] = useState(2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scrollPane = document.getElementById('scrollPane');
    if (scrollPane) {
      scrollPane.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activePanel]);

  useEffect(() => {
    (async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await LookupApi.lookupProductData(id);
          setProductData(res);
        } catch (error) {
          toast.error('Tải dữ liệu thất bại');
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [id]);

  return (
    <div className="block w-full font-body bg-[#f5f5f5] min-h-screen">
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Loading />
        </div>
      ) : (
        <div className="w-full md:max-w-[960px] mx-auto pb-8">
          <Card className="flex items-center px-4 py-2 mb-5 rounded-md h-14">
            <div className="flex items-center h-full rounded-full gap-x-2">
              <img src={images.logo} alt="logo" className="object-cover w-full h-full" />
              <div className="transition-all leading-0">
                <b className="font-bold text-md text-icon">Coffeeidential</b>
              </div>
            </div>
          </Card>
          <ProductInfo data={productData} />
          <NavPanel activePanel={activePanel} setActivePanel={setActivePanel} />
          {productData && (
            <Card className="px-1 py-2 rounded-sm md:px-4 font-landing" id="scrollPane">
              <DescriptionPane isActive={activePanel === 0} content={productData.description || ''} />
              <CompanyPane isActive={activePanel === 1} producer={productData.producer} />
              <HistoriesPane
                isActive={activePanel === 2}
                diaries={productData.diaries}
                producer={productData.producer.full_name}
              />
              <DistributionPane isActive={activePanel === 3} />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductLookup;
