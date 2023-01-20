This is a plugin for the `Babel` JavaScript transpiler that performs `JSX-to-JSX` transformations.\
It's designed to be used with the BEM methodology and is used by me in my own projects.

## How does it work?
It takes special `block`, `elem` and `mods` attributes and replaces them with a single `className`.

## Purpose
At work, we used a similar plugin and I mostly liked it.\
At one point, I wanted to use it in my own projects, but I did not know
how to configure it to work.\
This led me to the idea of creating my own that serves my needs better, and as a bonus it taught me a lot about Babel plugins and computer science in general (especially ASTs :).