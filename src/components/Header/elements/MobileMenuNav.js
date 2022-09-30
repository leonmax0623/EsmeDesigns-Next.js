import Link from "next/link";
import { useEffect, useState } from "react";
import { getCollections } from "../../../redux/actions/navigationActions";

const MobileMenuNav = ({ getActiveStatus }) => {
  const [collections, setCollections] = useState([])

  useEffect(async () => {
    const response = await getCollections();
    setCollections(response.data.collections)
    console.log("NAVIGATIONS MOBILE => ", response.data.collections)
  }, [])

  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };

  const navigate = (colId, colName, fabricId, fabricName) => {
    // console.log("~~~~~~~~~~~!!!!!!!!!!!", colId, fabricId)
    const collectionArray = {
      collectionId: colId,
      collectionName: colName,
      fabricId: fabricId,
      fabricName: fabricName
    }
    localStorage.setItem('navCollection', JSON.stringify(collectionArray))
    Router.push(`/shop/left-sidebar/${fabricName}`);
  }

  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        {collections && collections.map((col, i) =>
          <li key={i} className="menu-item-has-children">
            <a>{col.name}</a>
            <ul className="mobile-sub-menu">
              {col && col.fabrics.map((item, j) => {
                return (
                  <li key={j}>
                    <a onClick={() => navigate(col.id, col.name, item.id, item.name)}>{item.name}</a>
                  </li>
                )
              })}
            </ul>
          </li>
        )}
        <li className="menu-item-has-children">
          <Link href="/other/about" as={"/other/about"}>
            <a>About</a>
          </Link>
          <ul className="mobile-sub-menu">

            <li>
              <Link
                href="/other/about"
                as={"/other/about"}
              >
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/terms"
                as={"/other/terms"}
              >
                <a>Terms and conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/privacy"
                as={"/other/privacy"}
              >
                <a>Privacy policy</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={"/"}
              >
                <a>Shipping</a>
              </Link>
            </li>
            <li>
              <Link
                href="/"
                as={"/"}
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

export default MobileMenuNav;
