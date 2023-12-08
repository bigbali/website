export default () => {
    return (
        <>
            <section>
                <h2>
                    What it is
                </h2>
                <p>
                    It is a plugin for the Babel JavaScript transpiler that takes 'block', 'elem', and 'mods'
                    attributes as per the BEM methodology for
                    HTML elements and converts them to reactive 'className' expressions.
                    It is strictly a JSX-to-JSX (meaning that it first converts the specific BEM attributes to 'className',
                    then comes the React.js transpilation step) transformer intended to be used with React.js.
                </p>
            </section>
            <section>
                <h2>
                    Why I made it
                </h2>
                <p>
                    At work, we used the 'rebem' Babel plugin which worked similarly to this.
                    I quickly started to appreciate how clean the the code is following BEM,
                    and wanted to use the plugin in my own projects.
                </p>
                <p>
                   Thankfully, I was too much a dummy to set it up, so I decided to write my own.
                   I do believe it was definitely worth it though :)
                </p>
                <p>
                   In the future, I might rewrite the entire thing to work with SWC.
                </p>
            </section>
            <section>
                <h2>
                    How I made it
                </h2>
                <p>
                    Basically, I wrote tests and worked on the implementation until all the tests passed 🙌
                </p>
            </section>
        </>
    );
};
