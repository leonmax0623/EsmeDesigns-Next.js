import { Fragment } from "react";
import { FooterTwo } from "../Footer";
import { HeaderSix } from "../Header";

const LayoutTwo = ({ children, aboutOverlay, footerBgClass }) => {
  return (
    <Fragment>
      <HeaderSix aboutOverlay={aboutOverlay} />
      {children}
      <FooterTwo footerBgClass={footerBgClass} />
    </Fragment>
  );
};

export default LayoutTwo;
