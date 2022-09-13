import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdCash } from "react-icons/io";
import { connect } from "react-redux";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";

const Checkout = ({ cartItems }) => {
  let cartTotalPrice = 0;
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Checkout"
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Checkout</li>
        </ul>
      </BreadcrumbOne>
      <div className="checkout-area space-mt--r130 space-mb--r130">
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col>
                <div className="lezada-form">
                  <form className="checkout-form">
                    <div className="row row-40">
                      <div className="col-lg-7 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">Billing Address</h4>
                          <div className="row">
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>First Name*</label>
                              <input type="text" placeholder="First Name" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Last Name*</label>
                              <input type="text" placeholder="Last Name" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Email Address*</label>
                              <input type="email" placeholder="Email Address" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Phone no*</label>
                              <input type="text" placeholder="Phone number" />
                            </div>
                            <div className="col-12 space-mb--20">
                              <label>Company Name</label>
                              <input type="text" placeholder="Company Name" />
                            </div>
                            <div className="col-12 space-mb--20">
                              <label>Address*</label>
                              <input type="text" placeholder="Address line 1" />
                              <input type="text" placeholder="Address line 2" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Country*</label>
                              <select>
                                <option>Bangladesh</option>
                                <option>China</option>
                                <option>Australia</option>
                                <option>India</option>
                                <option>Japan</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Town/City*</label>
                              <input type="text" placeholder="Town/City" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>State*</label>
                              <input type="text" placeholder="State" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Zip Code*</label>
                              <input type="text" placeholder="Zip Code" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          {/* Cart Total */}
                          <div className="col-12 space-mb--50">
                            <h4 className="checkout-title">Cart Total</h4>
                            <div className="checkout-cart-total">
                              <h4>
                                Product <span>Total</span>
                              </h4>
                              <ul>
                                {cartItems.map((product, i) => {
                                  product.totalItems ? cartTotalPrice +=
                                    parseInt(product.discountedPrice) * product.totalItems :
                                    cartTotalPrice +=
                                    parseInt(product.discountedPrice) * product.quantity;
                                  return (
                                    <li key={i}>
                                      {product.productName} X {product.totalItems ? product.totalItems : product.quantity}{" "}
                                      <span>${parseInt(product.discountedPrice)}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <p>
                                Sub Total{" "}
                                <span>${cartTotalPrice.toFixed(2)}</span>
                              </p>
                              <p>
                                Shipping Fee <span>$00.00</span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>${cartTotalPrice.toFixed(2)}</span>
                              </h4>
                            </div>
                          </div>
                          {/* Payment Method */}
                          <div className="col-12">
                            <h4 className="checkout-title">Payment Method</h4>
                            <div className="checkout-payment-method">
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_check"
                                  name="payment-method"
                                  defaultValue="check"
                                />
                                <label htmlFor="payment_check">
                                  Check Payment
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_bank"
                                  name="payment-method"
                                  defaultValue="bank"
                                />
                                <label htmlFor="payment_bank">
                                  Direct Bank Transfer
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_cash"
                                  name="payment-method"
                                  defaultValue="cash"
                                />
                                <label htmlFor="payment_cash">
                                  Cash on Delivery
                                </label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_paypal"
                                  name="payment-method"
                                  defaultValue="paypal"
                                />
                                <label htmlFor="payment_paypal">Paypal</label>
                              </div>
                              <div className="single-method">
                                <input
                                  type="radio"
                                  id="payment_payoneer"
                                  name="payment-method"
                                  defaultValue="payoneer"
                                />
                                <label htmlFor="payment_payoneer">
                                  Payoneer
                                </label>
                              </div>
                              <div className="single-method">
                                <input type="checkbox" id="accept_terms" />
                                <label htmlFor="accept_terms">
                                  I’ve read and accept the terms &amp;
                                  conditions
                                </label>
                              </div>
                            </div>
                            <button className="lezada-button lezada-button--medium space-mt--20">
                              Place order
                            </button>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                      <div className="col-md-4 col-12 space-mb--20">
                        <label>* Wear date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}>
                          <div style={{ color: "red" }}>Don't forget to check the weather!</div>
                        </DatePicker>
                      </div>
                      <div className="col-md-4 col-12 space-mb--20">
                        <label>* Lead Time</label>
                        {/* <select
                          style={{ width: "100%", height: "37px", cursor: "pointer" }}
                          onChange={(event) => {
                            // console.log("event", event.target.value)
                            // setSelectedLining(event.target.value.split("/")[0])
                            // setSelectedLiningFabricsColor(event.target.value.split("/")[1])
                          }}
                        >
                          {product.sizeCategories &&
                            product.sizeCategories[0].sizes.map((single, i) => {
                              return (
                                <option key={i} value={single.sizeCode}>{single.sizeName}</option>
                              );
                            })
                          }
                        </select> */}
                      </div>
                      <div className="col-md-4 col-12 space-mb--20">
                        <label>Estimated Ship Date</label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}>
                          <div style={{ color: "red" }}>Don't forget to check the weather!</div>
                        </DatePicker>
                      </div>
                    </div>
                    <div className="lezada-form lezada-form--review">
                      <form>
                        <div className="row">
                          <div className="col-lg-12 space-mb--20">
                            <span className="rating-title space-mr--20">
                              Add Comments About Your Order
                            </span>
                          </div>
                          <div className="col-lg-12 space-mb--20">
                            <textarea
                              cols={30}
                              rows={10}
                              placeholder="Add Comments About Your Order"
                              defaultValue={""}
                            />
                          </div>
                          <div className="col-lg-12 text-center">
                            <button
                              type="submit"
                              className="lezada-button lezada-button--medium"
                            >
                              Confirm Order
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className="item-empty-area text-center">
                  <div className="item-empty-area__icon space-mb--30">
                    <IoMdCash />
                  </div>
                  <div className="item-empty-area__text">
                    <p className="space-mb--30">
                      No items found in cart to checkout
                    </p>
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
    cartItems: state.cartData
  };
};

export default connect(mapStateToProps)(Checkout);
