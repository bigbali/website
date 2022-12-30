My most ambitious project so far, centered on strategies and statistics in World of Tanks.
As of now, it's put on hold.

## The idea
As a competitive World of Tanks player, sometimes the need to convey strategies to other team members arose.
There already existed tools to accomplish this, but I wasn't satisfied with them.
The intention was to have secure "rooms" where one could share strategies, but I also wanted to
rip the 3D map data from the game and make it possible to plan strategies in actually rendered 3D maps.\
This is the part I couldn't figure out. :)\
Additionally, I also did plan to implement statistics, but I only managed to get some basic stuff done before I decided to halt the project.

## The technology
The project is built with `React`, `TypeScript`, and [Gun.js](http://gun.js.org/) (check it out, it's amazing!).
Authentication is done with Wargaming.net `OpenID` and data is collected through their public API.\
For the backend I was using `Django`, but `Gun.js` needed a separate node so instead of having 2 separate servers, I thought I should combine them using `Express` and `Node.js`.\
I was using `AWS S3` for storage and `AWS RDS` for the database.

## The future
Since this project was started, there have emerged applications that have had a massive headstart regarding statistics, and realistically,
I could never catch up to them, so the logical conclusion is that it's pointless to put much effort into that.\
However, this still leaves room for strategies, which I will likely pursue in the future,
along with the remake of the entirety of this project with my updated knowledge.
