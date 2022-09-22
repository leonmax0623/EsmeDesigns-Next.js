import Router from 'next/router';
import { Col, Container, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { IoIosAdd } from "react-icons/io";
import { useToasts } from "react-toast-notifications";
import { getUserCheckResult } from "../../redux/actions/userCheckActions";
import { ProductGridWrapper } from "../ProductThumb";


const ProductTabThree = ({ newProducts, popularProducts, saleProducts }) => {
  const { addToast } = useToasts();

  const shopMore = async () => {
    if (localStorage.getItem('accessToken')) {
      const response = await getUserCheckResult();
      if (response.data.errorText === 'accessToken expired') {
        addToast("Access Token expired, please log in again!", { appearance: "error", autoDismiss: true });
        Router.push('/other/login');
      } else {
        Router.push('/shop/left-sidebar');
      }
    } else {
      addToast("Please log in!", { appearance: "error", autoDismiss: true });
      Router.push('/other/login');
    }
  }

  return (
    <div className="product-tab product-tab--style2 space-mb--r100">
      <Container className="wide">
        <Tab.Container defaultActiveKey="popular">
          <Nav
            variant="pills"
            className="product-tab__navigation text-center space-mb--r60"
          >
            <Nav.Item>
              <Nav.Link eventKey="popular">Popular</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="new">New</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sale">Sale</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="popular">
              <Row className="five-column">
                <ProductGridWrapper
                  products={popularProducts}
                  bottomSpace="space-mb--r50"
                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="new">
              <Row className="five-column">
                <ProductGridWrapper
                  products={newProducts}
                  bottomSpace="space-mb--r50"
                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="sale">
              <Row className="five-column">
                <ProductGridWrapper
                  products={saleProducts}
                  bottomSpace="space-mb--r50"
                />
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <Row>
          <Col lg={12} className="text-center">
            <a className="lezada-button lezada-button--medium lezada-button--icon--left" onClick={shopMore}>
              <IoIosAdd />
              Shop More
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductTabThree;
