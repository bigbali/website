export default () => {
    return (
        <>
            <section>
                <h2>
                    About
                </h2>
                <p>
                    A simple messages app built with the T3 stack, meaning Next.js, tRPC, Prisma, TypeScript, and Tailwind.
                    It has lazy-loaded messages with "infinite" scrolling.
                </p>
            </section>
            <section>
                <h2>
                    Why I made it
                </h2>
                <p>
                    Practice, and fun. 🫡
                    It's part of my example projects initiative, just like the algorithms visualizer.
                </p>
            </section>
            <section>
                <h2>
                    See it in action
                </h2>
                <video src='/msgs.mp4' controls></video>
            </section>
        </>
    );
};
