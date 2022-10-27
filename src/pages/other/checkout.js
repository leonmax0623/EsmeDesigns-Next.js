import Link from "next/link";
import Router from 'next/router';
import { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { IoMdCash } from "react-icons/io";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import API from '../../api';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import { getCheckoutOptions } from "../../redux/actions/checkoutOptions";
import { getStates, getTerritories } from "../../redux/actions/territoryAction";

const Checkout = ({ cartItems, deleteAllFromCart }) => {
  const { addToast } = useToasts();
  let cartTotalPrice = 0;
  let mainPrice = 0;
  let extraPayPrice = 0;
  let totalAmount = 0;
  const [orderDate, setOrderDate] = useState(new Date());

  const [billingMethods, setBillingMethods] = useState("");
  const [selectedBillingMethod, setSelectedBillingMethod] = useState("");
  const [billingCompany, setBillingCompany] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingCountryId, setBillingCountryId] = useState("");
  const [selectedBillingState, setSelectedBillingState] = useState("");
  const [selectedBillingStateId, setSelectedBillingStateId] = useState("");
  const [billingStates, setBillingStates] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [billingStreetOne, setBillingStreetOne] = useState("");
  const [billingStreetTwo, setBillingStreetTwo] = useState("");

  const [shippingMethods, setShippingMethods] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingCompany, setShippingCompany] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingCountryId, setShippingCountryId] = useState("");
  const [shippingStates, setShippingStates] = useState("");
  const [selectedShippingState, setSelectedShippingState] = useState("");
  const [selectedShippingStateId, setSelectedShippingStateId] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingStreetOne, setShippingStreetOne] = useState("");
  const [shippingStreetTwo, setShippingStreetTwo] = useState("");
  const [shippingToName, setShippingToName] = useState("");
  const [shippingPhoneNumber, setShippingPhoneNumber] = useState("");

  const [storeNumber, setStoreNumber] = useState("");
  const [eventId, setEventId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [orderNote, setOrderNote] = useState("");

  const [territories, setTerritories] = useState([])

  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  useMemo(async () => {

    const response = await getCheckoutOptions();
    if (response.data.errorText === 'accessToken expired') {
      addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
      Router.push('/other/login');
    } else {
      setBillingMethods(response.data.paymentMethods)
      setShippingMethods(response.data.shippingMethods)
      console.log("CheckoutOptions", response.data)
    }

    setBillingCompany(response.data.billingCompany)
    setBillingCity(response.data.billingCity)
    setBillingCountryId(response.data.billingCountry)
    setSelectedBillingStateId(response.data.billingState)
    setBillingStreetOne(response.data.billingStreet)
    setBillingStreetTwo(response.data.billingStreet2)
    setBillingZipCode(response.data.billingZipCode)

    setShippingCompany(response.data.shippingCompany)
    setShippingCity(response.data.shippingCity)
    setShippingCountryId(response.data.shippingCountry)
    setSelectedShippingStateId(response.data.shippingState)
    setShippingStreetOne(response.data.shippingStreet)
    setShippingStreetTwo(response.data.shippingStreet2)
    setShippingZipCode(response.data.shippingZipCode)
    setShippingToName(response.data.shippingToName)
    setShippingPhoneNumber(response.data.shippingPhoneNumber)

    const responseCountries = await getTerritories();
    setTerritories(responseCountries.data.territory)

    const billingRes = await getStates(response.data.billingCountry);
    setBillingStates(billingRes.data.territory)

    const shippingRes = await getStates(response.data.shippingCountry);
    setShippingStates(shippingRes.data.territory)

  }, [])

  const selectBillingCountry = async (event) => {
    setBillingCountryId(event.target.value.split("/")[0])
    setBillingCountry(event.target.value.split("/")[1])

    const responseStates = await getStates(event.target.value.split("/")[0]);
    setBillingStates(responseStates.data.territory)
  }

  const selectShippingCountry = async (event) => {
    setShippingCountryId(event.target.value.split("/")[0])
    setShippingCountry(event.target.value.split("/")[1])

    const responseStates = await getStates(event.target.value.split("/")[0]);
    setShippingStates(responseStates.data.territory)
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  let itemsArray = [];

  cartItems.map((product, i) => {
    let comboArr = [];
    let attrArr = [];
    let sizeArr = [];
    let products = {};

    product.selectedAttr.map((attr, i) => {
      let temp = {};
      temp.styleAttrybutesId = attr.attrId;
      temp.styleAttrybutesValueId = attr.valueId;

      attrArr = [...attrArr, temp]
    })

    if (product.regularOrder) {

      sizeArr = [{
        "sizeId": product.selectedSizeId,
        "amount": product.quantity
      }]

    } else {
      product.regularSizeArray.map((size, i) => {
        if (size.sizeCategoryId === product.selectedSizeCategoryId) {
          size.sizes.map((item, i) => {
            if (item.sizeCode !== 0) {
              let temp = {};
              temp.sizeId = item.sizeId;
              temp.amount = item.sizeCode;

              sizeArr = [...sizeArr, temp]
            }
          })
        }
      })
    }

    product.comboArray.map((data, i) => {
      let temp = {};

      temp.combosId = data.comboId
      temp.combosfabricsId = data.fabric.fabric_id
      temp.combosfabricsColorId = data.fabric.color.color_id;
      comboArr = [...comboArr, temp];
    })

    if (product.selectedStyleOption[0] && product.selectedAlteration[0]) {
      products = {
        "itemsId": product.itemsId,
        "productTypeId": product.productTypeId,
        "productId": product.productId,
        "selfFabricsId": product.selectedFabrics,
        "selfFabricsColorId": product.selectedFabricsColorId,
        "liningFabricsId": product.selectedLining,
        "liningFabricsColorId": product.selectedLiningFabricsColorId,
        "combos": comboArr,
        "sizeCategoryId": product.selectedSizeCategoryId,
        "sizes": sizeArr,
        "styleAlterations": [
          {
            "styleAlterationId": product.selectedAlteration[0].id
          }
        ],
        "styleAttributes": attrArr,
        "styleOptions": [
          {
            "styleOptionId": product.selectedStyleOption[0].id
          }
        ],
        "rushId": product.selectedRushOption[0].rushId,
        "wearDate": product.wearDate,
        "estimatedShipDate": product.shipDate
      };
    } else {
      products = {
        "itemsId": product.itemsId,
        "productTypeId": product.productTypeId,
        "productId": product.productId,
        "selfFabricsId": product.selectedFabrics,
        "selfFabricsColorId": product.selectedFabricsColorId,
        "liningFabricsId": product.selectedLining,
        "liningFabricsColorId": product.selectedLiningFabricsColorId,
        "combos": comboArr,
        "sizeCategoryId": product.selectedSizeCategoryId,
        "sizes": sizeArr,
        "styleAttributes": attrArr,
        "rushId": product.selectedRushOption[0].rushId,
        "wearDate": product.wearDate,
        "estimatedShipDate": product.shipDate
      };
    }

    if (product.selectedAlteration[0] && !product.selectedStyleOption[0]) {
      products = {
        "itemsId": product.itemsId,
        "productTypeId": product.productTypeId,
        "productId": product.productId,
        "selfFabricsId": product.selectedFabrics,
        "selfFabricsColorId": product.selectedFabricsColorId,
        "liningFabricsId": product.selectedLining,
        "liningFabricsColorId": product.selectedLiningFabricsColorId,
        "combos": comboArr,
        "sizeCategoryId": product.selectedSizeCategoryId,
        "sizes": sizeArr,
        "styleAlterations": [
          {
            "styleAlterationId": product.selectedAlteration[0].id
          }
        ],
        "styleAttributes": attrArr,
        "rushId": product.selectedRushOption[0].rushId,
        "wearDate": product.wearDate,
        "estimatedShipDate": product.shipDate
      };
    }

    if (!product.selectedAlteration[0] && product.selectedStyleOption[0]) {
      products = {
        "itemsId": product.itemsId,
        "productTypeId": product.productTypeId,
        "productId": product.productId,
        "selfFabricsId": product.selectedFabrics,
        "selfFabricsColorId": product.selectedFabricsColorId,
        "liningFabricsId": product.selectedLining,
        "liningFabricsColorId": product.selectedLiningFabricsColorId,
        "combos": comboArr,
        "sizeCategoryId": product.selectedSizeCategoryId,
        "sizes": sizeArr,
        "styleOptions": [
          {
            "styleOptionId": product.selectedStyleOption[0].id
          }
        ],
        "styleAttributes": attrArr,
        "rushId": product.selectedRushOption[0].rushId,
        "wearDate": product.wearDate,
        "estimatedShipDate": product.shipDate
      };
    }
    itemsArray = [...itemsArray, products]
    console.log("=====================Item=============", products)
  })

  console.log("itemsArray", itemsArray)


  const confirmOrder = (event) => {
    event.preventDefault();

    if (shippingPhoneNumber === "" || shippingPhoneNumber === null) {
      addToast("Shipping Phone Number is missing!", { appearance: "error", autoDismiss: true });
    }

    if (selectedBillingMethod === "") {
      addToast("Please select the Billing Method!", { appearance: "error", autoDismiss: true });
    }

    if (selectedShippingMethod === "") {
      addToast("Please select the Shipping Method!", { appearance: "error", autoDismiss: true });
    }

    let parameters = {
      "ordersId": localStorage.getItem("OrderId") ? localStorage.getItem("OrderId") : "",
      "ordersType": "WS",
      "ordersSubType": "F",
      "storeNumber": storeNumber,
      "clientsOrderDate": formatDate(orderDate),
      "clientsPoNumber": poNumber,
      "eventsId": eventId,
      "eventsHostEmail": "",
      "customersName": customerName,
      "customersRole": "",
      "customersNotes": orderNote,
      "billingCompany": billingCompany,
      "billingStreet": billingStreetOne,
      "billingStreet2": billingStreetTwo,
      "billingCity": billingCity,
      "billingZipCode": billingZipCode,
      "billingState": selectedBillingStateId,
      "billingCountry": billingCountryId,
      "shippingToName": shippingToName,
      "shippingPhoneNumber": shippingPhoneNumber,
      "shippingCompany": shippingCompany,
      "shippingStreet": shippingStreetOne,
      "shippingStreet2": shippingStreetTwo,
      "shippingCity": shippingCity,
      "shippingZipCode": shippingZipCode,
      "shippingState": selectedShippingStateId,
      "shippingCountry": shippingCountryId,
      "shippingMethodId": selectedShippingMethod,
      "paymentMethodsId": selectedBillingMethod,
      "finalized": "True",
      "items": itemsArray
    }


    if (shippingPhoneNumber !== "" && selectedShippingMethod !== "" && selectedBillingMethod !== "") {
      const tokenInStorage = localStorage.getItem('accessToken')

      const formData = {
        "feaMethod": "upsertOrder",
        "accessToken": tokenInStorage,
        "parameters": JSON.stringify(parameters)
      }

      API.post('/', new URLSearchParams(formData))
        .then(response => {
          console.log('response', response);
          if (response.data.errorCode === "0") {
            addToast("Order was successfully saved!", { appearance: "success", autoDismiss: true });
            localStorage.removeItem("OrderId")
            deleteAllFromCart(addToast)
            Router.push('/');
          } else {
            addToast(response.data.errorMessage, { appearance: "error", autoDismiss: true });
          }
          // const cookie = response.data.accessToken;
          // localStorage.setItem('accessToken', cookie)
          // cookies.set("accessToken", cookie, [{ maxAge: 3600000 }])
          // Router.push('/');
        })
        .catch(error => {
          console.log('error', error);
        });
    }

  }


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
                      <div className="col-lg-6 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">Billing Address</h4>
                          <div className="row">
                            <div className="col-md-12 col-12 space-mb--20">
                              <label>Billing Company*</label>
                              <input type="text" placeholder="Billing Company" value={billingCompany} onChange={e => setBillingCompany(e.target.value)} />
                            </div>

                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Billing Country*</label>
                              <select
                                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                                onChange={selectBillingCountry}
                              >
                                {territories && territories.length > 0 &&
                                  territories.map((single, j) => {
                                    return (
                                      <option key={j} selected={single.id === billingCountryId} value={`${single.id}/${single.name}`} >{single.name}</option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Billing State*</label>
                              <select
                                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                                onChange={(event) => {
                                  setSelectedBillingStateId(event.target.value.split("/")[0])
                                  setSelectedBillingState(event.target.value.split("/")[1])
                                }}
                              >
                                <option value="999/null" selected={selectedBillingState === "null"}>-- Select the State --</option>
                                {billingStates && billingStates.length > 0 &&
                                  billingStates.map((state, j) => {
                                    return (
                                      <option key={j} selected={state.id === selectedBillingStateId} value={`${state.id}/${state.name}`} >{state.name}</option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Billing City*</label>
                              <input type="text" value={billingCity} onChange={e => setBillingCity(e.target.value)} placeholder="Billing City" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Billing ZipCode</label>
                              <input type="text" value={billingZipCode} onChange={e => setBillingZipCode(e.target.value)} placeholder="Billing ZipCode" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Billing Street 1</label>
                              <input type="text" value={billingStreetOne} onChange={e => setBillingStreetOne(e.target.value)} placeholder="Billing Street" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Billing Street 2</label>
                              <input type="text" value={billingStreetTwo} onChange={e => setBillingStreetTwo(e.target.value)} placeholder="Billing Street" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 space-mb--20">
                        {/* Billing Address */}
                        <div className="col-12">
                          <h4 className="checkout-title">Billing Methods</h4>
                          <div className="checkout-payment-method">
                            {billingMethods && billingMethods.map((item, i) => {
                              return (
                                <>
                                  <div key={i} className="single-method">
                                    <input
                                      type="radio"
                                      id={item.paymentMethodsId}
                                      name="payment-method"
                                      defaultValue={item.paymentMethodsId}
                                      onChange={e => setSelectedBillingMethod(e.target.defaultValue)}
                                    />
                                    <label htmlFor={item.paymentMethodsId}>
                                      {item.paymentMethodsName}
                                    </label>
                                    <br />
                                  </div>
                                  <p style={{ paddingLeft: "20px" }}>{item.paymentMethodsDescription}</p>
                                </>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">Shipping Address</h4>
                          <div className="row">

                            <div className="col-md-12 col-12 space-mb--20">
                              <label>Shipping Company*</label>
                              <input type="text" value={shippingCompany} onChange={e => setShippingCompany(e.target.value)} placeholder="Shipping Company" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Shipping To Name*</label>
                              <input type="text" value={shippingToName} onChange={e => setShippingToName(e.target.value)} placeholder="Shipping to Name" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Shipping Phone Number*</label>
                              <input type="text" value={shippingPhoneNumber} required onChange={e => setShippingPhoneNumber(e.target.value)} placeholder="Shipping to Phone Number" />
                            </div>

                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Shipping Country*</label>
                              <select
                                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                                onChange={selectShippingCountry}
                              >
                                {territories && territories.length > 0 &&
                                  territories.map((single, j) => {
                                    return (
                                      <option key={j} selected={single.id === shippingCountryId} value={`${single.id}/${single.name}`} >{single.name}</option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Shipping State*</label>
                              <select
                                style={{ width: "100%", height: "37px", cursor: "pointer" }}
                                onChange={(event) => {
                                  setSelectedShippingStateId(event.target.value.split("/")[0])
                                  setSelectedShippingState(event.target.value.split("/")[1])
                                }}
                              >
                                <option value="999/null" selected={selectedShippingState === "null"}>-- Select the State --</option>
                                {shippingStates && shippingStates.length > 0 &&
                                  shippingStates.map((state, j) => {
                                    return (
                                      <option key={j} selected={state.id === selectedShippingStateId} value={`${state.id}/${state.name}`} >{state.name}</option>
                                    );
                                  })
                                }
                              </select>
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Shipping City*</label>
                              <input type="text" value={shippingCity} onChange={e => setShippingCity(e.target.value)} placeholder="Shipping City" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Shipping ZipCode</label>
                              <input type="text" value={shippingZipCode} onChange={e => setShippingZipCode(e.target.value)} placeholder="Shipping ZipCode" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Shipping Street 1</label>
                              <input type="text" value={shippingStreetOne} onChange={e => setShippingStreetOne(e.target.value)} placeholder="Shipping Street" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Shipping Street 2</label>
                              <input type="text" value={shippingStreetTwo} onChange={e => setShippingStreetTwo(e.target.value)} placeholder="Shipping Street" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 space-mb--20">
                        {/* Billing Address */}
                        <div className="col-12">
                          <h4 className="checkout-title">Shipping Methods</h4>
                          <div className="checkout-payment-method">
                            {shippingMethods && shippingMethods.map((item, i) => {
                              return (
                                <>
                                  <div key={i} className="single-method">
                                    <input
                                      type="radio"
                                      id={item.shippingMethodsId}
                                      name="shipping-method"
                                      defaultValue={item.shippingMethodsId}
                                      onChange={e => setSelectedShippingMethod(e.target.defaultValue)}
                                    />
                                    <label htmlFor={item.shippingMethodsId}>
                                      {item.shippingMethodsName}
                                    </label>
                                    <br />
                                  </div>
                                  <p style={{ paddingLeft: "20px" }}>Delivery Time: {item.deliveryTime}</p>
                                  <p style={{ paddingLeft: "20px" }}>Price: {item.price}</p>
                                </>
                              )
                            })}
                          </div>
                          {/* <button className="lezada-button lezada-button--medium space-mt--20">
                            Place order
                          </button> */}

                        </div>
                      </div>
                      <div className="col-lg-6 space-mb--20">
                        {/* Billing Address */}
                        <div id="billing-form" className="space-mb--40">
                          <h4 className="checkout-title">General Info</h4>
                          <div className="row">
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Store Numer</label>
                              <input type="text" value={storeNumber} onChange={e => setStoreNumber(e.target.value)} placeholder="Store Numer" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Event ID</label>
                              <input type="text" value={eventId} onChange={e => setEventId(e.target.value)} placeholder="Event ID" />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>Order's Date</label>
                              <DatePicker onChange={setOrderDate} value={orderDate} />
                            </div>
                            <div className="col-md-6 space-mb--20">
                              <label>PO Number</label>
                              <input type="text" value={poNumber} onChange={e => setPoNumber(e.target.value)} placeholder="PO Number" />
                            </div>
                            <div className="col-md-6 col-12 space-mb--20">
                              <label>Customer's Name</label>
                              <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Customer's Name" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
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
                                  extraPayPrice += (product.totalItems ? product.totalItems : product.quantity) * product.extraPrice;
                                  return (
                                    <li key={i}>
                                      {product.productName} X {product.totalItems ? product.totalItems : product.quantity}{" "}
                                      <span>${(parseInt(product.discountedPrice) * (product.totalItems ? product.totalItems : product.quantity)).toFixed(2)}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <p>
                                Shipping Fee <span>$00.00</span>
                              </p>
                              <p>
                                Extra Price{" "}
                                <span>${extraPayPrice.toFixed(2)}</span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>${(cartTotalPrice + extraPayPrice).toFixed(2)}</span>
                              </h4>
                            </div>
                          </div>
                          {/* Payment Method */}

                        </div>
                      </div>

                    </div>
                    <div className="lezada-form lezada-form--review">
                      <form>
                        <div className="row">
                          <div className="col-lg-12 space-mb--20">
                            <span className="rating-title space-mr--20">
                              Order's Note
                            </span>
                          </div>
                          <div className="col-lg-12 space-mb--20">
                            <textarea
                              cols={30}
                              rows={10}
                              value={orderNote}
                              placeholder="Add Comments About Your Order"
                              onChange={e => setOrderNote(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-12 text-center">
                            <button
                              onClick={confirmOrder}
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
