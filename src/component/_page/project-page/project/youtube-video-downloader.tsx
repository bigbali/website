export default () => {
    return (
        <>
            <section>
                <h1>
                    Why I made it
                </h1>
                <p>
                    For various reasons, I often found myself typing into a terminal to download playlists from YouTube using yt-dlp.
                    I knew that this could be done more efficiently, as I had to wait until the entire playlist has been downloaded
                    so I can start a new download, and I also had to modify the command parameters per playlist.
                </p>
                <p>
                    I also knew that there exist GUI programs that could help me with this, but my needs were a bit unusual,
                    thus I decided to build my own app. I could have modified something already existing,
                    but I really wanted to build it from scratch :)
                </p>
            </section>
            <section>
                <h1>
                    How I made it
                </h1>
                <p>
                    The project initially started as a WPF project with .NET Framework using C#,
                    but recently I moved the entire thing to .NET 7 (formerly .NET Core).
                </p>
                <p>
                    It builds upon the MVVM (Model-View-ViewModel) pattern with the view layer written in XAML.
                </p>
                <p>
                    Due to limitations of the WPF framework, the app can only be run on the Windows platform.
                </p>
            </section>
            <section>
                <h1>
                    How it works
                </h1>
                <p>
                    Under the hood, this app simply runs multiple instances of yt-dlp simultaneously, for each playlist or single.
                    This can lead to some pretty neat download speeds.
                </p>
            </section>
        </>
    );
};
