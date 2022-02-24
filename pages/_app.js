import Link from 'next/link';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <Link href="/">
                <a >Home</a>
            </Link>
            <a href="/about">About</a>
            <Component {...pageProps} />
            <footer>Jon Meyers was here!</footer>
        </>
    )
};

export default MyApp;