export const Carousel = () => {
  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Top Songs</h3>
        <div
          id="carouselControls"
          className="carousel carousel-dark slide mt-5
                d-none d-lg-block"
          data-bs-interval="false"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
                  <div className="text-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
