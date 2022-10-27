import Link from "next/link";
import Router from 'next/router';
import { useEffect, useState } from "react";
import { getCollections } from "../../../redux/actions/navigationActions";

const MobileMenuNav = ({ getActiveStatus }) => {
  const [collections, setCollections] = useState([])
  const [seasonsItems, setSeasonsItems] = useState('')

  useEffect(async () => {
    const response = await getCollections();
    if (response.data.season) {
      const navArray = response.data.collections;
      let seasonArray = {
        seasons: response.data.season
      }
      navArray.push(seasonArray)

      let seasonsTotal = 0;
      response.data.season.map(item => {
        seasonsTotal += parseInt(item.itemsCount)
      })
      setSeasonsItems(seasonsTotal)
      setCollections(navArray)
    } else {
      setCollections(response.data.collections)
    }
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
        "<span className='menu-expand'><i></i></span>"
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
    if (!colId) {
      navigateSeason(252, "Default season")
    } else {
      const collectionArray = {
        collectionId: colId,
        collectionName: colName,
        fabricId: fabricId,
        fabricName: fabricName
      }
      localStorage.setItem('navCollection', JSON.stringify(collectionArray))
      if (fabricId === undefined && fabricName === undefined) {
        localStorage.setItem('router', `/shop/left-sidebar/${colName}`)
        Router.push(`/shop/left-sidebar/${colName}`);
      } else {
        localStorage.setItem('router', `/shop/left-sidebar/${fabricName}`)
        Router.push(`/shop/left-sidebar/${fabricName}`);
      }
    }
  }

  const navigateSeason = (seasonId, seasonName) => {
    const collectionArray = {
      seasonId: seasonId,
      seasonName: seasonName
    }
    localStorage.setItem('navCollection', JSON.stringify(collectionArray))
    localStorage.setItem('router', `/shop/left-sidebar/${seasonName}`)
    Router.push(`/shop/left-sidebar/${seasonName}`);
  }


  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        {collections && collections.map((col, i) =>
          <li key={i} className="menu-item-has-children">
            <a style={{ fontSize: "14px" }} onClick={() => navigate(col.id, col.name)}>{col.name ? col.name : "Seasons"} ({col.itemsCount ? col.itemsCount : seasonsItems})</a>
            <ul className="mobile-sub-menu">
              {col && col.fabrics && col.fabrics.map((item, j) => {
                return (
                  <li key={j}>
                    <a onClick={() => navigate(col.id, col.name, item.id, item.name)}>{item.name} ({item.itemsCount})</a>
                  </li>
                )
              })}
              {col && !col.fabrics && col.seasons.map((item, z) => {
                return (
                  <li key={z}>
                    <a onClick={() => navigateSeason(item.id, item.name)}>{item.name} ({item.itemsCount})</a>
                  </li>
                )
              })}
            </ul>
          </li>
        )}
        <li className="menu-item-has-children">
          <Link href="/other/about" as={"/other/about"}>
            <a style={{ fontSize: "14px" }}>About</a>
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
