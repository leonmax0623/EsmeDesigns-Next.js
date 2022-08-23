import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";

const Register = () => {
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
      <div className="login-area space-mt--r130 space-mb--r130">
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <div className="lezada-form login-form--register">
                <form>
                  <Row>
                    <Col lg={12}>
                      <div className="section-title--login text-center space-mb--50">
                        <h2 className="space-mb--20">Register</h2>
                        <p>If you don’t have an account, register now!</p>
                      </div>
                    </Col>
                    <Col lg={12} className="space-mb--30">
                      <label htmlFor="regEmail">
                        Email Address <span className="required">*</span>{" "}
                      </label>
                      <input type="text" id="regEmail" required />
                    </Col>
                    <Col lg={12} className="space-mb--50">
                      <label htmlFor="regPassword">
                        Password <span className="required">*</span>{" "}
                      </label>
                      <input type="password" id="regPassword" required />
                    </Col>
                    <Col lg={12} className="text-center">
                      <button className="lezada-button lezada-button--medium">
                        register
                      </button>
                    </Col>
                    <Col lg={12} style={{ textAlign: "center", marginTop: "30px" }}>
                      <Link href="/other/login" className="reset-pass-link">
                        Already have an account? Login now
                      </Link>
                    </Col>
                  </Row>
                </form>
              </div>
            </Col>
            <Col lg={3}></Col>
          </Row>
        </Container>
      </div>
    </LayoutTwo>
  );
};

export default Register;
