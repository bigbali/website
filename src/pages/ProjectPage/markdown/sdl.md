I often found myself typing into a terminal in order to download music and I had the bright idea, according to which I build an app dedicated to downloading music from YouTube.\
I considered a few frameworks to help me realize that, such as `Tauri` and `Electron`, but in the end I went with `C#` and `WPF`
as I already had some experience with it, and had the confidence that it will be capable to do the job well.

## Under the hood
I'm using [yt-dlp](https://github.com/yt-dlp/yt-dlp) to download the videos, with every download having its dedicated thread with a yt-dlp instance. This allows really nice download speeds.

## What it does
It allows to add videos to a query and lets you download them one by one or all at once.
You've got the options to download in audio or video format, as a playlist or as a single, and where to put the files.
It might seem little, but it does all I need it to do.