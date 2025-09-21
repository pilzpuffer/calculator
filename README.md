##PROJECT NOTES
Even though I really like the font that I've chosen for this project, it's not really ideal for a calculator as it's not monospaced. This was discovered during a testing scenario where long numbers were entered - to prevent overflow, I capped max shown numbers at 12. While this does properly cover scenarios with wider numbers like 2 or 8, narrower numbers (like 1) only end up taking half the display before getting "shortened".

The only solution to this that I've found was a canvas method outlined here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText

But I'm not quite confident about including canvas elements as non-background elements, so I've decided to make peace with this imperfection in the project, at least for now.


##ACKNOWLEDGEMENTS
Soundtrack in this project was made by https://whitebataudio.itch.io and comes from their "Free Cyberpunk Music Loop Pack"

Bezier curves are a mystery to actually calculate, so I'm really grateful that this tool exists out there https://beziercurve.net

"Hacker" background animation is based off this tutorial: https://www.youtube.com/watch?v=-vLtT91fSQQ

