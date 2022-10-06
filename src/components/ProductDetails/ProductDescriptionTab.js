import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const ProductDescriptionTab = ({ product }) => {
  const sizes = [{
    id: 1,
    description: "Bust",
    size_0: 33,
    size_2: 34,
    size_4: 35,
    size_6: 36,
    size_8: 37,
    size_10: 38,
    size_12: "39 1/2",
    size_14: 41,
    size_16: "42 1/2",
    size_18: 44,
    size_20: 46,
    size_22: 49,
    size_24: 52,
    size_26: 56,
    size_28: 60,
    size_30: 64,
    size_32: 68
  },
  {
    id: 2,
    description: "Waist",
    size_0: 25,
    size_2: 26,
    size_4: 27,
    size_6: 28,
    size_8: 29,
    size_10: 30,
    size_12: "31 1/2",
    size_14: 33,
    size_16: "34 1/2",
    size_18: 37,
    size_20: 40,
    size_22: "42 1/2",
    size_24: "45 1/2",
    size_26: 49,
    size_28: "52 1/2",
    size_30: 56,
    size_32: "59 1/2"
  },
  {
    id: 3,
    description: 'Low Hip  8.5" Below Waistline',
    size_0: 37,
    size_2: 38,
    size_4: 39,
    size_6: 40,
    size_8: 41,
    size_10: 42,
    size_12: "43 1/2",
    size_14: 45,
    size_16: "46 1/2",
    size_18: 48,
    size_20: 50,
    size_22: 53,
    size_24: 56,
    size_26: 60,
    size_28: 64,
    size_30: 68,
    size_32: 72

  },
  {
    id: 4,
    description: 'Bodice Length (Hollow to Waist Seam)',
    size_0: "13 3/4",
    size_2: 14,
    size_4: "14 1/4",
    size_6: "14 1/2",
    size_8: "14 3/4",
    size_10: 15,
    size_12: "15 1/4",
    size_14: "15 1/2",
    size_16: "15 3/4",
    size_18: 16,
    size_20: "16 1/4",
    size_22: "16 1/2",
    size_24: "16 3/4",
    size_26: 17,
    size_28: "17 1/4",
    size_30: "17 1/2",
    size_32: "17 3/4"
  },
  {
    id: 5,
    description: 'Skirt length(Waist seam to Hem)',
    size_0: "45 1/2",
    size_2: "45 1/2",
    size_4: "45 1/2",
    size_6: "45 1/2",
    size_8: "45 1/2",
    size_10: "45 1/2",
    size_12: "45 1/2",
    size_14: "45 1/2",
    size_16: "45 1/2",
    size_18: "45 1/2",
    size_20: "45 1/2",
    size_22: "45 1/2",
    size_24: "45 1/2",
    size_26: "45 1/2",
    size_28: "45 1/2",
    size_30: "45 1/2",
    size_32: "45 1/2"
  },
  {
    id: 6,
    description: 'Dress Length (Hollow to Hem)',
    size_0: "59 1/4",
    size_2: "59 1/2",
    size_4: "59 3/4",
    size_6: 60,
    size_8: "60 1/4",
    size_10: "60 1/2",
    size_12: "60 3/4",
    size_14: 61,
    size_16: "61 1/4",
    size_18: "61 1/2",
    size_20: "61 3/4",
    size_22: 62,
    size_24: "62 1/4",
    size_26: "62 1/2",
    size_28: "62 3/4",
    size_30: 63,
    size_32: "63 1/4"
  }
  ]

  return (
    <div className="product-description-tab space-pt--r100 space-mt--r100 border-top--grey">
      <Tab.Container defaultActiveKey="description">
        <Nav
          variant="pills"
          className="product-description-tab__navigation text-center justify-content-center space-mb--50"
        >
          <Nav.Item>
            <Nav.Link eventKey="description">Description</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="additionalInfo">
              Size Chart
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">
              Reviews {product.ratingCount ? `(${product.ratingCount})` : ""}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="description">
            <div className="product-description-tab__details">
              {product.description}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="additionalInfo">
            <div className="product-description-tab__additional-info">
              <table className="shop-attributes">
                <tbody>
                  <tr>
                    <th>No</th>
                    <th>Description</th>
                    <th>0</th>
                    <th>2</th>
                    <th>4</th>
                    <th>6</th>
                    <th>8</th>
                    <th>10</th>
                    <th>12</th>
                    <th>14</th>
                    <th>16</th>
                    <th>18</th>
                  </tr>
                  {sizes.map((size, i) => {
                    return (
                      <tr key={i}>
                        <td>{size.id}</td>
                        <td>{size.description}</td>
                        <td>{size.size_0}</td>
                        <td>{size.size_2}</td>
                        <td>{size.size_4}</td>
                        <td>{size.size_6}</td>
                        <td>{size.size_8}</td>
                        <td>{size.size_10}</td>
                        <td>{size.size_12}</td>
                        <td>{size.size_14}</td>
                        <td>{size.size_16}</td>
                        <td>{size.size_18}</td>
                      </tr>
                    );
                  })
                  }
                </tbody>
              </table>
              <table className="shop-attributes" style={{ marginTop: "30px" }}>
                <tbody>
                  <tr>
                    <th>No</th>
                    <th>Description</th>
                    <th>18</th>
                    <th>20W</th>
                    <th>22W</th>
                    <th>24W</th>
                    <th>26W</th>
                    <th>28W</th>
                    <th>30W</th>
                    <th>32W</th>

                  </tr>
                  {sizes.map((size, i) => {
                    return (
                      <tr key={i}>
                        <td>{size.id}</td>
                        <td>{size.description}</td>
                        <td>{size.size_18}</td>
                        <td>{size.size_20}</td>
                        <td>{size.size_22}</td>
                        <td>{size.size_24}</td>
                        <td>{size.size_26}</td>
                        <td>{size.size_28}</td>
                        <td>{size.size_30}</td>
                        <td>{size.size_32}</td>
                      </tr>
                    );
                  })
                  }
                </tbody>
              </table>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="reviews">
            <div className="product-description-tab__review">
              <h2 className="review-title space-mb--20">
                {product.reviewsList ? product.reviewsList.length : ""} reviews on{" "}
                {product.productName}
              </h2>
              {/*=======  single review  =======*/}
              {product.reviewsList && product.reviewsList.map((review, i) => {
                return (
                  <div className="single-review">
                    <div className="single-review__image">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/assets/images/user/user1.jpeg"
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="single-review__content">
                      {/*=======  rating  =======*/}
                      <div className="single-review__rating">
                        {[...Array(parseInt(review.rating))].map((e, i) => <IoIosStar />)}
                        {parseInt(review.rating) < 5 && [...Array(5 - parseInt(review.rating))].map((e, i) => <IoIosStarOutline />)}
                      </div>

                      {/*=======  username and date  =======*/}
                      <p className="username">
                        {review.name}<span className="date">/ {review.date}</span>
                      </p>

                      {/*=======  message  =======*/}
                      <p className="message">
                        {review.text}
                      </p>
                      {/*=======  End of message  =======*/}
                    </div>
                  </div>
                )
              })}

              {/*=======  End of single review  =======*/}
              <h2 className="review-title space-mb--20">Add a review</h2>
              <p className="text-center">
                Your email address will not be published. Required fields are
                marked *
              </p>
              {/*=======  review form  =======*/}
              <div className="lezada-form lezada-form--review">
                <form>
                  <div className="row">
                    <div className="col-lg-6 space-mb--20">
                      <input type="text" placeholder="Name *" required />
                    </div>
                    <div className="col-lg-6 space-mb--20">
                      <input type="email" placeholder="Email *" required />
                    </div>
                    <div className="col-lg-12 space-mb--20">
                      <span className="rating-title space-mr--20">
                        YOUR RATING
                      </span>
                      <span className="product-rating">
                        <IoIosStarOutline />
                        <IoIosStarOutline />
                        <IoIosStarOutline />
                        <IoIosStarOutline />
                        <IoIosStarOutline />
                      </span>
                    </div>
                    <div className="col-lg-12 space-mb--20">
                      <textarea
                        cols={30}
                        rows={10}
                        placeholder="Your review *"
                        defaultValue={""}
                      />
                    </div>
                    <div className="col-lg-12 text-center">
                      <button
                        type="submit"
                        className="lezada-button lezada-button--medium"
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/*=======  End of review form  =======*/}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProductDescriptionTab;
