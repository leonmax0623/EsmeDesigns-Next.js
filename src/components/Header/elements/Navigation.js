import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { getCollections } from "../../../redux/actions/navigationActions";

const Navigation = () => {
  const [collections, setCollections] = useState('')
  useEffect(async () => {
    const response = await getCollections();
    console.log("NAVIGATIONS => ", collections)
    setCollections(response.data.collections)
  }, [])

  return (
    <nav className="header-content__navigation space-pr--15 space-pl--15 d-none d-lg-block">
      <ul>
        {collections && collections.map((col, i) => {
          return (
            <li key={i} className="position-relative">
              <Link href="/shop/left-sidebar" as={process.env.PUBLIC_URL + "/shop/left-sidebar"}>
                <a>{col.name}</a>
              </Link>
              <IoIosArrowDown />
              <ul className="sub-menu sub-menu--one-column">
                {col && col.fabrics.map((item, j) => {
                  return (
                    <li key={j}>
                      <Link
                        href="/shop/left-sidebar"
                        as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                      >
                        <a>{item.name}</a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
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
