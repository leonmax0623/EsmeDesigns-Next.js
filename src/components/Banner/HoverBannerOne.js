import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

const HoverBannerOne = ({ spaceBottomClass }) => {
  return (
    <div
      className={`hover-banner-area ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <Container className="wide">
        <Row className="space-mb--m30">
          <Col md={4} className="space-mb--30">
            <div className="single-category single-category--three">
              <div className="single-category__image single-category__image--three single-category__image--three--creativehome single-category__image--three--banner">
                <img
                  src={
                    "/assets/images/esme-images/dashboard_1.png"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="single-category__content single-category__content--three single-category__content--three--creativehome  single-category__content--three--banner space-mt--25 space-mb--25">
                <div className="title">
                  <p>
                    <Link
                      href="/shop/left-sidebar"
                      as={"/shop/left-sidebar"}
                    >
                      <a>
                        Wooden <span>Chair</span>
                      </a>
                    </Link>
                  </p>
                  <Link
                    href="/shop/left-sidebar"
                    as={"/shop/left-sidebar"}
                  >
                    <a>Shop Now</a>
                  </Link>
                </div>
              </div>
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
          <Col md={4} className="space-mb--30">
            <div className="single-category single-category--three">
              <div className="single-category__image single-category__image--three single-category__image--three--creativehome single-category__image--three--banner">
                <img
                  src={

                    "/assets/images/esme-images/dashboard_2.png"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="single-category__content single-category__content--three single-category__content--three--creativehome  single-category__content--three--banner space-mt--25 space-mb--25">
                <div className="title">
                  <p>
                    <Link
                      href="/shop/left-sidebar"
                      as={"/shop/left-sidebar"}
                    >
                      <a>
                        Thumbler <span>Alarm Clock</span>
                      </a>
                    </Link>
                  </p>
                  <Link
                    href="/shop/left-sidebar"
                    as={"/shop/left-sidebar"}
                  >
                    <a>Shop Now</a>
                  </Link>
                </div>
              </div>
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
          <Col md={4} className="space-mb--30">
            <div className="single-category single-category--three">
              <div className="single-category__image single-category__image--three single-category__image--three--creativehome single-category__image--three--banner">
                <img
                  src={

                    "/assets/images/esme-images/dashboard_3.png"
                  }
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="single-category__content single-category__content--three single-category__content--three--creativehome  single-category__content--three--banner space-mt--25 space-mb--25">
                <div className="title">
                  <p>
                    <Link
                      href="/shop/left-sidebar"
                      as={"/shop/left-sidebar"}
                    >
                      <a>
                        Home <span>Decoration</span>
                      </a>
                    </Link>
                  </p>
                  <Link
                    href="/shop/left-sidebar"
                    as={"/shop/left-sidebar"}
                  >
                    <a>Shop Now</a>
                  </Link>
                </div>
              </div>
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a className="banner-link" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HoverBannerOne;
