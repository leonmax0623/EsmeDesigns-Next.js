import Link from "next/link";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdCart } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import API from '../../api';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { BulkProduct } from "../../components/BulkProduct";
import { LayoutTwo } from "../../components/Layout";
import { addBulkToCart, addToCart, cloneBulkOrder, decreaseQuantity, deleteAllFromCart, deleteFromCart } from "../../redux/actions/cartActions";

const Cart = ({
  cartItems,
  addBulkToCart,
  bulkProduct,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
  cloneBulkOrder
}) => {
  const { addToast } = useToasts();
  let mainPrice = 0;
  let extraPayPrice = 0;
  let totalAmount = 0;
  cartItems.map((item, i) => {
    mainPrice += item.totalItems ? item.totalItems * parseInt(item.mainPrice) : item.quantity * parseInt(item.mainPrice)
    extraPayPrice += parseInt(item.extraPrice);
    totalAmount += item.totalItems ? item.totalItems : item.quantity
  })

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  const disallowRush = (val) => {
    if (val) {
      addToast("Sorry, you cannot add the item to the cart because 'Wear Date' is earlier than 'Estimated Ship Date'", { appearance: "error", autoDismiss: true });
    } else {
      addToast("Now you can add the product to your cart!", { appearance: "success", autoDismiss: true });
    }
  }

  const handleDeleteAllProducts = () => {

    if (localStorage.getItem("OrderId") && localStorage.getItem("OrderId") !== "") {
      let parameters = {
        "ordersId": localStorage.getItem("OrderId"),
      }

      const tokenInStorage = localStorage.getItem('accessToken')

      const formData = {
        "feaMethod": "deleteOrder",
        "accessToken": tokenInStorage,
        "parameters": JSON.stringify(parameters)
      }

      API.post('/', new URLSearchParams(formData))
        .then(response => {
          if (response.data.errorCode === "0") {
            addToast("Order was successfully removed!", { appearance: "success", autoDismiss: true });
            // Router.push('/other/cart');
            deleteAllFromCart(addToast)
            localStorage.removeItem("OrderId")
          } else {
            addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
          }
        })
        .catch(error => {
          console.log('error', error);
        });

    } else {
      addToast("Please Order the products and add to cart!", { appearance: "error", autoDismiss: true });
    }
  }

  console.log("mainPrice,mainPrice,mainPrice", mainPrice)

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

          <li>Cart</li>
        </ul>
      </BreadcrumbOne>

      {/* cart content */}
      <div className="cart-content space-mt--r100 space-mb--r100">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <div className="cart-table">
                  {cartItems && cartItems.map((order, i) => {
                    return (
                      <BulkProduct bulkProductProps={[order]} deleteFromCart={deleteFromCart} addBulkToCart={addBulkToCart} addToCart={addToCart} addToast={addToast} disallowRush={disallowRush} cloneOrder={cloneBulkOrder} cartItems={cartItems}></BulkProduct>
                    )
                  })}
                </div>
              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={7} className="space-mb-mobile-only--30">
                      <div className="lezada-form coupon-form">
                        <form>
                          <Row>
                            <Col md={7}>
                              <input
                                type="text"
                                placeholder="Enter your coupon code"
                              />
                            </Col>
                            <Col md={5}>
                              <button className="lezada-button lezada-button--medium">
                                apply coupon
                              </button>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </Col>
                    <Col lg={5} className="text-left text-lg-right">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={handleDeleteAllProducts}
                      >
                        clear cart
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
                        <th>MAIN COST</th>
                        <td className="subtotal">
                          ${mainPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>EXTRA COST</th>
                        <td className="subtotal">
                          ${(extraPayPrice).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <th>QUANTITY</th>
                        <td className="subtotal">
                          {totalAmount}
                        </td>
                      </tr>
                      <tr>
                        <th>TOTAL</th>
                        <td className="total">${(parseInt(extraPayPrice) + parseInt(mainPrice)).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cart-calculation-button text-center">
                    <Link
                      href="/other/checkout"
                      as={"/other/checkout"}
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
                      href="/shop/left-sidebar/All bridesmaid"
                      as={"/shop/left-sidebar/All bridesmaid"}
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
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
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
      item,
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
      extraCost,
      wearDate,
      shipDate,
      selectedRushOption,
      itemsId,
      ordersId,
      price
    ) => {
      dispatch(addToCart(
        item,
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
        extraCost,
        wearDate,
        shipDate,
        selectedRushOption,
        itemsId,
        ordersId,
        price
      ));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
    cloneBulkOrder: (productId) => {
      dispatch(cloneBulkOrder(productId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
