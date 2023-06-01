import { useState } from 'react';

const images = [
  'https://thenobcoffee.com/wp-content/uploads/2021/08/Ca-phe-Arabica-4.png',
  'https://thenobcoffee.com/wp-content/uploads/2021/08/Ca-phe-Arabica-4.png',
  'https://thenobcoffee.com/wp-content/uploads/2021/08/Ca-phe-Arabica-4.png',
];

function ProductImages() {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="relative w-full h-full">
      <img src={images[activeImage]} alt="" className="object-cover w-full h-full" />
      <div className="absolute bottom-0 flex flex-row gap-2 -translate-x-1/2 left-1/2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative transition-all cursor-pointer rounded-md hover:shadow-card border-2 ${
              index === activeImage ? 'border-primary' : 'border-icon2'
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
