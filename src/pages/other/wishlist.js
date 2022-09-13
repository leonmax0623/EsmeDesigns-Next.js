import Link from "next/link";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoIosClose, IoIosHeartEmpty } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist, deleteAllFromWishlist, deleteFromWishlist
} from "../../redux/actions/wishlistActions";

const Wishlist = ({
  wishlistItems,
  cartItems,
  addToCart,
  deleteFromWishlist,
  deleteAllFromWishlist
}) => {
  const { addToast } = useToasts();

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Wishlist"
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Wishlist</li>
        </ul>
      </BreadcrumbOne>

      {/* wishlist content */}
      <div className="wishlist-content space-mt--r130 space-mb--r130">
        <Container>
          {wishlistItems && wishlistItems.length >= 1 ? (
            <Row>
              <Col lg={12}>
                {/* cart table */}
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th className="product-name" colSpan="2">
                        Product
                      </th>
                      <th className="product-price">Price</th>
                      <th className="product-subtotal">&nbsp;</th>
                      <th className="product-remove">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((product, i) => {
                      const cartItem = cartItems.filter(
                        (item) => item.productId === product.productId
                      )[0];

                      return (
                        <tr key={i}>
                          <td className="product-thumbnail">
                            <Link
                              href={`/shop/product-basic/[slug]?slug=${product.productName}`}
                              as={
                                process.env.PUBLIC_URL + "/shop/product-basic/" + product.productName
                              }
                            >
                              <a>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    product.pictures[0].url
                                  }
                                  className="img-fluid"
                                  alt=""
                                />
                              </a>
                            </Link>
                          </td>
                          <td className="product-name">
                            <Link
                              href={`/shop/product-basic/[slug]?slug=${product.productName}`}
                              as={
                                process.env.PUBLIC_URL + "/shop/product-basic/" + product.productName
                              }
                            >
                              <a>{product.productName}</a>
                            </Link>
                            {product.selectedProductColor &&
                              product.selectedProductSize ? (
                              <div className="product-variation">
                                <span>
                                  Color: {product.selectedProductColor}
                                </span>
                                <span>Size: {product.selectedProductSize}</span>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>

                          <td className="product-price">
                            <span className="price">${parseInt(product.discountedPrice)}</span>
                          </td>

                          <td>
                            {product.fabrics && (
                              <>
                                <Link
                                  href={`/shop/product-basic/[slug]?slug=${product.productName}`}
                                  as={
                                    process.env.PUBLIC_URL + "/shop/product-basic/" + product.productName
                                  }
                                >
                                  <a className="lezada-button lezada-button--medium">
                                    Select option
                                  </a>
                                </Link>
                                <button
                                  onClick={() => addToCart(product, addToast)}
                                  style={{ marginLeft: "20px" }}
                                  className={` lezada-button lezada-button--medium ${cartItem !== undefined &&
                                    cartItem.quantity > 0
                                    ? "active"
                                    : ""
                                    } `}
                                  disabled={
                                    cartItem !== undefined &&
                                    cartItem.quantity > 0
                                  }
                                  title={
                                    product !== undefined
                                      ? "Added to cart"
                                      : "Add to cart"
                                  }
                                >
                                  {cartItem !== undefined && cartItem.quantity > 0
                                    ? "Added"
                                    : "Add to cart"}
                                </button>
                              </>
                            )
                            }
                          </td>

                          <td className="product-remove">
                            <button
                              onClick={() =>
                                deleteFromWishlist(product, addToast)
                              }
                            >
                              <IoIosClose />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={12} className="space-mb--r100">
                <div className="cart-coupon-area space-pt--30 space-pb--30">
                  <Row className="align-items-center">
                    <Col lg={5} className="text-left text-lg-right ml-auto">
                      <button
                        className="lezada-button lezada-button--medium"
                        onClick={() => deleteAllFromWishlist(addToast)}
                      >
                        clear wishlist
                      </button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoIosHeartEmpty />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">No items found in wishlist</p>
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
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    wishlistItems: state.wishlistData,
    cartItems: state.cartData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    deleteAllFromWishlist: (addToast) => {
      dispatch(deleteAllFromWishlist(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
