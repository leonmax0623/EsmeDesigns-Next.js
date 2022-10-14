import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import RECAPTCHA from "react-google-recaptcha";
import { useToasts } from "react-toast-notifications";
import API from '../../api';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";
import { getStates, getTerritories } from "../../redux/actions/territoryAction";

const Register = () => {
  const { addToast } = useToasts();

  const [territories, setTerritories] = useState([])
  const [divisionStates, setDivisionStates] = useState([])
  const [billingStates, setBillingStates] = useState([])
  const [shippingStates, setShippingStates] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [wholesaleName, setWholesaleName] = useState("")
  const [divisionName, setDivisionName] = useState("")
  const [legalName, setLegalName] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [newsletterSubscribe, setNewsletterSubscribe] = useState(true)
  const [divisionStateRequired, setDivisionStateRequired] = useState(true)
  const [shippingStateRequired, setShippingStateRequired] = useState(true)
  const [billingStateRequired, setBillingStateRequired] = useState(true)

  const [divisionAddressOne, setDivisionAddressOne] = useState("")
  const [divisionAddressTwo, setDivisionAddressTwo] = useState("")
  const [divisionCity, setDivisionCity] = useState("")
  const [divisionZipCode, setDivisionZipCode] = useState("")
  const [divisionCountry, setDivisionCountry] = useState("United States")
  const [divisionCountryId, setDivisionCountryId] = useState("223")
  const [divisionRegion, setDivisionRegion] = useState("New York")
  const [divisionRegionId, setDivisionRegionId] = useState("3814")

  const [billingAddressOne, setBillingAddressOne] = useState("")
  const [billingAddressTwo, setBillingAddressTwo] = useState("")
  const [billingCity, setBillingCity] = useState("")
  const [billingZipCode, setBillingZipCode] = useState("")
  const [billingCountry, setBillingCountry] = useState("United States")
  const [billingCountryId, setBillingCountryId] = useState("223")
  const [billingRegion, setBillingRegion] = useState("New York")
  const [billingRegionId, setBillingRegionId] = useState("3814")

  const [shippingAddressOne, setShippingAddressOne] = useState("")
  const [shippingAddressTwo, setShippingAddressTwo] = useState("")
  const [shippingCity, setShippingCity] = useState("")
  const [shippingZipCode, setShippingZipCode] = useState("")
  const [shippingCountry, setShippingCountry] = useState("United States")
  const [shippingCountryId, setShippingCountryId] = useState("223")
  const [shippingRegion, setShippingRegion] = useState("New York")
  const [shippingRegionId, setShippingRegionId] = useState("3814")

  const handleRegister = (event) => {

    event.preventDefault();

    const parameters = {
      "username": firstName,
      "password": password,
      "userFirstName": firstName,
      "userLastName": lastName,
      "userEmailAddress": email,
      "userPhoneNumber": telephone,
      "companyName": wholesaleName,
      "companyLegalName": legalName,
      "divisionName": divisionName,
      "taxId": taxNumber,
      "divisionStreet": divisionAddressOne,
      "divisionStreet2": divisionAddressTwo,
      "divisionCity": divisionCity,
      "divisionZipCode": divisionZipCode,
      "divisionState": divisionRegionId,
      "divisionCountry": divisionCountryId,
      "billingStreet": billingAddressOne,
      "billingStreet2": billingAddressTwo,
      "billingCity": billingCity,
      "billingZipCode": billingZipCode,
      "billingState": billingRegionId,
      "billingCountry": billingCountryId,
      "shippingStreet": shippingAddressOne,
      "shippingStreet2": shippingAddressTwo,
      "shippingCity": shippingCity,
      "shippingZipCode": shippingZipCode,
      "shippingState": shippingRegionId,
      "shippingCountry": shippingCountryId,
      "subscribeNewsletter": newsletterSubscribe ? "True" : "False"
    }

    const formData = {
      "feaMethod": "newCustomerRegistration",
      "customersType": "WS",
      "parameters": JSON.stringify(parameters)
    }

    API.post('/', new URLSearchParams(formData))
      .then(response => {
        console.log('response', response);
        if (response.data.errorCode === "0") {
          addToast("Successfully Registered", { appearance: "success", autoDismiss: true });
          Router.push('/other/login');
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

  useEffect(async () => {
    const responseCountries = await getTerritories();
    console.log("responseCountries =>", responseCountries.data.territory)
    setTerritories(responseCountries.data.territory)

    const countryId = 223;

    const responseStates = await getStates(countryId);
    console.log("responseStates =>", responseStates.data.territory)
    setDivisionStates(responseStates.data.territory)
    setBillingStates(responseStates.data.territory)
    setShippingStates(responseStates.data.territory)
  }, [])

  useEffect(() => {
    if (shippingCountry === "United States") {
      setShippingStateRequired(true);
    } else {
      setShippingStateRequired(false)
    }
  }, [shippingCountry])

  useEffect(() => {
    if (billingCountry === "United States") {
      setBillingStateRequired(true);
    } else {
      setBillingStateRequired(false)
    }
  }, [billingCountry])

  useEffect(() => {
    if (divisionCountry === "United States") {
      setDivisionStateRequired(true);
    } else {
      setDivisionStateRequired(false)
    }
  }, [divisionCountry])

  const selectDivisionCountry = async (event) => {

    setDivisionCountryId(event.target.value.split("/")[0])
    setDivisionCountry(event.target.value.split("/")[1])

    const responseStates = await getStates(event.target.value.split("/")[0]);
    setDivisionStates(responseStates.data.territory)
  }

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

  const copyDivisionData = () => {
    setBillingAddressOne(divisionAddressOne)
    setBillingAddressTwo(divisionAddressTwo)
    setBillingCity(divisionCity)
    setBillingZipCode(divisionZipCode)
    setBillingCountry(divisionCountry)
    setBillingCountryId(divisionCountryId)
    setBillingRegion(divisionRegion)
    setBillingRegionId(divisionRegionId)
  }

  console.log("VVVVVVV", billingRegion)
  console.log("VVVVVVV", billingRegionId)

  const copyBillingData = () => {
    setShippingAddressOne(billingAddressOne)
    setShippingAddressTwo(billingAddressTwo)
    setShippingCity(billingCity)
    setShippingZipCode(billingZipCode)
    setShippingCountry(billingCountry)
    setShippingCountryId(billingCountryId)
    setShippingRegion(billingRegion)
    setShippingRegionId(billingRegionId)

  }

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="Customer Login"
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Customer Login</li>
        </ul>
      </BreadcrumbOne>
      <div className="login-area space-mb--r130">
        <Container>
          <div className="lezada-form login-form--register">
            <form onSubmit={handleRegister}>
              <div className="section-title--login text-center space-mb--50" >
                <h2 className="space-mb--20">Register</h2>
                <p>If you don’t have an account, register now!</p>
              </div>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Your Personal Details</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="firstName">
                      <span className="required">*</span>{" "}First Name
                    </label>
                    <input type="text" id="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="lastName">
                      <span className="required">*</span>{" "}Last Name
                    </label>
                    <input type="text" id="lastName" required value={lastName} onChange={e => setLastName(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="email">
                      <span className="required">*</span>{" "}E-Mail
                    </label>
                    <input type="email" id="email" required value={email} onChange={e => setEmail(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="telephone">
                      <span className="required">*</span>{" "}Telephone
                    </label>
                    <input type="text" id="telephone" required value={telephone} onChange={e => setTelephone(e.target.value)} />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Business Information</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="wholesaleName">
                      <span className="required">*</span>{" "}Wholesale Name
                    </label>
                    <input type="text" id="wholesaleName" required value={wholesaleName} onChange={e => setWholesaleName(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="legalName">
                      <span className="required">*</span>{" "}Legal Name
                    </label>
                    <input type="text" id="legalName" required value={legalName} onChange={e => setLegalName(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="divisionName">
                      <span className="required">*</span>{" "}Division Name
                    </label>
                    <input type="text" id="divisionName" required value={divisionName} onChange={e => setDivisionName(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="taxNumber">
                      <span className="required">*</span>{" "}Tax ID Number
                    </label>
                    <input type="text" id="taxNumber" required value={taxNumber} onChange={e => setTaxNumber(e.target.value)} />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Division Address</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="divisionAddressOne">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="divisionAddressOne" required value={divisionAddressOne} onChange={e => setDivisionAddressOne(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="divisionAddressTwo">
                      Address 2
                    </label>
                    <input type="text" id="divisionAddressTwo" value={divisionAddressTwo} onChange={e => setDivisionAddressTwo(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="divisionCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="divisionCity" required value={divisionCity} onChange={e => setDivisionCity(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="divisionZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="divisionZipCode" required value={divisionZipCode} onChange={e => setDivisionZipCode(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="divisionState">
                      <p>{divisionStateRequired && <span className="required">* </span>}State</p>
                    </label><br />
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={(event) => {
                        console.log("!!!!!!!!!", event.target.value)
                        setDivisionRegionId(event.target.value.split("/")[0])
                        setDivisionRegion(event.target.value.split("/")[1])
                      }}
                      value={`${divisionRegionId}/${divisionRegion}`}
                    >
                      <option value="999/null" selected={divisionRegion === "null"}>-- Select the State --</option>
                      {divisionStates && divisionStates.length > 0 &&
                        divisionStates.map((state, j) => {
                          return (
                            <option key={j} selected={state.name === divisionRegion} value={`${state.id}/${state.name}`} >{state.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="divisionCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={selectDivisionCountry}
                    >
                      {territories && territories.length > 0 &&
                        territories.map((single, j) => {
                          return (
                            <option key={j} selected={single.name === divisionCountry} value={`${single.id}/${single.name}`} >{single.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <div>
                  <a onClick={copyDivisionData}>Copy</a>
                  <h4>Billing Address</h4><hr />
                </div>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="billingAddressOne">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="billingAddressOne" required value={billingAddressOne} onChange={e => setBillingAddressOne(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="billingAddressTwo">
                      Address 2
                    </label>
                    <input type="text" id="billingAddressTwo" value={billingAddressTwo} onChange={e => setBillingAddressTwo(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="billingCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="billingCity" required value={billingCity} onChange={e => setBillingCity(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="billingZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="billingZipCode" required value={billingZipCode} onChange={e => setBillingZipCode(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="billingState">
                      <p>{billingStateRequired && <span className="required">* </span>}State</p>
                    </label><br />
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={(event) => {
                        setBillingRegionId(event.target.value.split("/")[0])
                        setBillingRegion(event.target.value.split("/")[1])
                      }}
                      value={`${billingRegionId}/${billingRegion}`}
                    >
                      <option value="999/null" selected={billingRegion === "null"}>-- Select the State --</option>
                      {billingStates && billingStates.length > 0 &&
                        billingStates.map((state, j) => {
                          return (
                            <option key={j} selected={state.name === billingRegion} value={`${state.id}/${state.name}`} >{state.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="billingCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={selectBillingCountry}
                    >
                      {territories && territories.length > 0 &&
                        territories.map((single, j) => {
                          return (
                            <option key={j} selected={single.name === billingCountry} value={`${single.id}/${single.name}`} >{single.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <div>

                  <a onClick={copyBillingData}>Copy</a>
                  <h4>Shipping Address</h4><hr />
                </div>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="shippingAddressOne">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="shippingAddressOne" required value={shippingAddressOne} onChange={e => setShippingAddressOne(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="shippingAddressTwo">
                      Address 2
                    </label>
                    <input type="text" id="shippingAddressTwo" value={shippingAddressTwo} onChange={e => setShippingAddressTwo(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="shippingCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="shippingCity" required value={shippingCity} onChange={e => setShippingCity(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="shippingZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="shippingZipCode" required value={shippingZipCode} onChange={e => setShippingZipCode(e.target.value)} />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <label htmlFor="shippingState">
                      <p>{shippingStateRequired && <span className="required">* </span>}State</p>
                    </label><br />
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={(event) => {
                        setShippingRegionId(event.target.value.split("/")[0])
                        setShippingRegion(event.target.value.split("/")[1])
                      }}
                    >
                      <option value="999/null" selected={shippingRegion === "null"}>-- Select the State --</option>
                      {shippingStates && shippingStates.length > 0 &&
                        shippingStates.map((state, j) => {
                          return (
                            <option key={j} selected={state.name === shippingRegion} value={`${state.id}/${state.name}`} >{state.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="shippingCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <select
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      onChange={selectShippingCountry}
                    >
                      {territories && territories.length > 0 &&
                        territories.map((single, j) => {
                          return (
                            <option key={j} selected={single.name === shippingCountry} value={`${single.id}/${single.name}`} >{single.name}</option>
                          );
                        })
                      }
                    </select>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Your Password</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="password">
                      <span className="required">*</span>{" "}Password
                    </label>
                    <input type="password" id="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="passwordConfirm">
                      <span className="required">*</span>{" "}Password Confirm
                    </label>
                    <input type="password" id="passwordConfirm" required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Newsletter</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Subscribe
                    </label>
                  </Col>
                  <Col lg={6}>
                    <Row>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" checked={newsletterSubscribe} id="contactChoice1" selected={newsletterSubscribe} onChange={e => setNewsletterSubscribe(true)}
                          name="contact" value="yes" style={{ cursor: "pointer" }} />
                        <label style={{ marginBottom: "0px", marginLeft: "10px" }} >Yes</label>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" id="contactChoice2" selected={!newsletterSubscribe} onChange={e => setNewsletterSubscribe(false)}
                          name="contact" value="no" style={{ marginLeft: "20px", cursor: "pointer" }} />
                        <label style={{ marginBottom: "0px", marginLeft: "10px" }} >No</label>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Captcha</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Please complete the captcha validation below
                    </label>
                  </Col>
                  <Col lg={6}>
                    <RECAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
                  </Col>
                </Row>
              </Col>
              <div className="section-title--login text-center space-mb--50 space-mt--50" >
                <button className="lezada-button lezada-button--medium" style={{ marginBottom: "20px" }}>
                  register
                </button>
                <br />
                <Link href="/other/login" className="reset-pass-link">
                  Already have an account? Login now
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default Register;
