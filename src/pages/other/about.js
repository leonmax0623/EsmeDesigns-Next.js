import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrandLogoOne } from "../../components/BrandLogo";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";
import { TestimonialOne } from "../../components/Testimonial";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";
import testimonialData from "../../data/testimonials/testimonial-one.json";

const About = () => {
  const [modalStatus, isOpen] = useState(false);

  return (
    <LayoutTwo>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle="About"
        backgroundImage="/assets/images/esme-images/products_banner.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>About</li>
        </ul>
      </BreadcrumbOne>
      {/* about content */}
      <div className="about-content space-mt--r130 space-mb--r130">
        <div className="section-title-container space-mb--40">
          <Container>
            <Row>
              <Col lg={8} className="ml-auto mr-auto">
                {/* section title */}
                <div className="about-title-container text-left">
                  <p className="dark-title space-mb--35">Diane D’Angelo</p>
                  <h2 className="title space-mb--15">
                    Esme Designs
                  </h2>
                  <p className="title-text">
                    Diane D’Angelo entered the bridal manufacturing business over 32  years ago.<br />
                    Design, Quality, and Value is not just a good idea it is a must . To achieve the store owners must have the right   margins to prosper in this NEW BRIDAL WORLD<br />
                    Diane is a bridal fashion leader by introducing comfortable and fashion forward designs<br />
                    Her use of innovative fabrics sets her apart.<br />
                    The affordable pricing and up-scale quality will surprise you!<br />
                    Diane’s sources of inspiration include:<br />
                    •	works of art<br />
                    •	nature<br />
                    •	jewels of the Romanoffs<br />
                    •	jewels of Marie Antoinette<br />
                    •	world travel<br />
                    •	brides’ requests<br />
                    • Her travels all around the world and her love of Art Deco & estate jewelry are evident in her designs.<br />
                    She finds the design process time-consuming but rewarding, and is always rethinking the bridal art form.<br />
                    Whether you choose a historically-inspired piece or a fashion-forward piece, rest assured that each of her products has the quality of an heirloom.<br />
                    Helping a Bride find the right bridal dress brings Diane’s life’s work full circle.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* testimonial */}
        <TestimonialOne
          testimonialData={testimonialData}
          backgroundImage="/assets/images/esme-images/about_banner.png"
        />
        <div className="space-mb--r100"></div>
        {/* brand logo */}
        <BrandLogoOne brandLogoData={brandLogoData} />
      </div>
    </LayoutTwo>
  );
};

export default About;
