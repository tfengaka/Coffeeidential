import { useState } from 'react';
import Images from '~/assets/images';
interface ImagesProps {
  images: string[];
}

function ProductImages({ images }: ImagesProps) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="relative w-full h-full">
      <img src={images.length > 0 ? images[activeImage] : Images.logo} alt="" className="object-cover w-full h-full" />
      <div className="absolute bottom-0 flex flex-row gap-2 -translate-x-1/2 left-1/2">
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className={`relative transition-all cursor-pointer rounded-md border-2 ${
                index === activeImage ? 'border-primary shadow-success' : 'border-icon2 hover:shadow-card'
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img src={image} alt="" className="object-contain w-12 h-12 rounded-md" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductImages;
