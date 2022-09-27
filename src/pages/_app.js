import App from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "../assets/scss/styles.scss";
import Preloader from "../components/Preloader";
import products from "../data/products.json";
// import API from '../api';
import withReduxStore from "../lib/with-redux-store";
import fetchProducts from "../redux/actions/productActions";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.persistor = persistStore(props.reduxStore);
    props.reduxStore.dispatch(fetchProducts(products));
    // props.reduxStore.dispatch(fetchProducts(products));

    // var tokenInStorage = localStorage.getItem('accessToken')

    // var formData = {
    //   feaMethod: 'getProductsList',
    //   accessToken: 'e80d268999f94b9223eef340bca67626f1aea85e',
    //   page: 1,
    //   pageSize: 300,
    // }

    // API.post('/', new URLSearchParams(formData))
    //   .then(response => {
    //     console.log('response', response);

    //     var realProducts = response.data.items.filter((item) => item.picture !== undefined && item.picture.length > 0)

    //     props.reduxStore.dispatch(fetchProducts(realProducts));
    //     // const cookie = response.data.accessToken;
    //     // localStorage.setItem('accessToken', cookie)
    //     // // cookies.set("accessToken", cookie, [{ maxAge: 3600000 }])
    //     // Router.push('/');
    //     // addToast("Successfully Logged In", { appearance: "success", autoDismiss: true });

    //   })
    //   .catch(error => {
    //     console.log('error', error.response);
    //     // addToast(error.response.data.description, { appearance: "error", autoDismiss: true });
    //   });
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Fragment>
        <Head>
          <title>Esme Designs</title>
          <link rel="icon" href={"/favicon.ico"} />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <ToastProvider placement="bottom-left">
          <Provider store={reduxStore}>
            <PersistGate loading={<Preloader />} persistor={this.persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Provider>
        </ToastProvider>
      </Fragment>
    );
  }
}

export default withReduxStore(MyApp);
