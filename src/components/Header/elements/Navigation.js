import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
const Navigation = () => {
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        <li className="position-relative">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Accessories</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={process.env.PUBLIC_URL + "/other/about"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Bridal Collection</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={process.env.PUBLIC_URL + "/other/about"}
              >
                <a>Alencon Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/about-two"
                as={process.env.PUBLIC_URL + "/other/about-two"}
              >
                <a>Bridal Crepe</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/contact"
                as={process.env.PUBLIC_URL + "/other/contact"}
              >
                <a>Bridal English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={process.env.PUBLIC_URL + "/other/faq"}
              >
                <a>Bridal Luxe Chiffon</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/coming-soon"
                as={process.env.PUBLIC_URL + "/other/coming-soon"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Bridal Stretch Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Chantilly Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Lace Embroidered</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Poly Mikado</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Poly Satin</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Sequins Embroidery</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Bridal Plus</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={process.env.PUBLIC_URL + "/other/about"}
              >
                <a>Bridal English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/about-two"
                as={process.env.PUBLIC_URL + "/other/about-two"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/contact"
                as={process.env.PUBLIC_URL + "/other/contact"}
              >
                <a>Chantilly Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={process.env.PUBLIC_URL + "/other/faq"}
              >
                <a>Lace Embroidered</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>Bridesmaids Collection</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={process.env.PUBLIC_URL + "/other/about"}
              >
                <a>Charmeuse Satin</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/about-two"
                as={process.env.PUBLIC_URL + "/other/about-two"}
              >
                <a>English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/contact"
                as={process.env.PUBLIC_URL + "/other/contact"}
              >
                <a>Lace Softly Corded</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={process.env.PUBLIC_URL + "/other/faq"}
              >
                <a>Luxe Chiffon</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/coming-soon"
                as={process.env.PUBLIC_URL + "/other/coming-soon"}
              >
                <a>Sequin Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={process.env.PUBLIC_URL + "/other/not-found"}
              >
                <a>Stretch Crepe</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/" as={process.env.PUBLIC_URL + "/"}>
            <a>About</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/other/about"
                as={process.env.PUBLIC_URL + "/other/about"}
              >
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/about-two"
                as={process.env.PUBLIC_URL + "/other/about-two"}
              >
                <a>Terms and conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/contact"
                as={process.env.PUBLIC_URL + "/other/contact"}
              >
                <a>Privacy policy</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={process.env.PUBLIC_URL + "/other/faq"}
              >
                <a>Shipping</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/coming-soon"
                as={process.env.PUBLIC_URL + "/other/coming-soon"}
              >
                <a>Returns</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
