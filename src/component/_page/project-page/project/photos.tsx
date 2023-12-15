export default () => {
    return (
        <>
            <section>
                <h2>
                    About
                </h2>
                <p>
                    The goal of this project is to allow my family to browse and download my photos.
                    It's hosted on Vercel's serverless environment.
                </p>
            </section>
            <section>
                <h2>
                    Behind the scenes
                </h2>
                <p>
                    The admin dashboard works via REST API endpoints.
                    The initial approach was to use SvelteKit's form actions and handle all Cloudinary API requests from the server,
                    but due to limitations of Vercel's serveless environment where the maximum request body size is 4.5MB,
                    I had to separate Cloudinary Admin API calls and Upload API calls between the client and server.
                    Thus, I made an API framework for the client and the server, where each request is routed through the client
                    with Upload API calls being made from here, and Admin API calls
                    (which require authentication with private credentials) are forwarded to the server and handled there.
                    Data storage is handled with Vercel's Postgres service and Prisma.
                </p>
                <p>
                    Thanks to SvelteKit, we also have server-side rendering.
                </p>
                <h2>
                    Stack
                </h2>
                <ul>
                    <li>SvelteKit</li>
                    <li>Prisma</li>
                    <li>Cloudinary</li>
                    <li>Vercel Postgres</li>
                </ul>
            </section>
        </>
    );
};
