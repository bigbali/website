My most ambitious project so far centered on strategies and statistics in World of Tanks.
Currently, I'm not working on it, but in the future, I will likely finish the project.

## The idea
As a competitive World of Tanks player, sometimes the need to convey strategies to other team members arose.
There already existed tools to accomplish this, but I wasn't satisfied with them.
The intention was to have secure "rooms" where one could share strategies, but I also wanted to
rip the 3D map geometry from the game and make it possible to plan strategies in rendered, real-time 3D maps.\
Additionally, I had also planned to show statistics, but since then there have emerged applications
that make this idea redundant.

## The technology
The project is built with `React`, `TypeScript`, and [Gun.js](http://gun.js.org/) (check it out, it's amazing!).
Authentication is done with Wargaming.net `OpenID` and data is collected through their public API.\
For the backend I was using `Django`, but `Gun.js` needed a separate node so instead of having 2 separate servers,
I thought to combine them using `Express` and `Node.js`.\
I was using `AWS S3` for storage and `AWS RDS` for the database.
