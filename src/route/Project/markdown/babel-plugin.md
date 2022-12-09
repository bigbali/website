This is a plugin for the `Babel` JavaScript transpiler which performs `JSX-to-JSX` transformations.\
On the image that is close by, you can observe what it actually does, or if not, open it in another tab and zoom in :).
On the left side, you have the input, and on the right, the output; it's literally just a screenshot of one of the test cases.

## How does it work?
It takes special `block`, `elem` and `mods` attributes and converts them to `className`.

## Testing
Tests (in this case) need to be written first, because without them you do not know if you've got the correct output.\
One small change could alter the output and cause the tests to fail, so I'd know that I goofed up.

However, this is not the focus of this paragraph. That would be to mention that I used this tool myself
(and wrote it for my own personal use, as a matter of fact), so I lived with its bugs and features
to discover what needs to be fixed, implemented, or removed.\
Ladies and gentleman, that's how you properly test software!
