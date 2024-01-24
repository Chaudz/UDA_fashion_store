const ProductCarousel = () => {
  const productImages = [
    "https://file.hstatic.net/1000096703/file/1_abfc38482fcc47d592e53aea83de357c.jpg",
    "https://file.hstatic.net/1000096703/file/220_e2dba702eda044e291c61c4eca34fb8e.jpg",
    "https://file.hstatic.net/1000096703/file/kenta_19122923-013_7f9b0e95a0ff469fba7fe662772a8b3f.jpg",
    "https://file.hstatic.net/1000096703/file/so-mi-nam_771aefa65db041b0b87130c56799702f.png",
    "https://file.hstatic.net/1000096703/file/quan-tay-nam_3715d72826ba46d49bcaf33bba6eb248.jpg",
    "https://file.hstatic.net/1000096703/file/z4486796638827_dbe44cd0d3d53f7cc90241eaf73d0a10_0c93b062c4c6430a8d80a80721e1a7b3.jpg",
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {productImages.map((image, index) => (
          <div key={index} className="col">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
