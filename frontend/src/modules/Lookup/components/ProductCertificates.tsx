interface ProductCertificatesProps {
  certificates: string[];
}

function ProductCertificates({ certificates }: ProductCertificatesProps) {
  return (
    <div>
      <h5 className="mb-2 text-sm font-semibold text-icon2">Giấy chứng nhận</h5>
      <div className="flex items-center gap-x-2">
        {certificates.map((certificate, index) => (
          <div className="relative transition-all duration-500 cursor-pointer basis-1/3 hover:shadow-card" key={index}>
            <img src={certificate} alt="" className="object-contain w-full h-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCertificates;
