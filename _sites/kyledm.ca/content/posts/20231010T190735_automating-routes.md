# Automating Routes

~ 20231010T190735 ~

I have been working on setting up my home network again. I previously had established a nice home server setup, but I was using a large clunky rack server which was very hot and took up a lot of space. I wanted to downsize some of my belongings and decided to get rid of the server a couple of years ago. Ever since though, I have been feeling like I haven't quite had the network I would like to have at home.

I used to have a personal streaming server, office suite, file server, and ran a few different websites alongside a whole slew of utilities when I had my old server running.

I don't feel the need to have all the complexity of the old system, and I am not in need of some of the services at this moment and am content to use third parties (such as github instead of hosting GitLab) but I do want some of the features.

In order to scratch this itch, I have finally returned to the problem and over the past weekend I decided to reestablish my personal server setup. This time, I decided to use a small NanoPi 4RS which I had previously purchased a couple years back and have been using as my router.

With a little bit of troubleshooting I was able to get it setup within a few hours spread out over two days. There were a couple of gotchas (such as needing to resize the filesystem after flashing the OS) that were not immediately apparent and required a bit of troubleshooting, but otherwise it was relatively straightforward.

Almost all the tools are running in Docker which is great for automation and containerization. I then establishing some DDNS and routed it through one of my domains so I could access it remotely.

Now I have music, video, live streaming, file storage, torrents, SSL, and plan on adding some features. Its nice because without any subscriptions(minus internet + domain name registration) I can have access to all my home media from home. I then setup some easy pipelines for ripping my CDs and automatically syncing them to the router - this I can now do from any computer remotely as well and update my library from coffee shops or university wifi.

All in all - it feels really good to have my media accessible and to know that I am not on the hook for a monthly fee to a company which may be pushing agenda's I do not agree with. I prefer physical media anyways - so having a digital clone of my physical media is perfectly fine for me - this way I get to have a nice physical collection and I get the benefits of a web platform accessible anywhere.