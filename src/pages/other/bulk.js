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
  addBulkToCart, deleteAllFromCart, deleteFromCart
} from "../../redux/actions/cartActions";

const Bulk = ({
  cartItems,
  bulkProduct,
  // decreaseQuantity,
  addBulkToCart,
  deleteFromCart,
  deleteAllFromCart
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

  const handleAddBulkToCart = (
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
    totalItems,
    extraPrice,
    wearDate,
    shipDate,
    selectedRushOption
  ) => {
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
      totalItems,
      extraPrice,
      wearDate,
      shipDate,
      selectedRushOption
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
                    <BulkProduct bulkProductProps={newBulkProduct} addBulkToCart={handleAddBulkToCart} ></BulkProduct>
                  ) : ''}
                  {bulkOrders && bulkOrders.length > 0 ? bulkOrders.map((order, i) => {
                    return (
                      <BulkProduct bulkProductProps={[order]} deleteFromCart={deleteFromCart} addBulkToCart={addBulkToCart}></BulkProduct>
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
                        onClick={() => deleteAllFromCart(addToast)}
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
                          ${extraPayPrice.toFixed(2)}
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
                        <td className="total">${(extraPayPrice + mainPrice).toFixed(2)}</td>
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
      dispatch(
        addBulkToCart(data)
      );
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bulk);
