export default () => {
    return (
        <section>
            <h2>
                About
            </h2>
            <p>
                The very website you are browsing.
                It's made with Next.js in order to utilize its server-side rendering capabilities.
                It uses the BEM methodology with my own Babel plugin.
                Its successor will likely be made with SvelteKit 🫠
            </p>
            <p>
                If you aren't from a mobile device, you might have seen a 3D scene floating on the landing page.
                This was done with <a href='https://app.spline.design/'>Spline</a>, so feel free to check them out.
                Unfortunately, the performance cost is very high, so I had no choice but to cut it completely from mobile devices.
            </p>
        </section>
    );
};
