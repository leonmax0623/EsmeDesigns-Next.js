import Router from 'next/router';
import { Col, Container, Row } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { useToasts } from "react-toast-notifications";
import { getUserCheckResult } from "../../redux/actions/userCheckActions";

const HeroSliderFive = ({ sliderData, spaceBottomClass }) => {
  const { addToast } = useToasts();

  const shopNow = async () => {
    if (localStorage.getItem('accessToken')) {
      const response = await getUserCheckResult();
      if (response.data.errorText === 'accessToken expired') {
        addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
        Router.push('/other/login');
      } else {
        // Router.push('/shop/left-sidebar');
      }
    } else {
      addToast("Please log in!", { appearance: "error", autoDismiss: true });
      Router.push('/other/login');
    }
  }

  const params = {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    effect: "fade",
    watchSlidesVisibility: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav"></button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav"></button>
    )
  };
  return (
    <div
      className={`hero-slider-five ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <Container className="wide">
        <div className="hero-slider-five__wrapper">
          <Swiper {...params}>
            {sliderData &&
              sliderData.map((single, i) => {
                return (
                  <div
                    className="hero-slider-five__slide bg-img"
                    style={{ backgroundImage: `url(${single.bgImage})` }}
                    key={i}
                  >
                    <Container className="h-100">
                      <Row className="align-items-center flex-column flex-lg-row justify-content-center justify-content-lg-start h-100">
                        <Col lg={6} className="order-2 order-lg-1">
                          <div className="hero-slider-five__content">
                            <h5 className="sub-title">{single.subtitle}</h5>
                            <h1
                              className="title"
                              dangerouslySetInnerHTML={{ __html: single.title }}
                            />
                            <div className="slider-link">

                              <a className="lezada-button lezada-button--medium" onClick={shopNow}>
                                shop now
                              </a>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                );
              })}
          </Swiper>
        </div>
      </Container>
    </div>
  );
};

export default HeroSliderFive;
