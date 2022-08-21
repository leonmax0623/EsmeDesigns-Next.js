import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { LayoutTwo } from "../../components/Layout";

const Privacy = () => {
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
                  <p className="dark-title space-mb--35">Effective Date: AUGUST 19, 2019</p>
                  <h2 className="title space-mb--15">
                    PRIVACY AND SECURITY POLICY
                  </h2>
                  <p className="title-text">
                    <h5 className="m-4">This Policy</h5>
                    This privacy and security policy (the "Policy") explains the information esme-designs.com ("ESME" or "we") collect about you on the Website, as well as information collected when you visit our stores or otherwise communicate or interact with ESME, how we use the information, some of the security steps are taken to protect the information, and the choices you have to review, revise and/or restrict our usage of this information. This Policy is a part of the Terms & Conditions of Use that govern the Website and is binding on all Website users.<br />
                    If you have any objections to this Privacy Policy, you should immediately discontinue use of the Website.<br />
                    <h5 className="m-4">Collected Information</h5>
                    ESME collects customer information for a variety of reasons, including as part of our ongoing efforts to provide superior customer service, improve our customer's shopping experience and to communicate with our customers about our products, services and promotions, including those that we believe may be of particular interest to you based on information we have collected. We collect personal information such as your name, financial information, telephone number, e-mail and postal address ("Personal Information") that you provide to us when you save your information with us or when you participate in a sweepstakes, promotion or survey. We use this information to process any transaction, inquiry or promotion that you initiate with us. We maintain a record of your product interests, purchases and whatever else might enable us or our business partners to enhance and personalize your shopping experience on this or other websites and to provide you with offers, promotions or information that we believe may be of interest to you.<br />
                    In addition, we also monitor use of the Website and traffic patterns to improve the Website design and the products and services we offer as well as to determine what offers, promotions or information to send to you. We also use other methods of automatic collection to determine information about visitors to our website, including the IP address, browser, language preferences, and computer identification numbers. We use the information obtained using these tools to provide better customer service, enhance our product offerings, and detect potential misuse or fraud.<br />
                    <h5 className="m-4">Disclosure of Information</h5>
                    We may disclose information about you to other members of the ESME corporate family. We will also disclose information as we determine to be required by law as well as to a company with which we contract to help us prevent the unauthorized use of credit and gift cards. We may on occasion share your Personal Information, other than credit card information, with our business partners who want to market products or services to you, unless you wish to opt-out as explained below. In the event that a store, division, assets or part or all of ESME is bought, sold or otherwise transferred, or is in the process of a potential transaction, customer information will likely be shared for evaluation purposes and included among the transferred business assets.<br />
                    <h5 className="m-4">Unique Identifier</h5>
                    When you use a smart phone, other mobile device, or any other technology to connect to the Website, we may use any unique identifier transmitted to us to contact you or to offer you extended services and/or additional functionality. Certain services may require our collection of your mobile phone number. We may associate that mobile phone number with the mobile device unique identifier. When you provide us with your mobile telephone number and consent to receiving offers or promotions via text message, we may contact you via text message (including SMS or MMS) unless you choose to opt-out. Data or other charges may apply to any such text messages.<br />
                    <h5 className="m-4">Procedures to Review Your Personal Information and to Opt-Out</h5>
                    You can always review, update and/or delete your Personal Information. If at any time you would like us to update or delete any of your Personal Information on file, please contact us at info@esme-designs.com. Please be sure to include your e-mail address and full name.<br />
                    Also, you may always opt-out of receiving communications from us. If you are receiving e-mail messages from us and do not wish to receive any more, use the links on the bottom of the e-mail message to "unsubscribe" or make changes to your e-mail preferences. When we receive your notification that you want to opt-out, we will process your request in a reasonable amount of time. Please note, however, that as a result, you may not receive further information about our products or promotions.<br />
                    Further, if you do not want your Personal Information to be shared with third parties in the manner discussed in this Policy, please contact ESME by email at info@esme-designs.com.<br />
                    <h5 className="m-4">Our Email List</h5>
                    We offer those who sign-up for our email list advanced notice of sales, new merchandise, store openings and other ESME news. Email addresses collected at esme-designs.com are used internally and by our business partners. If you would like to unsubscribe from our email list or request that we not share your email address with our business partners, please click on the unsubscribe button. We will remove your name from our email list in a reasonable amount of time. Please recognize that you may receive another email before we are able to remove you.<br />
                    <h5 className="m-4">Business Partners</h5>
                    We contract with outside services to help us and our business partners better understand your use of esme-designs.com. These outside services may use cookies or other technologies to collect various kinds of information for us and our business partners related to your use of esme-designs.com, so that we and our business partners may continue to refine and improve this and other sites for our customers. We do not allow these parties to collect any credit card, user name or password information. These services are contractually required to maintain all the information collected for us in conformance with this Policy. As a visitor to esme-designs.com, you may "opt-out" of these types of collection of data. We may also use our own cookies to deliver enhanced online display advertising tailored to your interests. To opt out of this advertising provided directly by ESME, please email our staff.<br />
                    "Cookies" are bits of information that are automatically stored on your computer. If you do not want to have cookies on your system, you can set your browser to disable them. Kindly note however that if you decline cookies on the Website, some functions on the Website may be limited or unavailable. As a result, to make it easier to use the Website, we recommend that your browser settings accept cookies on the Website.<br />
                    We or our partners may use Flash Cookies (also known as Local Stored Objects) or other similar technologies. A Flash cookie is a small data file placed on a computer using Adobe Flash or similar technology that may be built into your computer or downloaded or installed by you to your computer. We use these technologies to personalize and enhance your online experience, facilitate processes, personalize and store your settings. Flash cookies may help our website visitors to, for example, set volume preference associated with a video experience, play games and perform surveys. They help us improve our sites by measuring which areas are of greatest interest to customers. They may be recognized by other sites or by our marketing or business partners. Flash cookies are different from browser cookies and the cookie management tools provided by your browser will not remove Flash cookies. Click here to learn how to manage privacy and storage settings for Flash cookies. If you disable Flash cookies or other similar technologies, please be aware that you may not have access to certain features and services that make your online experience more efficient and enjoyable.<br />
                    <h5 className="m-4">Secure Shopping</h5>
                    Sensitive personal information contained in orders placed on the Website are encrypted using 256-bit secure sockets layer (SSL) technology. * In order for SSL security to work, you must use an SSL enabled browser. *Secure Socket Layer (SSL) is a technology used by vendors to ensure the security of online business. It negotiates and employs the essential functions of mutual authentication, data encryption and data integrity for secure transactions. Unfortunately, no data transmission over the Internet or any wireless network can be guaranteed to be 100% secure. As a result, while we strive to protect your Personal Information, you acknowledge that: (a) there are security and privacy limitations of the Internet which are beyond our control; (b) the security, integrity, and privacy of any and all information and data exchanged between you and us through the Website cannot be guaranteed; and (c) any such information and data may be viewed or tampered with in transit by a third party.<br />
                    If you still have concerns about ordering electronically, feel free to call 1-619-743-4274 and place your order over the phone. Have the style number, size, and color ready for each item you wish to order. You can also print your shopping basket page and mail it to:<br />
                    ESME DESIGNS LLC<br />
                    Attn: Customer Service<br />
                    4560 Alvarado Canyon Rd 2A<br />
                    San Diego CA 92120<br />
                    Please note that e-mail is not encrypted and is not considered a secure means of transmitting credit card numbers. We will never ask for sensitive Personal Information via e-mail.<br />
                    *Secure Socket Layer (SSL) is a technology used by vendors to ensure the security of online business. It negotiates and employs the essential functions of mutual authentication, data encryption and data integrity for secure transactions.<br />
                    YOU ARE RESPONSIBLE AT ALL TIMES FOR MAINTAINING THE CONFIDENTIALITY OF ANY PASSWORD OR OTHER ACCESS INFORMATION.<br />
                    <h5 className="m-4">Links to Third-Party Websites</h5>
                    The Website may contain links to the websites of third parties not affiliated with ESME. You understand, acknowledge and agree that these links are provided solely as a convenience to you and not as an endorsement by ESME of the content, advertising or business practices. ESME is NOT responsible for the privacy practices or the content on any of these other websites, including any websites that may indicate a special relationship or "partnership" with ESME. ESME does not disclose unique identifiers to those responsible for the linked websites. The linked websites, however, may collect Personal Information from you when you link to their websites. This collection of information is not subject to the control of ESME. To ensure protection of your privacy, always review the privacy policies of the websites you visit by linking from the Website.<br />
                    <h5 className="m-4">Your California Privacy Rights</h5>
                    This privacy policy describes how we may share your information for marketing purposes, as described above. California residents are entitled to request and obtain from us once per calendar year information about any of your personal information shared with third parties for their own direct marketing purposes, including the categories of information and the names and addresses of those businesses with which we have shared such information. To request this information and for any other questions about our privacy practices and compliance with California law, please contact us as explained below.<br />
                    <h5 className="m-4">Policy Changes</h5>
                    ESME may periodically update this Policy including for new, unanticipated uses not previously disclosed. Any changes made will be posted here. By visiting and continuing to use the Website you agree to accept any changes made to this Policy.<br />
                    Feel free to contact us with any questions about our Policy.<br />
                    Email:  info@esme-designs.com<br />
                    Mail:<br />
                    ESME DESIGNS LLC<br />
                    Attn: Customer Service<br />
                    4560 Alvarado Canyon Rd 2A<br />
                    San Diego CA 92120<br />
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </LayoutTwo>
  );
};

export default Privacy;
