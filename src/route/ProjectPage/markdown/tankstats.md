My most ambitious project so far, centered on strategies and statistics in World of Tanks.
As of now, it's put on hold.

## The idea
As a competitive World of Tanks player who played in some of the best Hungarian (or occasionally, some of the best international) teams,
we needed a tool to share team strategies.\
These tools did and do exist, but they are below the level I consider adequate, so I had the idea to build one to rule them all.\
The intention was to have encrypted (cryptographically secure) rooms where one could share strategies, but perhaps the hardest
part was ripping the 3D map data from the game and making it possible to plan strategies using these. This is the part I do not
yet have figured out.\
Additionally, I also did plan to implement statistics, but I only managed to get some basic stuff done before I decided to halt the project.

## The technology
The project is built with `React` and `TypeScript`, and for the encryption and one part of the database I was using `Gun.js` (check it out, it's amazing!).
Authentication is done with Wargaming.net `OpenID`, and the data is collected from their public API.\
For the backend I was using `Django`, but `Gun.js` needed a separate node so instead of having 2 separate servers, I thought I should combine them using `Express` and `Node.js`.\
I was using `AWS S3` for storage and `AWS RDS` for database.

## The future
Since this project was started, there have emerged applications that have had a massive headstart regarding statistics, and realistically,
I could never catch up to them, so the logical conclusion is that it's pointless to put much effort into that.\
However, this still leaves room for strategies, which I will likely pursue in the future,
along with the remake of the entirety of this project with my updated knowledge.

## Why are you showing me this project?
For a couple of reasons:
- it's interesting
- a lot of the stuff is already implemented
- I intend to finish it one day