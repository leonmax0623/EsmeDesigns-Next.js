import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  IoIosCart, IoIosHeartEmpty, IoIosMenu, IoIosSearch,
  IoMdPerson
} from "react-icons/io";
import { connect } from "react-redux";
import API from '../../api';
import { addBulkToCart, addToCart } from "../../redux/actions/cartActions";
import AboutOverlay from "./elements/AboutOverlay";
import CartOverlay from "./elements/CartOverlay";
import MobileMenu from "./elements/MobileMenu";
import Navigation from "./elements/Navigation";
import SearchOverlay from "./elements/SearchOverlay";
import WishlistOverlay from "./elements/WishlistOverlay";

const HeaderSix = ({ aboutOverlay, cartItems, wishlistItems, addToCart, addBulkToCart }) => {
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

  useMemo(() => {
    const tokenInStorage = localStorage.getItem('accessToken')
    if (tokenInStorage) {

      const formData = {
        "feaMethod": "getOrder",
        "accessToken": tokenInStorage,
        "orderId": -1
      }

      API.post('/', new URLSearchParams(formData))
        .then(response => {
          if (response.data.errorCode === "0") {
            console.log("==========HEADER=========", response)
            response.data.items.map((item, i) => {
              const formData = {
                "feaMethod": "getProduct",
                "accessToken": tokenInStorage,
                "productId": item.productId,
                "productTypeId": item.productTypeId
              }

              let totalItems = 0;
              item.sizes.map((size, i) => {
                totalItems += parseInt(size.quantity);
              })

              let extraPrice = 0;

              API.post('/', new URLSearchParams(formData))
                .then(res => {
                  console.log("==========Product========", res.data)
                  localStorage.setItem("OrderId", response.data.ordersId)

                  const alterationSelected = [];
                  res.data.styleAlterations.map((single, i) => {
                    item.styleAlterations.map((each, j) => {
                      if (single.styleAlterationId === each.styleAlterationId) {
                        let array = {
                          label: '',
                          value: '',
                          price: "",
                          id: ''
                        };
                        array.label = single.styleAlterationName + ' ' + `($${single.price})`;
                        array.value = single.styleAlterationId;
                        array.price = single.price;
                        array.id = single.styleAlterationId;
                        alterationSelected.push(array)
                      }
                    })
                  });

                  const styleOptionSelected = [];
                  res.data.styleOptions.map((single, i) => {
                    item.styleOptions.map((each, j) => {
                      if (single.styleOptionId === each.styleOptionId) {
                        let array = {
                          label: "",
                          value: "",
                          price: "",
                          id: ''
                        };
                        array.label = single.styleOptionName + ' ' + `($${single.price})`;
                        array.value = single.styleOptionId;
                        array.price = single.price;
                        array.id = single.styleOptionId;
                        styleOptionSelected.push(array)
                      }
                    })
                  });

                  console.log("-------alterationOptions---------", alterationSelected)
                  console.log("-------styleOptions---------", styleOptionSelected)

                  item.styleAlterations.map((style, i) => {
                    let tempPrice = res.data.styleAlterations.filter(temp => style.styleAlterationId === temp.styleAlterationId)
                    extraPrice += parseInt(tempPrice[0].price);
                  })

                  item.styleOptions.map((style, i) => {
                    let tempPrice = res.data.styleOptions.filter(temp => style.styleOptionId === temp.styleOptionId)
                    extraPrice += parseInt(tempPrice[0].price);
                  })

                  let nothing = null;

                  const existedProduct = cartItems.filter((cart, i) => cart.itemsId === item.itemsId)

                  let comboArray = [];

                  item.combos.map((combo, i) => {
                    // console.log("<<===BugFinding===>>", res.data.combos.filter(x => x.combosId === combo.combosId)[0].fabric[0].fabricsColor.filter(g => g.fabricsColorId === combo.combosfabricsColorId)[0].fabricsColorRGB)

                    let tempComboObject = {
                      combo: res.data.combos.filter(x => x.combosId === combo.combosId)[0].combosName,
                      comboId: combo.combosId,
                      fabric: {
                        fabric_index: 0,
                        fabric_name: combo.combosFabricsName,
                        fabric_id: combo.combosfabricsId,
                        color: {
                          color_name: combo.combosFabricsColorName,
                          color_id: combo.combosfabricsColorId,
                          rgb: res.data.combos.filter(x => x.combosId === combo.combosId)[0].fabric[0].fabricsColor.filter(g => g.fabricsColorId === combo.combosfabricsColorId)[0].fabricsColorRGB
                        }
                      }
                    }
                    comboArray = [...comboArray, tempComboObject]
                  })

                  let selectedAttr = [];
                  item.styleAttributes.map((attr, i) => {
                    let tempAttrArray = {
                      attr: attr.styleAttrybutesName,
                      attrId: attr.styleAttrybutesId,
                      value: attr.styleAttrybutesValueName,
                      valueId: attr.styleAttrybutesValueId
                    }
                    selectedAttr = [...selectedAttr, tempAttrArray]
                  })

                  if (!existedProduct.length > 0) {
                    if (item.sizes.length > 1) {
                      const selectedFabrics = item.selfFabricsId;
                      const selectedFabricsColor = item.selfFabricsColorName;
                      const selectedFabricsColorId = item.selfFabricsColorId;
                      const selectedLining = item.liningFabricsId;
                      const selectedLiningFabricsColor = item.liningFabricsColorName;
                      const selectedLiningFabricsColorId = item.liningFabricsColorId;
                      const selectedSizeCategory = item.sizeCategoryName;
                      const selectedSizeCategoryId = item.sizeCategoryId;
                      const wearDate = item.wearDate;
                      const shipDate = item.estimatedShipDate;
                      const selectedRushOption = res.data.rushOptions.filter((temp, i) => temp.rushId === item.rushId);
                      const tempItemsId = item.itemsId;
                      const tempOrdersId = response.data.ordersId;
                      let totalBulkQuantity = 0;

                      const regularSizeArray = JSON.stringify(res.data.sizeCategories.map((each) => {

                        const sizes = each.sizes.map((eachSize) => {
                          if (each.sizeCategoryId === item.sizeCategoryId) {
                            let tempSizeCode = 0;

                            item.sizes.map((value, i) => {
                              if (value.sizeId === eachSize.sizeId) {
                                tempSizeCode = value.quantity
                                totalBulkQuantity += parseInt(value.quantity)
                              }
                            })
                            return {
                              sizeId: eachSize.sizeId,
                              price: eachSize.price,
                              sizeCode: tempSizeCode,
                              sizeName: eachSize.sizeName
                            }
                          } else {
                            return {
                              sizeId: eachSize.sizeId,
                              price: eachSize.price,
                              sizeCode: 0,
                              sizeName: eachSize.sizeName
                            }
                          }
                        })
                        each.sizes = sizes
                        return each
                      }))

                      totalItems = totalBulkQuantity

                      console.log("totalBulkQuantity===>", totalBulkQuantity)

                      addBulkToCart({
                        bulkProduct: res.data,
                        nothing,
                        selectedFabrics,
                        selectedFabricsColor,
                        selectedFabricsColorId,
                        selectedLining,
                        selectedLiningFabricsColor,
                        selectedLiningFabricsColorId,
                        comboArray,
                        selectedAttr,
                        selectedSizeCategory,
                        selectedSizeCategoryId,
                        regularSizeArray,
                        alterationSelected,
                        styleOptionSelected,
                        totalItems,
                        extraPrice,
                        wearDate,
                        shipDate,
                        selectedRushOption,
                        tempItemsId,
                        tempOrdersId
                      })
                    } else {
                      addToCart(
                        res.data,
                        nothing,
                        totalItems,
                        item.selfFabricsId,
                        item.selfFabricsColorName,
                        item.selfFabricsColorId,
                        item.liningFabricsId,
                        item.liningFabricsColorName,
                        item.liningFabricsColorId,
                        comboArray,
                        selectedAttr,
                        item.sizeCategoryName,
                        item.sizeCategoryId,
                        item.sizes[0].sizeName,
                        item.sizes[0].sizeId,
                        alterationSelected,
                        styleOptionSelected,
                        extraPrice,
                        item.wearDate,
                        item.estimatedShipDate,
                        res.data.rushOptions.filter((temp, i) => temp.rushId === item.rushId),
                        item.itemsId,
                        response.data.ordersId
                      )
                    }
                  }
                })
                .catch(err => {
                  console.log("ERR", err)
                })
            })


          } else {
            // addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  }, [])


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
                    <span>English</span>{' '}
                    {/* <IoIosArrowDown />
                    <ul>
                      <li>
                        <button>English</button>
                      </li>
                      <li>
                        <button>Deustch</button>
                      </li>
                    </ul> */}
                  </div>
                  <span className="header-separator">|</span>
                  <div className="currency-change change-dropdown">
                    <span>USD</span>{' '}
                    {/* <IoIosArrowDown />
                    <ul>
                      <li>
                        <button>USD</button>
                      </li>
                      <li>
                        <button>EUR</button>
                      </li>
                    </ul> */}
                  </div>
                </div>
              </Col>
              <Col xs={6} lg={4} className="text-left text-lg-center">
                {/* logo */}
                <div className="header-content__logo">
                  <Link href="/" as={"/"}>
                    <a>
                      <img
                        src={"/assets/images/esme-logo.svg"}
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
                        as={"/other/login"}
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
                        as={"/other/wishlist"}
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
                        as={"/other/cart"}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addBulkToCart: (data) => {
      dispatch(
        addBulkToCart(data)
      );
    },
    addToCart: (
      product,
      addToast,
      quantityCount,
      selectedFabrics,
      selectedFabricsColor,
      selectedFabricsColorId,
      selectedLining,
      selectedLiningFabricsColor,
      selectedLiningFabricsColorId,
      comboArray,
      selectedAttr,
      selectedSizeCategory,
      selectedSizeCategoryId,
      selectedCategorySizeValue,
      selectedCategorySizeValueId,
      alterationSelected,
      styleOptionSelected,
      extraPrice,
      wearDate,
      shipDate,
      selectedRushOption,
      itemsId,
      ordersId
    ) => {
      dispatch(
        addToCart(
          product,
          addToast,
          quantityCount,
          selectedFabrics,
          selectedFabricsColor,
          selectedFabricsColorId,
          selectedLining,
          selectedLiningFabricsColor,
          selectedLiningFabricsColorId,
          comboArray,
          selectedAttr,
          selectedSizeCategory,
          selectedSizeCategoryId,
          selectedCategorySizeValue,
          selectedCategorySizeValueId,
          alterationSelected,
          styleOptionSelected,
          extraPrice,
          wearDate,
          shipDate,
          selectedRushOption,
          itemsId,
          ordersId
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSix);
