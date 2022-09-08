import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdCart } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { BulkProduct } from "../../components/BulkProduct";
import { LayoutTwo } from "../../components/Layout";
import {
  addBulkToCart
} from "../../redux/actions/cartActions";

const Bulk = ({
  // cartItems,
  bulkProduct,
  // decreaseQuantity,
  addBulkToCart,
  // deleteFromCart,
  // deleteAllFromCart
}) => {

  const { addToast } = useToasts();
  let cartTotalPrice = 0;
  console.log("bulkProduct////////", bulkProduct)

  //custom 
  const [selectedLining, setSelectedLining] = useState("");
  const [selectedLiningFabricsColor, setSelectedLiningFabricsColor] = useState("");
  const [selectedFabrics, setSelectedFabrics] = useState("");
  const [selectedFabricsColor, setSelectedFabricsColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFirstComboFabrics, setSelectedFirstComboFabrics] = useState("");
  const [selectedSecondComboFabrics, setSelectedSecondComboFabrics] = useState("");
  const [selectedThirdComboFabrics, setSelectedThirdComboFabrics] = useState("");
  const [selectedForthComboFabrics, setSelectedForthComboFabrics] = useState("");
  const [selectedFirstComboFabricsColor, setSelectedFirstComboFabricsColor] = useState("");
  const [selectedSecondComboFabricsColor, setSelectedSecondComboFabricsColor] = useState("");
  const [selectedThirdComboFabricsColor, setSelectedThirdComboFabricsColor] = useState("");
  const [selectedForthComboFabricsColor, setSelectedForthComboFabricsColor] = useState("");
  const [alterationSelected, setAlterationSelected] = useState([]);
  const [styleOptionSelected, setStyleOptionSelected] = useState([]);
  const [selectedLengthAttribute, setSelectedLengthAttribute] = useState("");
  const [selectedMeshColorAttribute, setSelectedMeshColorAttribute] = useState("");
  const [selectedSlitAttribute, setSelectedSlitAttribute] = useState("");

  const [selectedFabric, setSelectedFabric] = useState({ combo: 0, fabric: 0, color: 0 });
  const [totalItems, setTotalItems] = useState(0);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState("Regular Size")

  const [selectedComboFabric, setSelectedComboFabric] = useState(
    bulkProduct[0] && bulkProduct[0].combos.map((combo, i) => {
      return { combo: i, fabric: 0, color: 0 }
    })
  );
  const [regularSizeArray, setRegularSizeArray] = useState(
    JSON.stringify(bulkProduct[0] && bulkProduct[0].sizeCategories.map((each) => {

      const sizes = each.sizes.map((eachSize) => {
        return {
          sizeCode: 0,
          sizeName: eachSize.sizeName
        }
      })
      each.sizes = sizes
      return each
    }))
  );

  useEffect(() => {
    if (bulkProduct[0]) {
      if (bulkProduct[0].lining) {
        setSelectedLining(bulkProduct[0].lining[0].fabricsName)
      }
      if (bulkProduct[0].lining) {
        setSelectedLiningFabricsColor(bulkProduct[0].lining[0].fabricsColors[0].fabricsColorName)
      }
      if (bulkProduct[0].fabrics) {
        setSelectedFabrics(bulkProduct[0].fabrics[0].fabricsName)
      }
      if (bulkProduct[0].fabrics) {
        setSelectedFabricsColor(bulkProduct[0].fabrics[0].fabricsColors[0].fabricsColorName)
      }
      if (bulkProduct[0].sizeCategories) {
        setSelectedSize(bulkProduct[0].sizeCategories[0].sizes[0].sizeName)
      }

      if (bulkProduct[0].combos) {
        if (bulkProduct[0].combos[0]) {
          setSelectedFirstComboFabrics(bulkProduct[0].combos[0].fabric[0].fabricsName)
          setSelectedFirstComboFabricsColor(bulkProduct[0].combos[0].fabric[0].fabricsColors[0].fabricsColorName)
        }
        if (bulkProduct[0].combos[1]) {
          setSelectedSecondComboFabrics(bulkProduct[0].combos[1].fabric[0].fabricsName)
          setSelectedSecondComboFabricsColor(bulkProduct[0].combos[1].fabric[0].fabricsColors[0].fabricsColorName)
        }
        if (bulkProduct[0].combos[2]) {
          setSelectedThirdComboFabrics(bulkProduct[0].combos[2].fabric[0].fabricsName)
          setSelectedThirdComboFabricsColor(bulkProduct[0].combos[2].fabric[0].fabricsColors[0].fabricsColorName)
        }
        if (bulkProduct[0].combos[3]) {
          setSelectedForthComboFabrics(bulkProduct[0].combos[3].fabric[0].fabricsName)
          setSelectedForthComboFabricsColor(ulkProduct[0].combos[3].fabric[0].fabricsColors[0].fabricsColorName)
        }
      }
      if (bulkProduct[0].styleAttributes) {
        if (bulkProduct[0].styleAttributes[0].styleAttrybutesName === "Length") {
          setSelectedLengthAttribute(bulkProduct[0].styleAttributes[0].styleAttrybutesValues[0].styleAttrybutesValueName)
        }
        if (bulkProduct[0].styleAttributes[1].styleAttrybutesName === "Mesh color") {
          setSelectedMeshColorAttribute(bulkProduct[0].styleAttributes[1].styleAttrybutesValues[0].styleAttrybutesValueName)
        }
        if (bulkProduct[0].styleAttributes[2].styleAttrybutesName === "Optional slit") {
          setSelectedSlitAttribute(bulkProduct[0].styleAttributes[2].styleAttrybutesValues[0].styleAttrybutesValueName)
        }
      }
    }
  }, [bulkProduct]);

  //custom
  const alterationOptions = [];
  bulkProduct[0] && bulkProduct[0].styleAlterations.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleAlterationName;
    array.value = single.price;
    alterationOptions.push(array)
  });

  const styleOptions = [];
  bulkProduct[0] && bulkProduct[0].styleOptions.map((single, i) => {
    let array = {
      label: "",
      value: ""
    };
    array.label = single.styleOptionName;
    array.value = single.price;
    styleOptions.push(array)
  });

  const setRegualrSizeArray = (e) => {

    // console.log(e.target.dataset.position)
    // console.log(e.target.value)
    let result = e.target.value;
    if (result === "") {
      result = 0;
    } else {
      const index = e.target.dataset.position.split('-')
      let sizeArray = JSON.parse(regularSizeArray)
      sizeArray[index[0]].sizes[index[1]].sizeCode = result.replace(/[^\d]/g, '');
      setRegularSizeArray(JSON.stringify(sizeArray))
      // console.log("Sizes", JSON.parse(regularSizeArray))
    }
  }

  const myTest = (
    bulkProduct,
    addToast,
    selectedFabrics,
    selectedFabricsColor,
    selectedLining,
    selectedLiningFabricsColor,
    selectedFirstComboFabrics,
    selectedSecondComboFabrics,
    selectedThirdComboFabrics,
    selectedForthComboFabrics,
    selectedFirstComboFabricsColor,
    selectedSecondComboFabricsColor,
    selectedThirdComboFabricsColor,
    selectedForthComboFabricsColor,
    selectedMeshColorAttribute,
    selectedLengthAttribute,
    selectedSlitAttribute,
    regularSizeArray,
    alterationSelected,
    styleOptionSelected,
    totalItems
  ) => {
    console.log("Cart bulkProduct", bulkProduct)
    console.log("Cart selectedFabrics", selectedFabrics)
    console.log("Cart selectedFabricsColor", selectedFabricsColor)
    console.log("Cart selectedLining", selectedLining)
    console.log("Cart selectedLiningFabricsColor", selectedLiningFabricsColor)
    console.log("Cart selectedFirstComboFabrics", selectedFirstComboFabrics)
    console.log("Cart selectedSecondComboFabrics", selectedSecondComboFabrics)
    console.log("Cart selectedFirstComboFabricsColor", selectedFirstComboFabricsColor)
    console.log("Cart selectedSecondComboFabricsColor", selectedSecondComboFabricsColor)
    console.log("Cart selectedMeshColorAttribute", selectedMeshColorAttribute)
    console.log("Cart selectedLengthAttribute", selectedLengthAttribute)
    console.log("Cart selectedSlitAttribute", selectedSlitAttribute)
    console.log("Cart regularSizeArray", regularSizeArray)
    console.log("Cart alterationSelected", alterationSelected)
    console.log("Cart styleOptionSelected", styleOptionSelected)
  }

  useEffect(() => {
    let sum = 0;
    JSON.parse(regularSizeArray).map((item) => {
      item.sizes.map((size) => {
        sum = sum + parseInt(size.sizeCode)
      })
    })

    console.log("Sum", sum)
    setTotalItems(sum)
  }, [regularSizeArray])

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Cart"
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Bulk Order</li>
        </ul>
      </BreadcrumbOne>

      {/* cart content */}
      <div className="cart-content space-mt--r130 space-mb--r130">
        <Container>
          {bulkProduct && bulkProduct.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <div className="cart-table">
                  <div style={{ borderBottom: "1px solid #ededed", display: "flex", padding: "10px", justifyContent: "end" }}>
                    <button
                      className="lezada-button lezada-button--medium"
                    >
                      add bulk order
                    </button>
                  </div>
                  <BulkProduct bulkProductProps={bulkProduct} addBulkToCart={addBulkToCart}></BulkProduct>
                </div>

              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={7} className="space-mb-mobile-only--30">

                    </Col>
                    <Col lg={5} className="text-left text-lg-right">
                      <button
                        className="lezada-button lezada-button--medium"
                      >
                        clear bulk order
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={5} className="ml-auto">
                <div className="cart-calculation-area">
                  <h2 className="space-mb--40">Cart totals</h2>
                  <table className="cart-calculation-table space-mb--40">
                    <tbody>
                      <tr>
                        <th>SUBTOTAL</th>
                        <td className="subtotal">
                          ${cartTotalPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>TOTAL</th>
                        <td className="total">${cartTotalPrice.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-calculation-button text-center">
                    <Link
                      href="/other/checkout"
                      as={process.env.PUBLIC_URL + "/other/checkout"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        proceed to checkout
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCart />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in cart</p>
                    <Link
                      href="/shop/left-sidebar"
                      as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                    >
                      <a className="lezada-button lezada-button--medium">
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div >
    </LayoutTwo >
  );
};

const mapStateToProps = (state) => {
  return {
    bulkProduct: state.bulkProductData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBulkToCart: (
      bulkProduct,
      addToast,
      selectedFabrics,
      selectedFabricsColor,
      selectedLining,
      selectedLiningFabricsColor,
      comboArray,
      selectedAttr,
      regularSizeArray,
      alterationSelected,
      styleOptionSelected,
      totalItems
    ) => {
      dispatch(
        addBulkToCart(
          bulkProduct,
          addToast,
          selectedFabrics,
          selectedFabricsColor,
          selectedLining,
          selectedLiningFabricsColor,
          comboArray,
          selectedAttr,
          regularSizeArray,
          alterationSelected,
          styleOptionSelected,
          totalItems
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bulk);
