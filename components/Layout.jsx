import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Head>
                <title>MateusCodes® Store</title>
                <meta
                    name="description"
                    content="MateusCodes® Ecommerce Store"
                />
            </Head>
            <header>
                <Navbar />
            </header>
            <main className="main-container">{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
