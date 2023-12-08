export default () => {
    return (
        <>
            <section>
                <h2>
                    Why I made it
                </h2>
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
                <h2>
                    How I made it
                </h2>
                <p>
                    The project initially started as a WPF project with .NET Framework using C#,
                    but recently I moved the entire thing to .NET 7 (formerly .NET Core).
                </p>
                <p>
                    It builds upon the MVVM (Model-View-ViewModel) pattern with the view layer written in XAML.
                </p>
                <p>
                    Due to limitations of WPF, the app can only be run on the Windows platform.
                </p>
            </section>
            <section>
                <h2>
                    How it works
                </h2>
                <p>
                    Under the hood, this app simply runs multiple instances of yt-dlp simultaneously,
                    for each playlist or single video.
                    This can lead to some pretty neat download speeds at the cost of CPU utilization.
                </p>
            </section>
        </>
    );
};
