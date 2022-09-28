import Link from "next/link";
import { useEffect } from "react";

const MobileMenuNav = ({ getActiveStatus }) => {
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
  return (
    <nav
      className="offcanvas-mobile-menu__navigation"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li className="menu-item-has-children">
          <Link href="/" as={"/"}>
            <a>Home</a>
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Home Group One</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/home/decor"
                    as={"/home/decor"}
                  >
                    <a>Decor</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/creative"
                    as={"/home/creative"}
                  >
                    <a>Creative</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/perfumes"
                    as={"/home/perfumes"}
                  >
                    <a>Perfumes</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/trending"
                    as={"/home/trending"}
                  >
                    <a>Trending</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href={"/"}>
                <a>Home Group Two</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/home/essentials"
                    as={"/home/essentials"}
                  >
                    <a>Essentials</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/accessories"
                    as={"/home/accessories"}
                  >
                    <a>Accessories</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/lookbook"
                    as={"/home/lookbook"}
                  >
                    <a>Lookbook</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/furniture"
                    as={"/home/furniture"}
                  >
                    <a>Furniture</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Home Group Three</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/home/smart-design"
                    as={"/home/smart-design"}
                  >
                    <a>Smart Design</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/collection"
                    as={"/home/collection"}
                  >
                    <a>Collection</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/jewelry"
                    as={"/home/jewelry"}
                  >
                    <a>Jewelry</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/cosmetics"
                    as={"/home/cosmetics"}
                  >
                    <a>Cosmetics</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Home Group Four</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/home/swimsuit"
                    as={"/home/swimsuit"}
                  >
                    <a>Swimsuit</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/special"
                    as={"/home/special"}
                  >
                    <a>Special</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home/concept"
                    as={"/home/concept"}
                  >
                    <a>Concept</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link
            href="/shop/left-sidebar"
            as={"/shop/left-sidebar"}
          >
            <a>Shop</a>
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a>Group One</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/shop/left-sidebar"
                    as={"/shop/left-sidebar"}
                  >
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/right-sidebar"
                    as={"/shop/right-sidebar"}
                  >
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/no-sidebar"
                    as={"/shop/no-sidebar"}
                  >
                    <a>No Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/fullwidth-no-space"
                    as={"/shop/fullwidth-no-space"}
                  >
                    <a>Full Width No Space</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/fullwidth-no-sidebar"
                    as={"/shop/fullwidth-no-sidebar"}
                  >
                    <a>Full Width No Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/fullwidth-left-sidebar"
                    as={"/shop/fullwidth-left-sidebar"}
                  >
                    <a>Full Width Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/fullwidth-right-sidebar"
                    as={
                      "/shop/fullwidth-right-sidebar"
                    }
                  >
                    <a>Full Width Right Sidebar</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a>Group Two</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/shop/product-basic/[slug]?slug=lorem-ipsum-decor-one"
                    as={
                      process.env.PUBLIC_URL +
                      "/shop/product-basic/lorem-ipsum-decor-one"
                    }
                  >
                    <a>Basic</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/product-fullwidth/[slug]?slug=lorem-ipsum-decor-one"
                    as={
                      process.env.PUBLIC_URL +
                      "/shop/product-fullwidth/lorem-ipsum-decor-one"
                    }
                  >
                    <a>Full Width</a>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/shop/product-fullwidth-right-thumb/[slug]?slug=lorem-ipsum-decor-one"
                    as={
                      process.env.PUBLIC_URL +
                      "/shop/product-fullwidth-right-thumb/lorem-ipsum-decor-one"
                    }
                  >
                    <a>Full Width Right Thumb</a>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/shop/product-sticky/[slug]?slug=lorem-ipsum-decor-one"
                    as={
                      process.env.PUBLIC_URL +
                      "/shop/product-sticky/lorem-ipsum-decor-one"
                    }
                  >
                    <a>Sticky Details</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/cart"
                    as={"/other/cart"}
                  >
                    <a>Shopping Cart</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/wishlist"
                    as={"/other/wishlist"}
                  >
                    <a>Wishlist</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/compare"
                    as={"/other/compare"}
                  >
                    <a>Compare</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link
                href="/shop/left-sidebar"
                as={"/shop/left-sidebar"}
              >
                <a>Group Three</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/other/checkout"
                    as={"/other/checkout"}
                  >
                    <a>Checkout</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/order-tracking"
                    as={"/other/order-tracking"}
                  >
                    <a>Order Tracking</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/my-account"
                    as={"/other/my-account"}
                  >
                    <a>My Account</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/other/login-register"
                    as={"/other/login-register"}
                  >
                    <a>Login Register</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link href="/">
            <a>Elements</a>
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Group One</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/element/product-categories"
                    as={"/element/product-categories"}
                  >
                    <a>Product Categories</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-sliders"
                    as={"/element/product-sliders"}
                  >
                    <a>Product Sliders</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-tabs"
                    as={"/element/product-tabs"}
                  >
                    <a>Product Tabs</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-widgets"
                    as={"/element/product-widgets"}
                  >
                    <a>Product Widget</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/recent-products"
                    as={"/element/recent-products"}
                  >
                    <a>Recent Products</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Group Two</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/element/sale-products"
                    as={"/element/sale-products"}
                  >
                    <a>Sale Products</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/featured-products"
                    as={"/element/featured-products"}
                  >
                    <a>Featured products</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/top-rated-products"
                    as={"/element/top-rated-products"}
                  >
                    <a>Top Rated products</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/best-selling-products"
                    as={
                      "/element/best-selling-products"
                    }
                  >
                    <a>Best Selling</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/product-attributes"
                    as={"/element/product-attributes"}
                  >
                    <a>Product Attributes</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Group Three</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/element/blog-posts"
                    as={"/element/blog-posts"}
                  >
                    <a>Blog Posts</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/mailchimp-forms"
                    as={"/element/mailchimp-forms"}
                  >
                    <a>Mailchimp Form</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/icon-boxes"
                    as={"/element/icon-boxes"}
                  >
                    <a>Icon Box</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/team-members"
                    as={"/element/team-members"}
                  >
                    <a>Team Member</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/faqs"
                    as={"/element/faqs"}
                  >
                    <a>FAQs / Toggles</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link href="/" as={"/"}>
                <a>Group Four</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/element/countdown-timers"
                    as={"/element/countdown-timers"}
                  >
                    <a>Countdown Timer</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/buttons"
                    as={"/element/buttons"}
                  >
                    <a>Buttons</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/testimonials"
                    as={"/element/testimonials"}
                  >
                    <a>Testimonials</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element/google-maps"
                    as={"/element/google-maps"}
                  >
                    <a>Google Maps</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link href="/" as={"/"}>
            <a>Pages</a>
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
                href="/other/about-two"
                as={"/other/about-two"}
              >
                <a>About Us Two</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/contact"
                as={"/other/contact"}
              >
                <a>Contact Us</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/faq"
                as={"/other/faq"}
              >
                <a>F.A.Q</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/coming-soon"
                as={"/other/coming-soon"}
              >
                <a>Coming Soon</a>
              </Link>
            </li>
            <li>
              <Link
                href="/other/not-found"
                as={"/other/not-found"}
              >
                <a>Not Found</a>
              </Link>
            </li>
          </ul>
        </li>

        <li className="menu-item-has-children">
          <Link
            href="/blog/standard-left-sidebar"
            as={"/blog/standard-left-sidebar"}
          >
            <a>Blog</a>
          </Link>
          <ul className="mobile-sub-menu">
            <li className="menu-item-has-children">
              <Link
                href="/blog/standard-left-sidebar"
                as={"/blog/standard-left-sidebar"}
              >
                <a>Standard Layout</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/blog/standard-left-sidebar"
                    as={"/blog/standard-left-sidebar"}
                  >
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/standard-right-sidebar"
                    as={"/blog/standard-right-sidebar"}
                  >
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/standard-fullwidth"
                    as={"/blog/standard-fullwidth"}
                  >
                    <a>Full Width</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link
                href="/blog/grid-left-sidebar"
                as={"/blog/grid-left-sidebar"}
              >
                <a>Grid Layout</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/blog/grid-left-sidebar"
                    as={"/blog/grid-left-sidebar"}
                  >
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/grid-right-sidebar"
                    as={"/blog/grid-right-sidebar"}
                  >
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/grid-fullwidth"
                    as={"/blog/grid-fullwidth"}
                  >
                    <a>Full Width</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link
                href="/blog/list-left-sidebar"
                as={"/blog/list-left-sidebar"}
              >
                <a>List Layout</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/blog/list-left-sidebar"
                    as={"/blog/list-left-sidebar"}
                  >
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/list-right-sidebar"
                    as={"/blog/list-right-sidebar"}
                  >
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/list-fullwidth"
                    as={"/blog/list-fullwidth"}
                  >
                    <a>Full Width</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item-has-children">
              <Link
                href="/blog/post-left-sidebar"
                as={"/blog/post-left-sidebar"}
              >
                <a>Single Post Layout</a>
              </Link>
              <ul className="mobile-sub-menu">
                <li>
                  <Link
                    href="/blog/post-left-sidebar"
                    as={"/blog/post-left-sidebar"}
                  >
                    <a>Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/post-right-sidebar"
                    as={"/blog/post-right-sidebar"}
                  >
                    <a>Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/post-fullwidth"
                    as={"/blog/post-fullwidth"}
                  >
                    <a>Full Width</a>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenuNav;
