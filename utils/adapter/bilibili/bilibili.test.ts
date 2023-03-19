// for jest : https://stackoverflow.com/a/73901870
const TextEncoder = require('util').TextEncoder;
global.TextEncoder = TextEncoder;

const TextDecoder = require('util').TextEncoder;
global.TextDecoder = TextDecoder;

import {BilibiliAdapter} from "./bilibili";


// TODO: load large json file

const example_long_en_json = {
    "font_size": 0.4,
    "font_color": "#FFFFFF",
    "background_alpha": 0.5,
    "background_color": "#9C27B0",
    "Stroke": "none",
    "body": [{
        "from": 0, "to": 2.32, "location": 0, "content": "I'm really trying to put the model through the paces."
    }, {
        "from": 2.32, "to": 5, "location": 0, "content": "We're going to try Q, which if you think about this"
    }, {
        "from": 5, "to": 7.44, "location": 0, "content": "for a moment, I want the audience to really think about"
    }, {
        "from": 7.44, "to": 9.96, "location": 0, "content": "how would you do a summary of this article"
    }, {
        "from": 9.96, "to": 12.3, "location": 0, "content": "that all starts with Q. It's not easy."
    }, {
        "from": 21.48, "to": 22.84, "location": 0, "content": "It's pretty good."
    }, {
        "from": 22.84, "to": 24.4, "location": 0, "content": "That's pretty good."
    }, {
        "from": 24.4,
        "to": 29.32,
        "location": 0,
        "content": "All right, so I've shown you summarizing an existing article."
    }, {
        "from": 29.32, "to": 32.28, "location": 0, "content": "I want to show you how you can flexibly combine ideas"
    }, {
        "from": 32.28, "to": 34.04, "location": 0, "content": "between different articles."
    }, {
        "from": 34.04, "to": 35.72, "location": 0, "content": "So I'm going to take this article that"
    }, {
        "from": 35.72, "to": 41, "location": 0, "content": "was on Hacker News yesterday, copy paste it,"
    }, {
        "from": 41,
        "to": 43.52,
        "location": 0,
        "content": "and do the same conversation so it has all the context of what"
    }, {
        "from": 43.52, "to": 44.52, "location": 0, "content": "we were just doing."
    }, {
        "from": 44.52, "to": 49.04, "location": 0, "content": "I'm going to say, find one common theme between this"
    }, {
        "from": 49.04, "to": 51.24, "location": 0, "content": "article and the GPT-4 blog."
    }, {
        "from": 55, "to": 57.24, "location": 0, "content": "So this is an article about Pinecone,"
    }, {
        "from": 57.24, "to": 59.76, "location": 0, "content": "which is a Python web app development framework."
    }, {
        "from": 59.76,
        "to": 62.6,
        "location": 0,
        "content": "And it's making the technology more accessible, user friendly."
    }, {
        "from": 62.6, "to": 63.76, "location": 0, "content": "If you don't think that was insightful enough,"
    }, {
        "from": 63.76, "to": 65.6, "location": 0, "content": "you can always give some feedback and say,"
    }, {
        "from": 65.6, "to": 70.64, "location": 0, "content": "that was not insightful enough."
    }, {
        "from": 70.64, "to": 71.4, "location": 0, "content": "Please."
    }, {
        "from": 71.4, "to": 73.04, "location": 0, "content": "No, I'll just even just leave it there,"
    }, {
        "from": 73.04, "to": 74.8, "location": 0, "content": "leave it up to the model to decide."
    }, {
        "from": 74.8, "to": 76.6, "location": 0, "content": "So bridging the gap between powerful technology"
    }, {
        "from": 76.6, "to": 79.64, "location": 0, "content": "and practical applications seems not bad."
    }, {
        "from": 79.64, "to": 82.08, "location": 0, "content": "And of course, you can ask for any other kind of task"
    }, {
        "from": 82.08, "to": 85.28, "location": 0, "content": "you want using its flexible language understanding"
    }, {
        "from": 85.28, "to": 86.04, "location": 0, "content": "and synthesis."
    }, {
        "from": 86.04, "to": 90.84, "location": 0, "content": "You can ask for something like, now turn the GPT-4 blog"
    }, {
        "from": 90.84, "to": 93.48, "location": 0, "content": "post into a rhyming poem."
    }, {
        "from": 102.56, "to": 105.04, "location": 0, "content": "Picked up on opening IEvales, open source for all,"
    }, {
        "from": 105.04, "to": 106.64, "location": 0, "content": "helping to guide answering the call."
    }, {
        "from": 106.64,
        "to": 109.2,
        "location": 0,
        "content": "Which by the way, if you'd like to contribute to this model,"
    }, {
        "from": 109.2, "to": 110.68, "location": 0, "content": "please give us evals."
    }, {
        "from": 110.68, "to": 112.52, "location": 0, "content": "We have an open source evaluation framework"
    }, {
        "from": 112.52, "to": 114.36, "location": 0, "content": "that will help us guide and all of our users"
    }, {
        "from": 114.36, "to": 117.04, "location": 0, "content": "to understand what the model is capable of"
    }, {
        "from": 117.04, "to": 119.52, "location": 0, "content": "and to take it to the next level."
    }, {
        "from": 119.52, "to": 120.32, "location": 0, "content": "So there we go."
    }, {
        "from": 120.32, "to": 123.96, "location": 0, "content": "This is consuming existing content using GPT-4"
    }, {
        "from": 123.96, "to": 127.08, "location": 0, "content": "with a little bit of creativity on top."
    }, {
        "from": 127.08,
        "to": 131.48,
        "location": 0,
        "content": "But next, I want to show you how to build with GPT-4, what"
    }, {
        "from": 131.48, "to": 135.24, "location": 0, "content": "it's like to create with it as a partner."
    }, {
        "from": 135.24, "to": 137.04, "location": 0, "content": "And so the thing we're going to do"
    }, {
        "from": 137.04, "to": 141.12, "location": 0, "content": "is we're going to actually build a Discord bot."
    }, {
        "from": 141.12, "to": 143.08, "location": 0, "content": "I'll build it live and show you the process,"
    }, {
        "from": 143.08, "to": 145.44, "location": 0, "content": "show you debugging, show you what the model can do,"
    }, {
        "from": 145.44,
        "to": 148.32,
        "location": 0,
        "content": "where its limitations are, and how to work with them in order"
    }, {
        "from": 148.32, "to": 149.8, "location": 0, "content": "to achieve new heights."
    }, {
        "from": 149.8, "to": 151.64, "location": 0, "content": "So the first thing I'll do is tell the model"
    }, {
        "from": 151.64, "to": 154.68, "location": 0, "content": "that this time it's supposed to be an AI programming"
    }, {
        "from": 154.68, "to": 155.76, "location": 0, "content": "assistant."
    }, {
        "from": 155.76, "to": 158.44, "location": 0, "content": "Its job is to write things out in pseudocode first"
    }, {
        "from": 158.44, "to": 160.32, "location": 0, "content": "and then actually write the code."
    }, {
        "from": 160.32, "to": 162.64, "location": 0, "content": "And this approach is very helpful"
    }, {
        "from": 162.64,
        "to": 166.16,
        "location": 0,
        "content": "to let the model break down the problem into smaller pieces."
    }, {
        "from": 166.16, "to": 168.16, "location": 0, "content": "And then that way, you're not asking"
    }, {
        "from": 168.16,
        "to": 171.64,
        "location": 0,
        "content": "it to just come up with a super hard solution to a problem"
    }, {
        "from": 171.64, "to": 173.12, "location": 0, "content": "all in one go."
    }, {
        "from": 173.12, "to": 174.56, "location": 0, "content": "It also makes it very interpretable,"
    }, {
        "from": 174.56, "to": 177, "location": 0, "content": "because you can see exactly what the model was thinking,"
    }, {
        "from": 177, "to": 179.6, "location": 0, "content": "and you can even provide corrections if you'd like."
    }, {
        "from": 179.6, "to": 183.72, "location": 0, "content": "So here is the prompt that we're going to ask it."
    }, {
        "from": 183.72, "to": 185.76, "location": 0, "content": "This is the kind of thing that 3.5 would totally"
    }, {
        "from": 185.76, "to": 188.04, "location": 0, "content": "choke on if you tried anything like it."
    }, {
        "from": 188.04,
        "to": 191.16,
        "location": 0,
        "content": "But so we're going to ask for a Discord bot that uses the GPT-4"
    }, {
        "from": 191.16, "to": 195.44, "location": 0, "content": "API to read images and text."
    }, {
        "from": 195.44, "to": 197.48, "location": 0, "content": "Now, there's one problem here, which"
    }, {
        "from": 197.48, "to": 201.92, "location": 0, "content": "is this model's training cutoff is in 2021, which"
    }, {
        "from": 201.92, "to": 204.92, "location": 0, "content": "means it has not seen our new chat completions format."
    }, {
        "from": 204.92,
        "to": 207.76,
        "location": 0,
        "content": "So I literally just went to the blog post from two weeks ago,"
    }, {
        "from": 207.76,
        "to": 211.16,
        "location": 0,
        "content": "copy pasted from the blog post, including the response format."
    }, {
        "from": 211.16, "to": 213.88, "location": 0, "content": "It has not seen the new image extension to that."
    }, {
        "from": 213.88,
        "to": 218.04,
        "location": 0,
        "content": "And so I just kind of wrote that up in just very minimal detail"
    }, {
        "from": 218.04, "to": 220.12, "location": 0, "content": "about how to include images."
    }, {
        "from": 220.12,
        "to": 223.72,
        "location": 0,
        "content": "And now the model can actually leverage that documentation"
    }, {
        "from": 223.72, "to": 227.68, "location": 0, "content": "that it did not have memorized, that it does not know."
    }, {
        "from": 233.68,
        "to": 237.52,
        "location": 0,
        "content": "And in general, these models are very good at using information"
    }, {
        "from": 237.52, "to": 239.32, "location": 0, "content": "that it's been trained on in new ways"
    }, {
        "from": 239.32, "to": 240.92, "location": 0, "content": "and synthesizing new content."
    }, {
        "from": 240.92, "to": 242.96, "location": 0, "content": "And you can see that right here that it actually"
    }, {
        "from": 242.96, "to": 245.64, "location": 0, "content": "wrote an entirely new bot."
    }, {
        "from": 245.64, "to": 248.8, "location": 0, "content": "Now, let's actually see if this bot is"
    }, {
        "from": 248.8, "to": 250.24, "location": 0, "content": "going to work in practice."
    }, {
        "from": 250.24, "to": 252.4, "location": 0, "content": "So you should always look through the code"
    }, {
        "from": 252.4, "to": 253.56, "location": 0, "content": "to get a sense of what it does."
    }, {
        "from": 253.56, "to": 257.92, "location": 0, "content": "Don't run untrusted code from humans or from AIs."
    }, {
        "from": 257.92, "to": 260.92, "location": 0, "content": "And one thing to note is that the Discord API has"
    }, {
        "from": 260.92, "to": 264.2, "location": 0, "content": "changed a lot over time, and particularly"
    }, {
        "from": 264.2,
        "to": 267.04,
        "location": 0,
        "content": "that there's one feature that has changed a lot since this"
    }, {
        "from": 267.04, "to": 269.12, "location": 0, "content": "model was trained."
    }, {
        "from": 269.12, "to": 270.28, "location": 0, "content": "Give it a try."
    }, {
        "from": 270.28, "to": 273.48, "location": 0, "content": "In fact, yes, we are missing the intense keyword."
    }, {
        "from": 273.48, "to": 276.32, "location": 0, "content": "This is something that came out in 2020."
    }, {
        "from": 276.32, "to": 277.72, "location": 0, "content": "So the model does know it exists,"
    }, {
        "from": 277.72, "to": 280.32, "location": 0, "content": "but it doesn't know which version of the Discord API"
    }, {
        "from": 280.32, "to": 281.48, "location": 0, "content": "we're using."
    }, {
        "from": 281.48, "to": 282.8, "location": 0, "content": "So are we out of luck?"
    }, {
        "from": 282.8, "to": 284.4, "location": 0, "content": "Well, not quite."
    }, {
        "from": 284.4, "to": 286.48, "location": 0, "content": "We can just simply paste to the model"
    }, {
        "from": 286.48, "to": 288.88, "location": 0, "content": "exactly the error message, not even going to say,"
    }, {
        "from": 288.88, "to": 290.52, "location": 0, "content": "hey, this is from running your code."
    }, {
        "from": 290.52, "to": 292.6, "location": 0, "content": "Could you please fix it?"
    }, {
        "from": 292.6, "to": 294.6, "location": 0, "content": "We'll just let it run."
    }, {
        "from": 294.6, "to": 295.88, "location": 0, "content": "And the model says, oh, yeah."
    }, {
        "from": 295.88, "to": 297.12, "location": 0, "content": "Whoops, the intense argument."
    }, {
        "from": 297.12, "to": 298.68, "location": 0, "content": "Here's the correct code."
    }, {
        "from": 302.08,
        "to": 304.64,
        "location": 0,
        "content": "Now, let's give this a try, once again, kind of making sure"
    }, {
        "from": 304.64, "to": 306.52, "location": 0, "content": "that we understand what the code is doing."
    }, {
        "from": 306.52, "to": 308.52, "location": 0, "content": "Now, a second issue that can come up"
    }, {
        "from": 308.52, "to": 310.8, "location": 0, "content": "is it doesn't know what environment I'm running in."
    }, {
        "from": 310.8, "to": 313.52, "location": 0, "content": "And if you notice, it says, hey, here's"
    }, {
        "from": 313.52, "to": 315.84, "location": 0, "content": "this inscrutable error message, which"
    }, {
        "from": 315.84,
        "to": 318.32,
        "location": 0,
        "content": "if you've not used Jupyter Notebook a lot with async IO"
    }, {
        "from": 318.32, "to": 321.72, "location": 0, "content": "before, you probably have no idea what this means."
    }, {
        "from": 321.72, "to": 326.44, "location": 0, "content": "But fortunately, once again, you can just"
    }, {
        "from": 326.44, "to": 331.44, "location": 0, "content": "sort of say to the model, hey, I'm using Jupyter."
    }, {
        "from": 331.44, "to": 333.04, "location": 0, "content": "And it's going to run."
    }, {
        "from": 333.04, "to": 340.4, "location": 0, "content": "I'm using Jupyter and would like to make this work."
    }, {
        "from": 340.4, "to": 342.88, "location": 0, "content": "And you fix it."
    }, {
        "from": 342.88, "to": 344.84, "location": 0, "content": "And the specific problem is that there's already"
    }, {
        "from": 344.84,
        "to": 347.68,
        "location": 0,
        "content": "an event loop running, so you need to use this nest-async-io"
    }, {
        "from": 347.68, "to": 349.16, "location": 0, "content": "library."
    }, {
        "from": 349.16, "to": 351.64, "location": 0, "content": "You need to call nest-async-io.apply."
    }, {
        "from": 351.64, "to": 353.76, "location": 0, "content": "The model knows all of this, correctly"
    }, {
        "from": 353.76, "to": 357.84, "location": 0, "content": "instantiates all of these pieces into the bot."
    }, {
        "from": 357.84,
        "to": 360.2,
        "location": 0,
        "content": "It even helpfully tells you, oh, you're running in Jupyter."
    }, {
        "from": 360.2, "to": 362.28, "location": 0, "content": "Well, you can do this bang pip install in order"
    }, {
        "from": 362.28, "to": 364.84, "location": 0, "content": "to install the package if you don't already have it."
    }, {
        "from": 364.84, "to": 367.64, "location": 0, "content": "That was very helpful."
    }, {
        "from": 367.64, "to": 369, "location": 0, "content": "Now we'll run."
    }, {
        "from": 369, "to": 371.24, "location": 0, "content": "And it looks like something happened."
    }, {
        "from": 371.24, "to": 376.56, "location": 0, "content": "So the first thing I'll do is go over to our Discord."
    }, {
        "from": 376.56, "to": 382.6, "location": 0, "content": "And I will paste in a screenshot of our Discord itself."
    }, {
        "from": 382.6, "to": 386.24, "location": 0, "content": "So remember, GPT-4 is not just a language model."
    }, {
        "from": 386.24, "to": 388.92, "location": 0, "content": "It's also a vision model."
    }, {
        "from": 388.92, "to": 391.16, "location": 0, "content": "In fact, it can flexibly accept inputs"
    }, {
        "from": 391.16, "to": 394.12, "location": 0, "content": "that intersperse images and text arbitrarily,"
    }, {
        "from": 394.12, "to": 395.72, "location": 0, "content": "kind of like a document."
    }, {
        "from": 395.72, "to": 398.84, "location": 0, "content": "Now the image feature is in preview."
    }, {
        "from": 398.84, "to": 400.84, "location": 0, "content": "So this is going to be a little sneak peek."
    }, {
        "from": 400.84, "to": 402.36, "location": 0, "content": "It's not yet publicly available."
    }, {
        "from": 402.36, "to": 404.56, "location": 0, "content": "It's something we're working with one partner called"
    }, {
        "from": 404.56, "to": 406.36, "location": 0, "content": "Be My Eyes in order to really start to develop it"
    }, {
        "from": 406.36, "to": 408.24, "location": 0, "content": "and get it ready for prime time."
    }, {
        "from": 408.24, "to": 409.62, "location": 0, "content": "But you can ask anything you like."
    }, {
        "from": 409.62, "to": 417.48, "location": 0, "content": "For example, I'll say, GPT-4, hello world,"
    }, {
        "from": 417.48, "to": 425.16, "location": 0, "content": "can you describe this image in painstaking detail?"
    }, {
        "from": 425.16, "to": 426.76, "location": 0, "content": "All right, which first of all, think"
    }, {
        "from": 426.76, "to": 428.2, "location": 0, "content": "of how you would do this yourself."
    }, {
        "from": 428.2, "to": 429.6, "location": 0, "content": "There's a lot of different things"
    }, {
        "from": 429.6, "to": 431.08, "location": 0, "content": "you could latch onto, a lot of different pieces"
    }, {
        "from": 431.08, "to": 432.6, "location": 0, "content": "of the system you could describe."
    }, {
        "from": 432.6, "to": 434.2, "location": 0, "content": "And we can go over to the actual code."
    }, {
        "from": 434.2,
        "to": 437.24,
        "location": 0,
        "content": "And we can see that, yep, we in fact received the message,"
    }, {
        "from": 437.24, "to": 441.72, "location": 0, "content": "have formatted an appropriate request for our API."
    }, {
        "from": 441.72, "to": 443, "location": 0, "content": "And now we wait."
    }, {
        "from": 443, "to": 444.92, "location": 0, "content": "Because one of the things we have to do"
    }, {
        "from": 444.92, "to": 446.44, "location": 0, "content": "is we have to make the system faster."
    }, {
        "from": 446.44,
        "to": 448.96,
        "location": 0,
        "content": "That's one of the things that we're working on optimizing."
    }, {
        "from": 448.96,
        "to": 451.04,
        "location": 0,
        "content": "In the meanwhile, I just want to say to the audience that's"
    }, {
        "from": 451.04, "to": 453.08, "location": 0, "content": "watching, we'll take an audience request next."
    }, {
        "from": 453.08,
        "to": 457,
        "location": 0,
        "content": "So if you have an image and a task you'd like to accomplish,"
    }, {
        "from": 457, "to": 458.52, "location": 0, "content": "please submit that to the Discord."
    }, {
        "from": 458.52, "to": 460.64, "location": 0, "content": "Our moderators will pick one that we'll run."
    }, {
        "from": 465.24, "to": 467.72, "location": 0, "content": "So we can see that the Discord, oh, it"
    }, {
        "from": 467.72, "to": 469.28, "location": 0, "content": "looks like we have a response."
    }, {
        "from": 469.28, "to": 470.72, "location": 0, "content": "Perfect."
    }, {
        "from": 470.72,
        "to": 473.2,
        "location": 0,
        "content": "So it's a screenshot of a Discord application interface."
    }, {
        "from": 473.2, "to": 473.72, "location": 0, "content": "Pretty good."
    }, {
        "from": 473.72, "to": 474.76, "location": 0, "content": "Did not even describe it."
    }, {
        "from": 474.76, "to": 476.12, "location": 0, "content": "It knows that it's Discord."
    }, {
        "from": 476.12, "to": 478, "location": 0, "content": "It's probably Discord written there somewhere"
    }, {
        "from": 478, "to": 481.48, "location": 0, "content": "where it just kind of knows this from prior experience."
    }, {
        "from": 481.48, "to": 484, "location": 0, "content": "Server icon label GPT-4 describes the interface"
    }, {
        "from": 484, "to": 485.2, "location": 0, "content": "in great detail."
    }, {
        "from": 485.2, "to": 487.12, "location": 0, "content": "Talks about all the people telling me"
    }, {
        "from": 487.12, "to": 489.2, "location": 0, "content": "that I'm supposed to do queue."
    }, {
        "from": 489.2, "to": 491.48, "location": 0, "content": "Very kind audience."
    }, {
        "from": 491.48, "to": 494.82, "location": 0, "content": "And describes a bunch of the notification messages"
    }, {
        "from": 494.82, "to": 496.68, "location": 0, "content": "and the users that are in the channel."
    }, {
        "from": 496.68, "to": 497.8, "location": 0, "content": "And so there you go."
    }, {
        "from": 497.8, "to": 499.92, "location": 0, "content": "That's some pretty good understanding."
    }, {
        "from": 499.92, "to": 503, "location": 0, "content": "Now this next one, if you notice, first of all,"
    }, {
        "from": 503,
        "to": 508.24,
        "location": 0,
        "content": "we got a post, but the model did not actually see the message."
    }, {
        "from": 508.24, "to": 509.72, "location": 0, "content": "So is this a failure of the model"
    }, {
        "from": 509.72, "to": 511.76, "location": 0, "content": "or of the system around the model?"
    }, {
        "from": 511.76, "to": 513.56, "location": 0, "content": "Well, we can take a look."
    }, {
        "from": 513.56, "to": 516.36, "location": 0, "content": "And if you notice here, content is an empty string."
    }, {
        "from": 516.36, "to": 519.72, "location": 0, "content": "We received a blank message contents."
    }, {
        "from": 519.72, "to": 521.6, "location": 0, "content": "The reason for this is a dirty trick"
    }, {
        "from": 521.6, "to": 523.36, "location": 0, "content": "that we played on the AI."
    }, {
        "from": 523.36, "to": 528.24, "location": 0, "content": "So if you go to the Discord documentation"
    }, {
        "from": 528.24, "to": 531.44, "location": 0, "content": "and you scroll through it all the way down"
    }, {
        "from": 531.44, "to": 538.04, "location": 0, "content": "to the message content intent, you'll"
    }, {
        "from": 538.04, "to": 541.04, "location": 0, "content": "see this was added as of September 2022"
    }, {
        "from": 541.04, "to": 542.72, "location": 0, "content": "as a required field."
    }, {
        "from": 542.72,
        "to": 545.6,
        "location": 0,
        "content": "So in order to receive a message that does not explicitly tag"
    }, {
        "from": 545.6,
        "to": 550.16,
        "location": 0,
        "content": "you, you now have to include this new intent in your code."
    }, {
        "from": 550.16, "to": 552.36, "location": 0, "content": "Remember I said, intents have changed a lot over time."
    }, {
        "from": 552.36, "to": 553.96, "location": 0, "content": "This is much newer than the model"
    }, {
        "from": 553.96, "to": 556.44, "location": 0, "content": "is possibly able to know."
    }, {
        "from": 556.44, "to": 557.84, "location": 0, "content": "So maybe we're out of luck."
    }, {
        "from": 557.84, "to": 559.36, "location": 0, "content": "We have to debug this by hand."
    }, {
        "from": 559.36, "to": 562.48, "location": 0, "content": "But once again, we can try to use GPD4's language"
    }, {
        "from": 562.48, "to": 566.16, "location": 0, "content": "understanding capabilities to solve this."
    }, {
        "from": 566.16, "to": 568.12, "location": 0, "content": "Now keep in mind, this is a document of like,"
    }, {
        "from": 568.12, "to": 571.32, "location": 0, "content": "I think this is like 10,000, 15,000 words, something"
    }, {
        "from": 571.32, "to": 571.96, "location": 0, "content": "like that."
    }, {
        "from": 571.96, "to": 573.2, "location": 0, "content": "It's not formatted very well."
    }, {
        "from": 573.2, "to": 575.72, "location": 0, "content": "This is literally a command A copy paste."
    }, {
        "from": 575.72, "to": 577.68, "location": 0, "content": "This is what it's supposed to parse through"
    }, {
        "from": 577.68, "to": 580.04, "location": 0, "content": "to find in the middle of that document that, oh yeah,"
    }, {
        "from": 580.04, "to": 580.8, "location": 0, "content": "message contents."
    }, {
        "from": 580.8, "to": 582.16, "location": 0, "content": "That's required now."
    }, {
        "from": 582.16, "to": 583.96, "location": 0, "content": "But let's see if it can do it."
    }, {
        "from": 583.96,
        "to": 590.76,
        "location": 0,
        "content": "So we will ask for, I am receiving blank message contents."
    }, {
        "from": 590.76, "to": 592.2, "location": 0, "content": "Can you?"
    }, {
        "from": 592.2, "to": 593.28, "location": 0, "content": "Why could this be happening?"
    }, {
        "from": 596.32, "to": 596.96, "location": 0, "content": "How do I fix it?"
    }, {
        "from": 601, "to": 604.44, "location": 0, "content": "So one thing that's new about GPD4 is context length."
    }, {
        "from": 604.44, "to": 606.8, "location": 0, "content": "32,000 tokens is kind of the upper limit"
    }, {
        "from": 606.8, "to": 608.24, "location": 0, "content": "that we support right now."
    }, {
        "from": 608.24, "to": 613.24, "location": 0, "content": "And the model is able to flexibly use long documents."
    }, {
        "from": 613.24, "to": 614.88, "location": 0, "content": "It's something we're still optimizing."
    }, {
        "from": 614.88, "to": 619.72, "location": 0, "content": "So we recommend trying it out, but not necessarily"
    }, {
        "from": 619.72, "to": 622.04, "location": 0, "content": "really scaling it up just yet, unless you"
    }, {
        "from": 622.04, "to": 624.2, "location": 0, "content": "have an application that really benefits from it."
    }, {
        "from": 624.2, "to": 626.12, "location": 0, "content": "So if you're really interested in long context,"
    }, {
        "from": 626.12, "to": 627.08, "location": 0, "content": "please let us know."
    }, {
        "from": 627.08, "to": 630.32, "location": 0, "content": "We want to see what kinds of applications it unlocks."
    }, {
        "from": 630.32,
        "to": 633.44,
        "location": 0,
        "content": "But if you see, it says, oh yeah, message content intent"
    }, {
        "from": 633.44, "to": 634.44, "location": 0, "content": "was not enabled."
    }, {
        "from": 634.44,
        "to": 637.12,
        "location": 0,
        "content": "And so you can either ask the model to write some code for you"
    }, {
        "from": 637.12,
        "to": 643.28,
        "location": 0,
        "content": "or you could actually just do it the old fashioned way."
    }, {
        "from": 643.28, "to": 645.68, "location": 0, "content": "Either way is fine."
    }, {
        "from": 645.68, "to": 647.52, "location": 0, "content": "Think that this is an augmenting tool."
    }, {
        "from": 647.52, "to": 648.96, "location": 0, "content": "Makes you much more productive."
    }, {
        "from": 648.96,
        "to": 651.52,
        "location": 0,
        "content": "But it's still important that you are in the driver's seat"
    }, {
        "from": 651.52, "to": 654.52, "location": 0, "content": "and are the manager and knows what's going on."
    }, {
        "from": 654.52, "to": 656.64, "location": 0, "content": "So now we're connected once again."
    }, {
        "from": 656.64, "to": 671.08, "location": 0, "content": "And Boris, would you like to rerun the message?"
    }, {
        "from": 671.08, "to": 673.32, "location": 0, "content": "Once again, we can see that we have received it,"
    }, {
        "from": 673.32, "to": 676.6, "location": 0, "content": "even though the bot was not explicitly tagged."
    }, {
        "from": 676.6, "to": 682.64, "location": 0, "content": "Seems like a pretty good description."
    }, {
        "from": 682.64, "to": 684.44, "location": 0, "content": "This is an interesting image, actually."
    }, {
        "from": 684.44, "to": 686.08, "location": 0, "content": "It looks like it's a Dali-generated one."
    }, {
        "from": 686.08, "to": 687.96, "location": 0, "content": "Let's actually try this one as well."
    }, {
        "from": 694.32, "to": 695.92, "location": 0, "content": "What's funny about this image?"
    }, {
        "from": 695.92, "to": 697.08, "location": 0, "content": "Oh, it's already been submitted."
    }, {
        "from": 700.84, "to": 702.52, "location": 0, "content": "So once again, we can verify that it's"
    }, {
        "from": 702.52, "to": 703.64, "location": 0, "content": "making the right API calls."
    }, {
        "from": 707.16, "to": 708.4, "location": 0, "content": "Squirrels do typically eat nuts."
    }, {
        "from": 708.4,
        "to": 711.4,
        "location": 0,
        "content": "We don't expect them to use a camera or act like a human."
    }, {
        "from": 711.4, "to": 713.8, "location": 0, "content": "So I think that's a pretty good explanation of why"
    }, {
        "from": 713.8, "to": 715.52, "location": 0, "content": "that image is funny."
    }, {
        "from": 715.52, "to": 719.28, "location": 0, "content": "I'm going to show you one more example of what"
    }, {
        "from": 719.28, "to": 722, "location": 0, "content": "you can do with this model."
    }, {
        "from": 722,
        "to": 727.12,
        "location": 0,
        "content": "So I have here a nice hand-drawn mock-up of a joke website."
    }, {
        "from": 727.12, "to": 730.52, "location": 0, "content": "Definitely worthy of being put up on my refrigerator."
    }, {
        "from": 730.52, "to": 733.92, "location": 0, "content": "So I'm just going to take out my phone,"
    }, {
        "from": 733.92, "to": 739.4, "location": 0, "content": "literally take a photo of this mock-up."
    }, {
        "from": 739.4, "to": 753.6, "location": 0, "content": "And then I'm going to send it to our Discord."
    }, {
        "from": 753.6, "to": 755.32, "location": 0, "content": "All right, going to send it to our Discord."
    }, {
        "from": 765.2, "to": 767.12, "location": 0, "content": "This is, of course, the rockiest part,"
    }, {
        "from": 767.12,
        "to": 773.08,
        "location": 0,
        "content": "making sure that we actually send it to the right channel, which"
    }, {
        "from": 773.08,
        "to": 780.8,
        "location": 0,
        "content": "in fact, I think maybe I did not send it to the wrong channel."
    }, {
        "from": 780.8, "to": 781.32, "location": 0, "content": "It's funny."
    }, {
        "from": 781.32, "to": 784.84, "location": 0, "content": "It's always the sort of non-AI parts of these demos"
    }, {
        "from": 784.84, "to": 786.28, "location": 0, "content": "that are the hardest part to do."
    }, {
        "from": 793.16, "to": 795.24, "location": 0, "content": "And here we go."
    }, {
        "from": 795.24, "to": 799.52, "location": 0, "content": "Technology is now solved."
    }, {
        "from": 799.52, "to": 800.56, "location": 0, "content": "And now we wait."
    }, {
        "from": 803.76, "to": 805.8, "location": 0, "content": "So the thing that's amazing in my mind"
    }, {
        "from": 805.8, "to": 808.48, "location": 0, "content": "is that what's going on here is we're"
    }, {
        "from": 808.48, "to": 810.56, "location": 0, "content": "talking to a neural network."
    }, {
        "from": 810.56, "to": 812.68, "location": 0, "content": "And this neural network was trained"
    }, {
        "from": 812.68, "to": 814.72, "location": 0, "content": "to predict what comes next."
    }, {
        "from": 814.72, "to": 817.84, "location": 0, "content": "It played this game of being shown a partial document"
    }, {
        "from": 817.84, "to": 819.28, "location": 0, "content": "and then predicted what comes next"
    }, {
        "from": 819.28, "to": 822.12, "location": 0, "content": "across an unimaginably large amount of content."
    }, {
        "from": 822.12, "to": 824.6, "location": 0, "content": "And from there, it learns all of these skills"
    }, {
        "from": 824.6, "to": 827.76, "location": 0, "content": "that you can apply in all of these very flexible ways."
    }, {
        "from": 827.76, "to": 830.64, "location": 0, "content": "And so we can actually take now this output."
    }, {
        "from": 830.64, "to": 834.6, "location": 0, "content": "So literally, we just said to output the HTML"
    }, {
        "from": 834.6, "to": 837.76, "location": 0, "content": "from that picture."
    }, {
        "from": 837.76, "to": 839.8, "location": 0, "content": "And here we go."
    }, {
        "from": 839.8, "to": 844.04, "location": 0, "content": "Actual working JavaScript filled in the jokes."
    }, {
        "from": 844.04, "to": 853.32, "location": 0, "content": "For comparison, this was the original of our mockup."
    }, {
        "from": 853.32,
        "to": 858.16,
        "location": 0,
        "content": "And so there you go, going from hand-drawn beautiful art,"
    }, {
        "from": 858.16, "to": 862.32, "location": 0, "content": "if I do say so myself, to working website."
    }, {
        "from": 862.32, "to": 863.88, "location": 0, "content": "And this is all just potential."
    }, {
        "from": 863.88, "to": 866.6, "location": 0, "content": "You can see lots of different applications."
    }, {
        "from": 866.6,
        "to": 869.32,
        "location": 0,
        "content": "We ourselves are still figuring out new ways to use this."
    }, {
        "from": 869.32, "to": 871.16, "location": 0, "content": "So we're going to work with our partner."
    }, {
        "from": 871.16, "to": 872.24, "location": 0, "content": "We're going to scale it from there."
    }, {
        "from": 872.24, "to": 873.48, "location": 0, "content": "But please be patient, because it's"
    }, {
        "from": 873.48, "to": 875.16, "location": 0, "content": "going to take us some time to really make"
    }, {
        "from": 875.16, "to": 878.6, "location": 0, "content": "this available for everyone."
    }, {
        "from": 878.6, "to": 880.72, "location": 0, "content": "So I have one last thing to show you."
    }, {
        "from": 880.72, "to": 883.48, "location": 0, "content": "I've shown you reading existing content."
    }, {
        "from": 883.48,
        "to": 888.6,
        "location": 0,
        "content": "I've shown you how to build with the system as a partner."
    }, {
        "from": 888.6, "to": 890.68, "location": 0, "content": "The last thing I'm going to show is"
    }, {
        "from": 890.68,
        "to": 893.84,
        "location": 0,
        "content": "how to work with the system to accomplish a task that none"
    }, {
        "from": 893.84, "to": 896.8, "location": 0, "content": "of us like to do, but we all have to."
    }, {
        "from": 896.8, "to": 897.92, "location": 0, "content": "So you may have guessed."
    }, {
        "from": 897.92, "to": 901.44, "location": 0, "content": "The thing we're going to do is taxes."
    }, {
        "from": 901.44, "to": 904.92, "location": 0, "content": "Now note that GPT is not a certified tax professional,"
    }, {
        "from": 904.92,
        "to": 908.36,
        "location": 0,
        "content": "nor am I. So you should always check with your tax advisor."
    }, {
        "from": 908.36,
        "to": 911.36,
        "location": 0,
        "content": "But it can be helpful to understand some dense content,"
    }, {
        "from": 911.36, "to": 913.2, "location": 0, "content": "to just be able to empower yourself"
    }, {
        "from": 913.2, "to": 916.24, "location": 0, "content": "to be able to solve problems and get a handle on what's"
    }, {
        "from": 916.24, "to": 918.52, "location": 0, "content": "happening when you could not otherwise."
    }, {
        "from": 918.52, "to": 920.2, "location": 0, "content": "So once again, I'll do a system message."
    }, {
        "from": 920.2,
        "to": 923.92,
        "location": 0,
        "content": "In this case, I'm going to tell it that it's tax GPT, which"
    }, {
        "from": 923.92,
        "to": 926.52,
        "location": 0,
        "content": "is not a specific thing that we've trained into this model."
    }, {
        "from": 926.52,
        "to": 929.02,
        "location": 0,
        "content": "You can be very creative, if you want, with the system message,"
    }, {
        "from": 929.02,
        "to": 931.44,
        "location": 0,
        "content": "to really get the model in the mood of what is your job?"
    }, {
        "from": 931.44, "to": 933.4, "location": 0, "content": "What are you supposed to do?"
    }, {
        "from": 933.4, "to": 936.52, "location": 0, "content": "So I've pasted in the tax code."
    }, {
        "from": 936.52, "to": 939.4, "location": 0, "content": "This is about 16 pages worth of tax code."
    }, {
        "from": 939.4, "to": 941.24, "location": 0, "content": "And there's this question about Alice and Bob."
    }, {
        "from": 941.24, "to": 942.92, "location": 0, "content": "They got married at one point."
    }, {
        "from": 942.92, "to": 944.24, "location": 0, "content": "And here are their incomes."
    }, {
        "from": 944.24, "to": 945.64, "location": 0, "content": "And they take a standard deduction."
    }, {
        "from": 945.64, "to": 946.64, "location": 0, "content": "They're filing jointly."
    }, {
        "from": 946.64,
        "to": 951.52,
        "location": 0,
        "content": "So first question, what is their standard deduction for 2018?"
    }, {
        "from": 951.52, "to": 953.56, "location": 0, "content": "So while the model is chugging, I'm"
    }, {
        "from": 953.56, "to": 955.64, "location": 0, "content": "going to solve this problem by hand"
    }, {
        "from": 955.64, "to": 956.92, "location": 0, "content": "to show you what's involved."
    }, {
        "from": 956.92,
        "to": 960.16,
        "location": 0,
        "content": "So the standard deduction is the basic standard deduction"
    }, {
        "from": 960.16, "to": 961.08, "location": 0, "content": "plus the additional."
    }, {
        "from": 961.08, "to": 966, "location": 0, "content": "The basic one is 200% for joint return of subparagraph C,"
    }, {
        "from": 966, "to": 967.12, "location": 0, "content": "which is here."
    }, {
        "from": 967.12, "to": 968.84, "location": 0, "content": "So additional doesn't apply."
    }, {
        "from": 968.84, "to": 971.04, "location": 0, "content": "The limitation doesn't apply."
    }, {
        "from": 971.04, "to": 972.4, "location": 0, "content": "OK, these apply."
    }, {
        "from": 972.4, "to": 973.12, "location": 0, "content": "Oh, wait."
    }, {
        "from": 973.12, "to": 975.28, "location": 0, "content": "Special rules for taxable year 2018,"
    }, {
        "from": 975.28, "to": 978.28, "location": 0, "content": "which is the one we care about, through 2025,"
    }, {
        "from": 978.28, "to": 980.8, "location": 0, "content": "you have to substitute 12,000 for 3,000."
    }, {
        "from": 980.8, "to": 986.08, "location": 0, "content": "So 200% of 12,000, 24,000 is the final answer."
    }, {
        "from": 986.08, "to": 989.92, "location": 0, "content": "If you notice, the model got to the same conclusion."
    }, {
        "from": 989.92, "to": 994.84, "location": 0, "content": "And you can actually read through its explanation."
    }, {
        "from": 994.84, "to": 996.6, "location": 0, "content": "And to tell you the truth, the first time"
    }, {
        "from": 996.6, "to": 999.4, "location": 0, "content": "I tried to approach this problem myself,"
    }, {
        "from": 999.4, "to": 1000.8, "location": 0, "content": "I could not figure it out."
    }, {
        "from": 1000.8, "to": 1003.24, "location": 0, "content": "I spent half an hour reading through the tax code,"
    }, {
        "from": 1003.24, "to": 1005, "location": 0, "content": "trying to figure out this back reference"
    }, {
        "from": 1005, "to": 1006.48, "location": 0, "content": "and why there's subparagraph."
    }, {
        "from": 1006.48, "to": 1008.12, "location": 0, "content": "Just what's even going on?"
    }, {
        "from": 1008.12,
        "to": 1011,
        "location": 0,
        "content": "It was only by asking the model to spell out its reasoning."
    }, {
        "from": 1011, "to": 1012.56, "location": 0, "content": "And then I followed along."
    }, {
        "from": 1012.56, "to": 1014.6, "location": 0, "content": "And I was like, oh, I get it now."
    }, {
        "from": 1014.6, "to": 1016.4, "location": 0, "content": "I understand how this works."
    }, {
        "from": 1016.4,
        "to": 1019.56,
        "location": 0,
        "content": "And so that, I think, is where the power of the system lies."
    }, {
        "from": 1019.56, "to": 1021.6, "location": 0, "content": "It's not perfect, but neither are you."
    }, {
        "from": 1021.6, "to": 1023.64, "location": 0, "content": "And together, it's this amplifying tool"
    }, {
        "from": 1023.64, "to": 1026.36, "location": 0, "content": "that lets you just reach new heights."
    }, {
        "from": 1026.36, "to": 1027.68, "location": 0, "content": "And you can go further."
    }, {
        "from": 1027.68, "to": 1032.4, "location": 0, "content": "You can say, OK, now calculate their total liability."
    }, {
        "from": 1038.2, "to": 1039, "location": 0, "content": "And here we go."
    }, {
        "from": 1039, "to": 1055.84, "location": 0, "content": "It's doing the calculation."
    }, {
        "from": 1055.84, "to": 1059.28, "location": 0, "content": "Honestly, every time it does it, it's amazing."
    }, {
        "from": 1059.28, "to": 1061.6, "location": 0, "content": "This model is so good at mental math."
    }, {
        "from": 1061.6, "to": 1063.52, "location": 0, "content": "It's way, way better than I am at mental math."
    }, {
        "from": 1063.52, "to": 1065.32, "location": 0, "content": "It's not hooked up to a calculator."
    }, {
        "from": 1065.32, "to": 1067.04, "location": 0, "content": "That's another way that you could really"
    }, {
        "from": 1067.04, "to": 1068.16, "location": 0, "content": "try to enhance these systems."
    }, {
        "from": 1068.16, "to": 1070.48, "location": 0, "content": "But it has these raw capabilities"
    }, {
        "from": 1070.48, "to": 1071.52, "location": 0, "content": "that are so flexible."
    }, {
        "from": 1071.52, "to": 1072.72, "location": 0, "content": "It doesn't care if it's code."
    }, {
        "from": 1072.72, "to": 1074.08, "location": 0, "content": "It doesn't care if it's language."
    }, {
        "from": 1074.08, "to": 1075.56, "location": 0, "content": "It doesn't care if it's tax."
    }, {
        "from": 1075.56, "to": 1077.56, "location": 0, "content": "All of these capabilities in one system"
    }, {
        "from": 1077.56,
        "to": 1080.68,
        "location": 0,
        "content": "that can be applied towards the problem that you care about,"
    }, {
        "from": 1080.68, "to": 1083.8, "location": 0, "content": "towards your application, towards whatever you build."
    }, {
        "from": 1083.8, "to": 1086.28, "location": 0, "content": "And so to end it, the final thing that I will show"
    }, {
        "from": 1086.28, "to": 1089.32, "location": 0, "content": "is a little other dose of creativity,"
    }, {
        "from": 1089.32,
        "to": 1101.2,
        "location": 0,
        "content": "which is now summarize this problem into a rhyming poem."
    }, {
        "from": 1101.2, "to": 1102.4, "location": 0, "content": "And there we go."
    }, {
        "from": 1102.4, "to": 1105.84, "location": 0, "content": "A beautiful, beautiful poem about doing your taxes."
    }, {
        "from": 1105.84, "to": 1107.92, "location": 0, "content": "So thank you, everyone, for tuning in."
    }, {
        "from": 1107.92,
        "to": 1111.2,
        "location": 0,
        "content": "I hope you learned something about what the model can do,"
    }, {
        "from": 1111.2, "to": 1112.36, "location": 0, "content": "how to work with it."
    }, {
        "from": 1112.36, "to": 1114.92, "location": 0, "content": "And honestly, we're just really excited to see"
    }, {
        "from": 1114.92, "to": 1116.48, "location": 0, "content": "what you're going to build."
    }, {
        "from": 1116.48, "to": 1117.8, "location": 0, "content": "I've talked about OpenAI evals."
    }, {
        "from": 1117.8, "to": 1118.64, "location": 0, "content": "Please contribute."
    }, {
        "from": 1118.64, "to": 1120.76, "location": 0, "content": "We think that this model, improving it,"
    }, {
        "from": 1120.76, "to": 1122.56, "location": 0, "content": "bringing it to the next level, is something"
    }, {
        "from": 1122.56, "to": 1124.08, "location": 0, "content": "that everyone can contribute to."
    }, {
        "from": 1124.08, "to": 1126.44, "location": 0, "content": "And we think it can really benefit a lot of people."
    }, {
        "from": 1126.44, "to": 1127.92, "location": 0, "content": "And we want your help to do that."
    }, {
        "from": 1127.92, "to": 1128.8, "location": 0, "content": "So thank you very much."
    }, {
        "from": 1128.8, "to": 1149.68, "location": 0, "content": "We're so excited to see what you're going to build."
    }, {
        "from": 1188.8, "to": 1189.8, "location": 0, "content": "Thank you."
    }]
}

const example_short_en_json = {
    "font_size": 0.4,
    "font_color": "#FFFFFF",
    "background_alpha": 0.5,
    "background_color": "#9C27B0",
    "Stroke": "none",
    "body": [{
        "from": 0, "to": 2.32, "location": 0, "content": "I'm really trying to put the model through the paces."
    }, {
        "from": 2.32, "to": 5, "location": 0, "content": "We're going to try Q, which if you think about this"
    }, {
        "from": 5, "to": 7.44, "location": 0, "content": "for a moment, I want the audience to really think about"
    }, {
        "from": 7.44, "to": 9.96, "location": 0, "content": "how would you do a summary of this article"
    }, {
        "from": 9.96, "to": 12.3, "location": 0, "content": "that all starts with Q. It's not easy."
    }, {
        "from": 21.48, "to": 22.84, "location": 0, "content": "It's pretty good."
    }, {
        "from": 22.84, "to": 24.4, "location": 0, "content": "That's pretty good."
    }, {
        "from": 24.4,
        "to": 29.32,
        "location": 0,
        "content": "All right, so I've shown you summarizing an existing article."
    }, {
        "from": 29.32, "to": 32.28, "location": 0, "content": "I want to show you how you can flexibly combine ideas"
    }, {
        "from": 32.28, "to": 34.04, "location": 0, "content": "between different articles."
    }, {
        "from": 34.04, "to": 35.72, "location": 0, "content": "So I'm going to take this article that"
    }, {
        "from": 35.72, "to": 41, "location": 0, "content": "was on Hacker News yesterday, copy paste it,"
    }, {
        "from": 41,
        "to": 43.52,
        "location": 0,
        "content": "and do the same conversation so it has all the context of what"
    }, {
        "from": 43.52, "to": 44.52, "location": 0, "content": "we were just doing."
    }, {
        "from": 44.52, "to": 49.04, "location": 0, "content": "I'm going to say, find one common theme between this"
    }, {
        "from": 49.04, "to": 51.24, "location": 0, "content": "article and the GPT-4 blog."
    }, {
        "from": 55, "to": 57.24, "location": 0, "content": "So this is an article about Pinecone,"
    }]
}

const example_short_zh_json = {
    "font_size": 0.4,
    "font_color": "#FFFFFF",
    "background_alpha": 0.5,
    "background_color": "#9C27B0",
    "Stroke": "none",
    "type": "AIsubtitle",
    "lang": "zh",
    "version": "en-v1.2.0.4-t0.3.c",
    "body": [{
        "from": 0.12, "to": 0.72, "sid": 1, "location": 2, "content": "在这里雄心勃勃"
    }, {
        "from": 0.72, "to": 2.36, "sid": 2, "location": 2, "content": "我真的在努力让模特通过测试"
    }, {
        "from": 2.36, "to": 4.09, "sid": 3, "location": 2, "content": "我们要试试Q"
    }, {
        "from": 4.09, "to": 5.51, "sid": 4, "location": 2, "content": "如果你想一下这个"
    }, {
        "from": 5.51, "to": 7.35, "sid": 5, "location": 2, "content": "我想让观众真正思考"
    }, {
        "from": 7.35, "to": 11.34, "sid": 6, "location": 2, "content": "你如何做一篇以Q开头的文章摘要"
    }, {
        "from": 11.34, "to": 12.62, "sid": 7, "location": 2, "content": "不容易"
    }, {
        "from": 21.58, "to": 22.54, "sid": 8, "location": 2, "content": "挺好的"
    }, {
        "from": 22.54, "to": 24, "sid": 9, "location": 2, "content": "那很好"
    }, {
        "from": 24, "to": 25, "sid": 10, "location": 2, "content": "所有的权利"
    }, {
        "from": 25, "to": 29.189, "sid": 11, "location": 2, "content": "我已经向你展示了一篇现有文章的总结"
    }, {
        "from": 29.189, "to": 33.589, "sid": 12, "location": 2, "content": "我想向你展示如何灵活地将不同文章之间的想法结合起来"
    }, {
        "from": 33.589, "to": 37.62, "sid": 13, "location": 2, "content": "所以我要把昨天黑客新闻上的这篇文章"
    }, {
        "from": 38.74, "to": 42.4, "sid": 14, "location": 2, "content": "复制粘贴并进行相同的对话"
    }, {
        "from": 42.4, "to": 44.28, "sid": 15, "location": 2, "content": "所以它有我们刚刚做的所有背景"
    }, {
        "from": 44.28, "to": 45.349, "sid": 16, "location": 2, "content": "我要说"
    }, {
        "from": 45.349, "to": 51.64, "sid": 17, "location": 2, "content": "在本文和GP Four博客之间找到一个共同的主题"
    }, {
        "from": 54.86, "to": 57.34, "sid": 18, "location": 2, "content": "所以这是一篇关于松果的文章"
    }, {
        "from": 57.34, "to": 59.52, "sid": 19, "location": 2, "content": "它是一个Python Web应用程序开发框架"
    }, {
        "from": 59.52, "to": 61.58, "sid": 20, "location": 2, "content": "它使这项技术更容易获得"
    }, {
        "from": 61.58, "to": 62.53, "sid": 21, "location": 2, "content": "用户友好"
    }, {
        "from": 62.53, "to": 63.85, "sid": 22, "location": 2, "content": "如果你认为这还不够有洞察力"
    }, {
        "from": 63.85, "to": 68.22, "sid": 23, "location": 2, "content": "你总是可以给出一些反馈，说这没有洞察力"
    }]
}


test('test subtitleSplitText short zh', () => {
    const bba = new BilibiliAdapter("");
    bba.lang = "中文"
    const result = bba.subtitleSplitText(example_short_zh_json);
    // TODO: why a \n more?
    expect(result).toEqual(['请用中文总结以下这段视频的部分字幕，字幕时间是从0.12到0.72，字幕的第一部分是\n' + '在这里雄心勃勃\n' + '我真的在努力让模特通过测试\n' + '我们要试试Q\n' + '如果你想一下这个\n' + '我想让观众真正思考\n' + '你如何做一篇以Q开头的文章摘要\n' + '不容易\n' + '挺好的\n' + '那很好\n' + '所有的权利\n' + '我已经向你展示了一篇现有文章的总结\n' + '我想向你展示如何灵活地将不同文章之间的想法结合起来\n' + '所以我要把昨天黑客新闻上的这篇文章\n' + '复制粘贴并进行相同的对话\n' + '所以它有我们刚刚做的所有背景\n' + '我要说\n' + '在本文和GP Four博客之间找到一个共同的主题\n' + '所以这是一篇关于松果的文章\n' + '它是一个Python Web应用程序开发框架\n' + '它使这项技术更容易获得\n' + '用户友好\n' + '如果你认为这还不够有洞察力\n' + '你总是可以给出一些反馈，说这没有洞察力。\n' + "注意一共有1段。"]);
})


test('test subtitleSplitText long en', () => {
    const bba = new BilibiliAdapter("");
    bba.lang = "中文"
    const result = bba.subtitleSplitText(example_long_en_json);
    expect(result.length).toEqual(2);
    expect(result[1]).toEqual(
        "请用中文总结以下这段视频的部分字幕，字幕时间是从1188.8到1189.8，字幕第1部分是\n" +
        "what you're going to build.\n" +
        "I've talked about OpenAI evals.\n" +
        "Please contribute.\n" +
        "We think that this model, improving it,\n" +
        "bringing it to the next level, is something\n" +
        "that everyone can contribute to.\n" +
        "And we think it can really benefit a lot of people.\n" +
        "And we want your help to do that.\n" +
        "So thank you very much.\n" +
        "We're so excited to see what you're going to build.\n" +
        "Thank you.。"
    );
})

// TODO: test longer json file
