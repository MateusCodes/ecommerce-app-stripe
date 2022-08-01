import '../styles/global.css';

import Layout from '../components/Layout';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
    NProgress.configure({ showSpinner: false });

    Router.events.on('routeChangeStart', () => {
        NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
        NProgress.done();
    });

    return (
        <StateContext>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </Head>
            <Layout>
                <Toaster />
                <Component {...pageProps} />
            </Layout>
        </StateContext>
    );
}

export default MyApp;
