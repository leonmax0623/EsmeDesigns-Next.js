import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import API from '../api';
import { HoverBannerOne } from "../components/Banner";
import { BlogPostSlider } from "../components/Blog";
import { CountdownTimerSix } from "../components/Countdown";
import { HeroSliderFive } from "../components/HeroSlider";
import { LayoutEight } from "../components/Layout";
// import { ProductTabThree } from "../components/ProductTab";
import blogData from "../data/blog-posts/blog-post-one.json";
import heroSliderData from "../data/hero-sliders/hero-slider-five.json";
import { getRealProducts } from "../lib/product";
import { addBulkToCart, addToCart } from "../redux/actions/cartActions";

const Perfumes = ({ newProducts, cartItems, addBulkToCart, addToCart, popularProducts, saleProducts }) => {
  const { addToast } = useToasts();

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
      {/* <ProductTabThree
        newProducts={newProducts}
        popularProducts={popularProducts}
        saleProducts={saleProducts}
      /> */}

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
    saleProducts: getRealProducts(products, "sale", 10),
    cartItems: state.cartData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Perfumes);
