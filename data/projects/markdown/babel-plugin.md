This is a plugin for the `Babel` JavaScript transpiler that performs `JSX-to-JSX` transformations.\
It's designed to be used with the BEM methodology and is used by me in my own projects.

## How does it work?
It takes special `block`, `elem` and `mods` attributes and processes them, resulting in a `className`.
These attributes are stripped from the end result.

## Purpose
At work, we used a similar plugin and I generally liked it.\
At one point, I wanted to use it in my own projects, but I did not know
how to configure it to work.\
This led me to the idea of creating my own that serves my needs better, and as a bonus it taught me about Babel plugins and programming languages in general (ASTs is what I have in mind).