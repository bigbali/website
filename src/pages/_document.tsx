import {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'

const URL = 'https://www.balazsburjan.com';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon"
                    href={`${URL}/favicon.ico`} />
                <link rel="apple-touch-icon"
                    href={`${URL}/logo192.png`} />
                <link rel="manifest"
                    href={`${URL}/manifest.json`} />
                <meta property="og:image" content={`${URL}/og_img.png`} />
                <meta property="og:title" content="Balázs Burján" />
                <meta property="og:description"
                    content="Balázs Burján is a software developer who creates desktop and web apps with great UI and UX." />
                <meta property="og:url" content={`${URL}/`} />
                <meta property="og:type" content="website" />
                <meta name="description"
                    content="Balázs Burján is a software developer who creates desktop and web apps with great UI and UX." />
                <meta name="author" content="Balázs Burján" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
