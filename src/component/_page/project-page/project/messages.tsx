export default () => {
    return (
        <>
            <section>
                <h1>
                    What it is
                </h1>
                <p>
                    A simple messages app built with the T3 stack, meaning Next.js, tRPC, Prisma, TypeScript, and Tailwind.
                    It has lazy-loaded messages with "infinite" scrolling.
                </p>
            </section>
            <section>
                <h1>
                    Why I made it
                </h1>
                <p>
                    Practice, and fun. 🫡
                    It's part of my example projects initiative, just like the algorithms visualizer.
                </p>
            </section>
            <section>
                <h1>
                    See it in action
                </h1>
                <video src='/msgs.mp4' controls></video>
            </section>
        </>
    );
};
