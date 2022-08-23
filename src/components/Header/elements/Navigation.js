import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
const Navigation = () => {
  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        <li className="position-relative">
          <Link href="/shop/left-sidebar" as={process.env.PUBLIC_URL + "/shop/left-sidebar"}>
            <a>Accessories</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/shop/left-sidebar" as={process.env.PUBLIC_URL + "/shop/left-sidebar"}>
            <a>Bridal Collection</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Alencon Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Crepe</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Luxe Chiffon</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Stretch Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Chantilly Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Lace Embroidered</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Poly Mikado</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Poly Satin</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Sequins Embroidery</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/shop/left-sidebar" as={process.env.PUBLIC_URL + "/shop/left-sidebar"}>
            <a>Bridal Plus</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Bridal Soft Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Chantilly Lace</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Lace Embroidered</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/shop/left-sidebar" as={process.env.PUBLIC_URL + "/shop/left-sidebar"}>
            <a>Bridesmaids Collection</a>
          </Link>
          <IoIosArrowDown />
          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Charmeuse Satin</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>English Net</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Lace Softly Corded</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Luxe Chiffon</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Sequin Tulle</a>
              </Link>
            </li>
            <li>
              <Link
                href="/shop/left-sidebar"
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Stretch Crepe</a>
              </Link>
            </li>
          </ul>
        </li>
        <li className="position-relative">
          <Link href="/other/about" as={process.env.PUBLIC_URL + "/other/about"}>
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
                href="/other/terms"
                as={process.env.PUBLIC_URL + "/other/terms"}
              >
                <a>Terms and conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/privacy"
                as={process.env.PUBLIC_URL + "/other/privacy"}
              >
                <a>Privacy policy</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={process.env.PUBLIC_URL + "/"}
              >
                <a>Shipping</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={process.env.PUBLIC_URL + "/"}
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
