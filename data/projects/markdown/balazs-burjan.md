This project is the one you are currently browsing.\
Its primary purpose is to expose me and my work to the World Wide Web,
while the secondary is having fun and learning while building it 😃\
It's built with `Next` and is hosted on Vercel's amazing hosting service.
## What's under the hood?
I built this project based on my very own
[React Template project](/project/react-template "Go to React Template project details"),
which in turn is built with my very own [Babel Plugin](/project/babel-plugin "Go to Babel Plugin project details").

- On bigger screens, unless the service times out you can observe a cool 3D animation I made using [Spline](https://spline.design/ "Go to Spline home page")
- On mobile devices, a static image is used in its stead for performance reasons
- Scroll animations are done with `IntersectionObserver`
- The text content for projects is written in `Markdown`
- Google's Lighthouse report indicates a score of 100 for both SEO and Accessibility

### The Stack
- Initially this project was started with `create-react-app` and is now migrated to `Next.js`
- TypeScript
- State management is handled with `Zustand`, which I changed from `Redux` because it reduces boiler-plate code and decreases complexity
- Styling is done with SASS using the SCSS syntax
- I'm using the BEM methodology, with the help of my [plugin](/project/babel-plugin "Go to Babel Plugin project details")

## Issues
This definitely is not the final form of this project, so feel free to open an issue on [GitHub](https://github.com/bigbali/website "Go to GitHub page")
or send a message in case you've got a suggestion or noticed an error!
