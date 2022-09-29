import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { HoverBannerOne } from "../components/Banner";
import { BlogPostSlider } from "../components/Blog";
import { CountdownTimerSix } from "../components/Countdown";
import { HeroSliderFive } from "../components/HeroSlider";
import { LayoutEight } from "../components/Layout";
import { ProductTabThree } from "../components/ProductTab";
import blogData from "../data/blog-posts/blog-post-one.json";
import heroSliderData from "../data/hero-sliders/hero-slider-five.json";
import { getRealProducts } from "../lib/product";

const Perfumes = ({ newProducts, popularProducts, saleProducts }) => {
  return (
    <LayoutEight>
      {/* hero slider with banner */}
      <div className="hero-slider-area space-mb--r100">
        <Container className="wide">
          <HeroSliderFive
            sliderData={heroSliderData}
            spaceBottomClass="space-mb--50"
          />

          {/* hover banner */}
          <HoverBannerOne spaceBottomClass="space-mb--r100" />
        </Container>
      </div>
      {/* countdown timer */}
      <div className="section-title-container">
        <Container>
          <Row className="space-mb--50">
            <Col xs={6}>
              <div className="section-title__label">
                <p>
                  SS-2020 <span className="line">84</span>
                </p>
              </div>
            </Col>
            <Col xs={6} className="text-right">
              <div className="section-title__label">
                <p>
                  INNOVATIVE <br /> DESIGN
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <CountdownTimerSix
        title="Deal of the day"
        image="/assets/images/esme-images/dashboard_4.png"
        dateTime="July 07, 2020 12:12:00"
        url="/shop/left-sidebar"
        buttonText="Only $39"
        spaceBottomClass="space-mb--r100"
      />

      {/* product tab */}
      <ProductTabThree
        newProducts={newProducts}
        popularProducts={popularProducts}
        saleProducts={saleProducts}
      />

      {/* blog post slider */}
      <BlogPostSlider blogData={blogData} spaceBottomClass="space-mb--r100" />
    </LayoutEight>
  );
};

const mapStateToProps = (state) => {
  const products = state.productData;
  return {
    newProducts: getRealProducts(products, "new", 10),
    popularProducts: getRealProducts(products, "popular", 10),
    saleProducts: getRealProducts(products, "sale", 10)
  };
};

export default connect(mapStateToProps)(Perfumes);
