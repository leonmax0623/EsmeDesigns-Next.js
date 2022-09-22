import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  IoIosArrowDown, IoIosCart, IoIosHeartEmpty, IoIosMenu, IoIosSearch,
  IoMdPerson
} from "react-icons/io";
import { connect } from "react-redux";
import AboutOverlay from "./elements/AboutOverlay";
import CartOverlay from "./elements/CartOverlay";
import MobileMenu from "./elements/MobileMenu";
import Navigation from "./elements/Navigation";
import SearchOverlay from "./elements/SearchOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";

const HeaderSix = ({ aboutOverlay, cartItems, wishlistItems }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasAboutActive, setOffCanvasAboutActive] = useState(false);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasCartActive, setOffCanvasCartActive] = useState(false);
  const [offCanvasWishlistActive, setOffCanvasWishlistActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );

  let totalOrders = 0

  cartItems.map((item, i) => {
    if (item.quantity || item.totalItems) {
      totalOrders += item.totalItems ? item.totalItems : item.quantity
    }
  })

  useEffect(() => {
    cartItems.map((item, i) => {
      if (item.quantity || item.totalItems) {
        totalOrders += item.totalItems ? item.totalItems : item.quantity
      }
    })
  }, [cartItems])

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      <header
        className={`topbar-shadow ${scroll > headerTop ? "is-sticky" : ""}`}
      >
        <div className="multilevel-header">
          <Container>
            <Row className="multilevel-header__top" style={{ alignItems: "center" }}>
              <Col lg={4} className="d-none d-lg-block">
                <div className="d-flex">
                  <div className="language-change change-dropdown">
                    <span>English</span> <IoIosArrowDown />
                    <ul>
                      <li>
                        <button>English</button>
                      </li>
                      <li>
                        <button>Deustch</button>
                      </li>
                    </ul>
                  </div>
                  <span className="header-separator">|</span>
                  <div className="currency-change change-dropdown">
                    <span>USD</span> <IoIosArrowDown />
                    <ul>
                      <li>
                        <button>USD</button>
                      </li>
                      <li>
                        <button>EUR</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col xs={6} lg={4} className="text-left text-lg-center">
                {/* logo */}
                <div className="header-content__logo">
                  <Link href="/" as={process.env.PUBLIC_URL + "/"}>
                    <a>
                      <img
                        src={process.env.PUBLIC_URL + "/assets/images/esme-logo.svg"}
                        className="img-fluid"
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
              </Col>
              <Col xs={6} lg={4} className="text-right" style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
                <div className="header-content__icons">
                  <ul className="d-none d-lg-block">
                    <li>
                      <button
                        onClick={() => {
                          setOffCanvasSearchActive(true);
                          document
                            .querySelector("body")
                            .classList.add("overflow-hidden");
                        }}
                      >
                        <IoIosSearch />
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/other/login"
                        as={process.env.PUBLIC_URL + "/other/login"}
                      >
                        <a>
                          <IoMdPerson />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOffCanvasWishlistActive(true);
                          document
                            .querySelector("body")
                            .classList.add("overflow-hidden");
                        }}
                      >
                        <IoIosHeartEmpty />
                        {wishlistItems.length >= 1 ? (
                          <span className="count">
                            {wishlistItems.length ? wishlistItems.length : ""}
                          </span>
                        ) : (
                          ""
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setOffCanvasCartActive(true);
                          document
                            .querySelector("body")
                            .classList.add("overflow-hidden");
                        }}
                      >
                        <IoIosCart />
                        {totalOrders > 0 && (
                          <span className="count">
                            {totalOrders}
                          </span>
                        )}
                      </button>
                    </li>
                  </ul>

                  <ul className="d-block d-lg-none">
                    <li>
                      <Link
                        href="/other/wishlist"
                        as={process.env.PUBLIC_URL + "/other/wishlist"}
                      >
                        <a>
                          <IoIosHeartEmpty />
                          {wishlistItems.length >= 1 ? (
                            <span className="count">
                              {wishlistItems.length ? wishlistItems.length : ""}
                            </span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/other/cart"
                        as={process.env.PUBLIC_URL + "/other/cart"}
                      >
                        <a>
                          <IoIosCart />
                          {totalOrders > 0 && (
                            <span className="count">
                              {totalOrders}
                            </span>
                          )}

                        </a>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setOffCanvasMobileMenuActive(true)}
                      >
                        <IoIosMenu />
                      </button>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row className="multilevel-header__bottom">
              <Col
                lg={12}
                className="text-center d-none d-lg-block"
              >
                {/* navigation */}
                <Navigation />
              </Col>
            </Row>
          </Container>
        </div>
      </header>

      {/* about overlay */}
      {aboutOverlay === false ? (
        ""
      ) : (
        <AboutOverlay
          activeStatus={offCanvasAboutActive}
          getActiveStatus={setOffCanvasAboutActive}
        />
      )}
      {/* search overlay */}
      <SearchOverlay
        activeStatus={offCanvasSearchActive}
        getActiveStatus={setOffCanvasSearchActive}
      />

      {/* cart overlay */}
      <CartOverlay
        activeStatus={offCanvasCartActive}
        getActiveStatus={setOffCanvasCartActive}
      />

      {/* wishlist overlay */}
      <WishlistOverlay
        activeStatus={offCanvasWishlistActive}
        getActiveStatus={setOffCanvasWishlistActive}
      />
      {/* Mobile Menu */}
      <MobileMenu
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData
  };
};

export default connect(mapStateToProps)(HeaderSix);
