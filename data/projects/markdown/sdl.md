I often found myself typing into a terminal to download music,
which led to the idea of an app that makes it easier.\
I considered a few frameworks to help me realize it, 
such as `Tauri` and `Electron`, but in the end, I went with `C#` and `WPF`,
as I already had some experience with them, and had the confidence that they will be capable to do the job well.

## Under the hood
I'm using [yt-dlp](https://github.com/yt-dlp/yt-dlp) to download the videos, with every download having its dedicated thread with a yt-dlp instance.
This makes fast download speeds possible.

## What it does
It allows you to add videos to a query and allows you to download them one by one or all at once.
You've got the options to download in audio or video format, as a playlist, or as a single,
and you also have the of choice where to put the files, or you can infer it from the name of the playlist, or do both.
It might seem little, but it does all I need it to do.