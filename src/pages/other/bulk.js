import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoMdCart } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import API from '../../api';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { BulkProduct } from "../../components/BulkProduct";
import { LayoutTwo } from "../../components/Layout";
import {
  addBulkToCart, cloneBulkOrder, deleteAllFromCart, deleteFromCart
} from "../../redux/actions/cartActions";

const Bulk = ({
  cartItems,
  bulkProduct,
  // decreaseQuantity,
  addBulkToCart,
  deleteFromCart,
  deleteAllFromCart,
  cloneBulkOrder
}) => {

  const { addToast } = useToasts();

  const bulkOrders = cartItems.filter((item, i) => item.totalItems !== undefined && bulkProduct[0].productId === item.productId).reverse();
  let mainPrice = 0;
  let extraPayPrice = 0;
  let totalAmount = 0;
  bulkOrders.map((item, i) => {
    mainPrice += item.totalItems ? item.totalItems * parseInt(item.discountedPrice) : item.quantity * parseInt(item.discountedPrice)
    extraPayPrice += item.extraPrice;
    totalAmount += item.totalItems
  })

  const [newBulkProduct, setNewBulkProduct] = useState(bulkProduct)
  const addNewBulkOrder = () => {
    setNewBulkProduct(bulkProduct)
  }
  // if (bulkOrders && bulkOrders.length == 0) setNewBulkProduct(bulkProduct)
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
    if (bulkOrders && bulkOrders.length == 0) setNewBulkProduct(bulkProduct)
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

  const handleAddBulkToCart = (
    bulkProduct,
    addToast,
    selectedFabrics,
    selectedFabricsColor,
    selectedFabricsColorId,
    selectedLining,
    selectedLiningFabricsColor,
    selectedLiningFabricsColorId,
    comboArray,
    selectedAttr,
    regularSizeArray,
    alterationSelected,
    styleOptionSelected,
    totalItems,
    extraPrice,
    wearDate,
    shipDate,
    selectedRushOption,
    itemsId,
    ordersId
  ) => {
    console.log("РАДа", itemsId)
    console.log("РАДа", ordersId)
    addBulkToCart(
      bulkProduct,
      addToast,
      selectedFabrics,
      selectedFabricsColor,
      selectedFabricsColorId,
      selectedLining,
      selectedLiningFabricsColor,
      selectedLiningFabricsColorId,
      comboArray,
      selectedAttr,
      regularSizeArray,
      alterationSelected,
      styleOptionSelected,
      totalItems,
      extraPrice,
      wearDate,
      shipDate,
      selectedRushOption,
      itemsId,
      ordersId
    )
    setNewBulkProduct([])
  }

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
                      onClick={() => addNewBulkOrder()}
                    >
                      add bulk order
                    </button>
                  </div>
                  {newBulkProduct && newBulkProduct.length >= 1 ? (
                    <BulkProduct bulkProductProps={newBulkProduct} addBulkToCart={handleAddBulkToCart} addToast={addToast} disallowRush={disallowRush} cloneOrder={cloneBulkOrder} cartItems={cartItems}></BulkProduct>
                  ) : ''}
                  {bulkOrders && bulkOrders.length > 0 ? bulkOrders.map((order, i) => {
                    return (
                      <BulkProduct bulkProductProps={[order]} deleteFromCart={deleteFromCart} addBulkToCart={addBulkToCart} addToast={addToast} disallowRush={disallowRush} cloneOrder={cloneBulkOrder} cartItems={cartItems}></BulkProduct>
                    )
                  }) : ''}
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
                        onClick={handleDeleteAllProducts}
                      >
                        clear bulk order
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={5} className="ml-auto">
                <div className="cart-calculation-area">
                  <h2 className="space-mb--40">Bulk totals</h2>
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
                          ${(extraPayPrice * totalAmount).toFixed(2)}
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
                        <td className="total">${(extraPayPrice * totalAmount + mainPrice).toFixed(2)}</td>
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
    bulkProduct: state.bulkProductData,
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBulkToCart: (data) => {
      console.log("ЛООО", data)
      dispatch(
        addBulkToCart(data)
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(Bulk);
