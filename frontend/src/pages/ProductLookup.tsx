import { useEffect, useState } from 'react';
import images from '~/assets/images';
import { Card } from '~/components';
import { CompanyPane, DescriptionPane, DistributionPane, HistoriesPane, NavPanel, ProductInfo } from '~/modules/Lookup';

function ProductLookup() {
  const [activePanel, setActivePanel] = useState(2);

  useEffect(() => {
    const scrollPane = document.getElementById('scrollPane');
    if (scrollPane) {
      scrollPane.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activePanel]);

  return (
    <div className="block w-full font-body bg-[#f5f5f5] min-h-screen">
      <div className="w-full md:max-w-[960px] mx-auto pb-8">
        {/* Header */}
        <Card className="flex items-center px-4 py-2 mb-5 rounded-md h-14">
          <div className="flex items-center h-full rounded-full gap-x-2">
            <img src={images.logo} alt="logo" className="object-cover w-full h-full" />
            <div className="transition-all leading-0">
              <b className="font-bold text-md text-icon">Coffeeidential</b>
            </div>
          </div>
        </Card>
        <ProductInfo />
        <NavPanel activePanel={activePanel} setActivePanel={setActivePanel} />
        <Card className="px-1 py-2 rounded-sm md:px-4 font-landing" id="scrollPane">
          <DescriptionPane isActive={activePanel === 0} />
          <CompanyPane isActive={activePanel === 1} />
          <HistoriesPane isActive={activePanel === 2} />
          <DistributionPane isActive={activePanel === 3} />
        </Card>
      </div>
    </div>
  );
}

export default ProductLookup;
