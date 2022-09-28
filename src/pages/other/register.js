import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import RECAPTCHA from "react-google-recaptcha";
// import Router from 'next/router';
import API from '../../api';
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";
import { getTerritories } from "../../redux/actions/territoryAction";

const Register = () => {

  useEffect(async () => {
    const response = await getTerritories();
    console.log("TERRITORIES =>", response.data)
  }, [])

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

  const [divisionAddressOne, setDivisionAddressOne] = useState("")
  const [divisionAddressTwo, setDivisionAddressTwo] = useState("")
  const [divisionCity, setDivisionCity] = useState("")
  const [divisionZipCode, setDivisionZipCode] = useState("")
  const [divisionCountry, setDivisionCountry] = useState("United States")
  const [divisionRegion, setDivisionRegion] = useState("")

  const [billingAddressOne, setBillingAddressOne] = useState("")
  const [billingAddressTwo, setBillingAddressTwo] = useState("")
  const [billingCity, setBillingCity] = useState("")
  const [billingZipCode, setBillingZipCode] = useState("")
  const [billingCountry, setBillingCountry] = useState("United States")
  const [billingRegion, setBillingRegion] = useState("")

  const [shippingAddressOne, setShippingAddressOne] = useState("")
  const [shippingAddressTwo, setShippingAddressTwo] = useState("")
  const [shippingCity, setShippingCity] = useState("")
  const [shippingZipCode, setShippingZipCode] = useState("")
  const [shippingCountry, setShippingCountry] = useState("United States")
  const [shippingRegion, setShippingRegion] = useState("")

  const selectDivisionCountry = (val) => {
    setDivisionCountry(val);
  }

  const selectDivisionRegion = (val) => {
    setDivisionRegion(val)
  }

  const selectBillingCountry = (val) => {
    setBillingCountry(val);
  }

  const selectBillingRegion = (val) => {
    setBillingRegion(val)
  }

  const selectShippingCountry = (val) => {
    setShippingCountry(val);
  }

  const selectShippingRegion = (val) => {
    setShippingRegion(val)
  }

  const handleRegister = (event) => {
    event.preventDefault();

    console.log("firstName", firstName)
    console.log("lastName", lastName)
    console.log("password", password)
    console.log("email", email)
    console.log("telephone", telephone)
    console.log("wholesaleName", wholesaleName)
    console.log("legalName", legalName)
    console.log("divisionName", divisionName)
    console.log("taxNumber", taxNumber)
    console.log("divisionAddressOne", divisionAddressOne)
    console.log("divisionAddressTwo", divisionAddressTwo)
    console.log("divisionCity", divisionCity)
    console.log("divisionZipCode", divisionZipCode)
    console.log("divisionRegion", divisionRegion)
    console.log("divisionCountry", divisionCountry)

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
      "divisionState": divisionRegion,
      "divisionCountry": divisionCountry,
      "billingStreet": billingAddressOne,
      "billingStreet2": billingAddressTwo,
      "billingCity": billingCity,
      "billingZipCode": billingZipCode,
      "billingState": billingRegion,
      "billingCountry": billingCountry,
      "shippingStreet": shippingAddressOne,
      "shippingStreet2": shippingAddressTwo,
      "shippingCity": shippingCity,
      "shippingZipCode": shippingZipCode,
      "shippingState": shippingRegion,
      "shippingCountry": shippingCountry,
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
        // const cookie = response.data.accessToken;
        // localStorage.setItem('accessToken', cookie)
        // cookies.set("accessToken", cookie, [{ maxAge: 3600000 }])
        // Router.push('/');
        addToast("Successfully Logged In", { appearance: "success", autoDismiss: true });

      })
      .catch(error => {
        console.log('error', error.response);
        // addToast(error.response.data.description, { appearance: "error", autoDismiss: true });
      });

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
                    <input type="text" id="firstName" required onChange={e => setFirstName(e.target.value)} />
                    <label htmlFor="email">
                      <span className="required">*</span>{" "}E-Mail
                    </label>
                    <input type="email" id="email" required onChange={e => setEmail(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="lastName">
                      <span className="required">*</span>{" "}Last Name
                    </label>
                    <input type="text" id="lastName" required onChange={e => setLastName(e.target.value)} />
                    <label htmlFor="telephone">
                      <span className="required">*</span>{" "}Telephone
                    </label>
                    <input type="text" id="telephone" required onChange={e => setTelephone(e.target.value)} />
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
                    <input type="text" id="wholesaleName" required onChange={e => setWholesaleName(e.target.value)} />
                    <label htmlFor="divisionName">
                      <span className="required">*</span>{" "}Division Name
                    </label>
                    <input type="text" id="divisionName" required onChange={e => setDivisionName(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="legalName">
                      <span className="required">*</span>{" "}Legal Name
                    </label>
                    <input type="text" id="legalName" required onChange={e => setLegalName(e.target.value)} />
                    <label htmlFor="taxNumber">
                      <span className="required">*</span>{" "}Tax ID Number
                    </label>
                    <input type="text" id="taxNumber" required onChange={e => setTaxNumber(e.target.value)} />
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
                    <input type="text" id="divisionAddressOne" required onChange={e => setDivisionAddressOne(e.target.value)} />
                    <label htmlFor="divisionCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="divisionCity" required onChange={e => setDivisionCity(e.target.value)} />
                    <label htmlFor="divisionState">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      id="divisionState"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={divisionCountry}
                      value={divisionRegion}
                      onChange={(val) => selectDivisionRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="divisionAddressTwo">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="divisionAddressTwo" required onChange={e => setDivisionAddressTwo(e.target.value)} />
                    <label htmlFor="divisionZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="divisionZipCode" required onChange={e => setDivisionZipCode(e.target.value)} />
                    <label htmlFor="divisionCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
                      id="divisionCountry"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      value={divisionCountry}
                      onChange={(val) => selectDivisionCountry(val)} />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Billing Address</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="billingAddressOne">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="billingAddressOne" required onChange={e => setBillingAddressOne(e.target.value)} />
                    <label htmlFor="billingCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="billingCity" required onChange={e => setBillingCity(e.target.value)} />
                    <label htmlFor="billingState">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      id="billingState"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={billingCountry}
                      value={billingRegion}
                      onChange={(val) => selectBillingRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="billingAddressTwo">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="billingAddressTwo" required onChange={e => setBillingAddressTwo(e.target.value)} />
                    <label htmlFor="billingZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="billingZipCode" required onChange={e => setBillingZipCode(e.target.value)} />
                    <label htmlFor="billingCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
                      id="billingCountry"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      value={billingCountry}
                      onChange={(val) => selectBillingCountry(val)} />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Shipping Address</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="shippingAddressOne">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="shippingAddressOne" required onChange={e => setShippingAddressOne(e.target.value)} />
                    <label htmlFor="shippingCity">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="shippingCity" required onChange={e => setShippingCity(e.target.value)} />
                    <label htmlFor="shippingState">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      id="shippingState"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={shippingCountry}
                      value={shippingRegion}
                      onChange={(val) => selectShippingRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="shippingAddressTwo">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="shippingAddressTwo" required onChange={e => setShippingAddressTwo(e.target.value)} />
                    <label htmlFor="shippingZipCode">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="shippingZipCode" required onChange={e => setShippingZipCode(e.target.value)} />
                    <label htmlFor="shippingCountry">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
                      id="shippingCountry"
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      value={shippingCountry}
                      onChange={(val) => selectShippingCountry(val)} />
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
                    <input type="password" id="password" required onChange={e => setPassword(e.target.value)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="passwordConfirm">
                      <span className="required">*</span>{" "}Password Confirm
                    </label>
                    <input type="password" id="passwordConfirm" required onChange={e => setPasswordConfirm(e.target.value)} />
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
                        <input type="radio" checked={newsletterSubscribe} id="contactChoice1" onChange={e => setNewsletterSubscribe(true)}
                          name="contact" value="yes" style={{ cursor: "pointer" }} />
                        <label style={{ marginBottom: "0px", marginLeft: "10px" }} >Yes</label>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" id="contactChoice2" onChange={e => setNewsletterSubscribe(false)}
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
