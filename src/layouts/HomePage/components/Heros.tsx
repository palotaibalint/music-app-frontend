export const Heros = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>What have you been listening to?</h1>
              <p className="lead">
                You can customize your own playlist and even make your own
                reviews.
              </p>
              <a className="btn main-color btn-lg text-dark" href="#">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1>Our music collection is always improving!</h1>
              <p className="lead">
                Check in daily to see the newest reviews and new music.
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>
      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1>What have you been listening to?</h1>
              <p className="lead">
                You can customize your own playlist and even make your own
                reviews.
              </p>
              <a className="btn main-color btn-lg text-text-dark" href="#">
                Sign up
              </a>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1>What have you been listening to?</h1>
              <p className="lead">
                You can customize your own playlist and even make your own
                reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
