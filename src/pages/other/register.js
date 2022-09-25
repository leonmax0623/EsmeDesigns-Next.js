import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import RECAPTCHA from "react-google-recaptcha";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";

const Register = () => {

  const [divisionCountry, setDivisionCountry] = useState("United States")
  const [divisionRegion, setDivisionRegion] = useState("")
  const [billingCountry, setBillingCountry] = useState("United States")
  const [billingRegion, setBillingRegion] = useState("")
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
            <form>
              <div className="section-title--login text-center space-mb--50" >
                <h2 className="space-mb--20">Register</h2>
                <p>If you don’t have an account, register now!</p>
              </div>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Your Personal Details</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}First Name
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}E-Mail
                    </label>
                    <input type="text" id="regEmail" required />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Last Name
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Telephone
                    </label>
                    <input type="text" id="regEmail" required />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Business Information</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Wholesale Name
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Division Name
                    </label>
                    <input type="text" id="regEmail" required />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Legal Name
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Tax ID Number
                    </label>
                    <input type="text" id="regEmail" required />
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Division Address</h4><hr />
                <Row>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={divisionCountry}
                      value={divisionRegion}
                      onChange={(val) => selectDivisionRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
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
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={billingCountry}
                      value={billingRegion}
                      onChange={(val) => selectBillingRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
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
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}City
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}State
                    </label><br />
                    <RegionDropdown
                      style={{ width: "100%", height: "37px", cursor: "pointer" }}
                      country={shippingCountry}
                      value={shippingRegion}
                      onChange={(val) => selectShippingRegion(val)} />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Address 2
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Zip code
                    </label>
                    <input type="text" id="regEmail" required />
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Country
                    </label>
                    <CountryDropdown
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
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Password
                    </label>
                    <input type="text" id="regEmail" required />
                  </Col>
                  <Col lg={6}>
                    <label htmlFor="regEmail">
                      <span className="required">*</span>{" "}Password Confirm
                    </label>
                    <input type="text" id="regEmail" required />
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
                        <input type="radio" id="contactChoice1"
                          name="contact" value="email" style={{ cursor: "pointer" }} />
                        <label style={{ marginBottom: "0px", marginLeft: "10px" }} >Yes</label>
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" id="contactChoice2"
                          name="contact" value="phone" style={{ marginLeft: "20px", cursor: "pointer" }} />
                        <label style={{ marginBottom: "0px", marginLeft: "10px" }} >No</label>
                      </div>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col lg={12} style={{ marginBottom: "30px" }}>
                <h4>Captcha</h4><hr />
                <Row>
                  <RECAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
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
