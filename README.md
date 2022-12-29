# Geetest captcha slider solver
## Background Info
In 2020 I came up with an idea to create an automatic captcha solver. I mean having a robot to solve anti-robot captchas is pretty neat, right? I knew a little bit about programming, but not that much. So this project was pretty challenging for me.
I did a little bit of a research and found out, that geetest slider will be the easiest to reverse engineer. The geetest slider works by presenting you a picture with a missing puzzle and you need to place the missing puzzle in the right place, to pass the test. I found a few solutions on the internet, that used browsers with Selenium, but that would have been very easy (no need to reverse engineer the script, it is already executing in the browser), so I have decided to create a browserless solution.
Note: I was pretty much a newbie to a programming, so I didn't bother using a version control system, clear file structure nor comments.

## How does the solver work?
There are a few steps, that need to be done before you can succesfully pass a captcha challenge.
1. Reverse engineer the original challenge script, in order to get a broad understanding of how the test works.
2. Construct two captcha images and compare them to find the distance, that we will use to drag the missing puzzle.
3. Once I have the right distance, create a humanlike mouse movements in order to pass the test.
4. Encode some browser fingerprints with mouse movements and send the payload to the endpoint. If you are successful you will get a valid cookie.

## Reverse engineering.
Reverse engineering of the challenge was done with AST (abstract syntax tree) traversion using Babel. Traversions can be found in deobfuscate.js file. Learning about AST was very useful for me, I got much deeper understanding of Javascirpt syntax, that helped me in my future projects.

## Construction of images
Construction of images was pretty easy, once I reverse engineered the challenge into somewhat readable form, I just reused their algorithm and than compared two images pixel by pixel to find out where they differ and to get their x and y coordinates (in which case x is pretty much the distance).

## Create a humanlike movements
This one was pretty difficult, firstly I wanted to use WindMouse algorithm to generate the humanlike movements, but my success rate was under 10%, so I had to create my own solution, after that the success rate jumped to about 95%.

## Encode the payload
Once I reverse engineered the script, I just had to spoof needed browser values and borrow encoding algorithm of the challenge itself to get the right payload.

## Disclaimer
Geetest company was notified and offered some tips to improve security of their test, plus I am not presenting you ready made solution, you need to do a lot of code digging in order to reproduce my results. (Made intentionally to prevent misuse)
