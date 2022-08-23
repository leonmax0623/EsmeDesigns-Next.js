import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";

const Login = () => {
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
                        <Col lg={6} className="space-mb-mobile-only--50">
                            <div className="lezada-form login-form">
                                <form>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="section-title--login text-center space-mb--50">
                                                <h2 className="space-mb--20">Login</h2>
                                                <p>Great to have you back!</p>
                                            </div>
                                        </Col>
                                        <Col lg={12} className="space-mb--60">
                                            <input
                                                type="text"
                                                placeholder="Username or email address"
                                                required
                                            />
                                        </Col>
                                        <Col lg={12} className="space-mb--60">
                                            <input type="password" placeholder="Password" required />
                                        </Col>
                                        <Col lg={12} className="space-mb--30 text-center">
                                            <button className="lezada-button lezada-button--medium">
                                                login
                                            </button>
                                        </Col>
                                        <Col lg={12} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <div>
                                                <input type="checkbox" />{" "}
                                                <span className="remember-text">Remember me</span>
                                            </div>
                                            <div>
                                                <Link href="#" className="reset-pass-link" style={{ marginTop: 0 }}>
                                                    Lost your password?
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col lg={12} style={{ textAlign: "center", marginTop: "30px" }}>
                                            <Link href="/other/register" className="reset-pass-link">
                                                Don't have account yet? Register now
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

export default Login;
