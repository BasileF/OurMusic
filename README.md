# OurMusic
## Inspiration
Music, in addition to human connection, makes people feel great! So why not combine the two?
## What it does
OurMusic gives users the ability to share music in a common space. Users can listen to their favorite songs in sync with their friends, colleagues and even strangers! OurMusic can also be used to stream songs privately.
## How we built it
We made use of the Google Cloud Platform, by implementing user authentication with FireAuth and using Firebase's Realtime database for storing user data and syncing music. Express.js and Node.js were used to build a middle-tier and React was used for the front-end. Additionally Octave's TouchTunes Songs API was used for music searches and audio streaming. Lastly, MaterialUI was used to facilitate the development of a clean and friendly user interface.
<p><b>What each technology was used for:</b></p>
<ul>
<li>Firebase: Firebase's authentication and realtime database were used to create and manage users as well as their data/audio syncing</li>
<li>Express.js: Express was used as a middle-tier to handle requests from the front-end to Octave's TouchTunes Songs API</li>
<li>React: React, with the help of MaterialUI was used to build a clean and responsive front-end</li>
<li>TouchTunes Songs API: Used for searching songs and streaming audio</li>
</ul>
## Challenges we ran into
<ul>
<li>CORS policy errors when trying to access responses from the TouchTunes API from the front-end</li>
<li>Syncing audio using Firebase's Realtime Database among several users in the same listening session</li>
</ul>
## Accomplishments that we're proud of
<ul>
<li>Built a secure user login</li>
<li>Nice UI</li>
<li>Working application</li>
<li>Successful audio syncing</li>
</ul>
## What we learned
<ul>
<li>How to use Octave's TouchTunes Songs API</li>
<li>How to resolve CORS Policy response errors by building a middle-tier to handle requests and responses</li>
</ul>
## What's next for OurMusic
Add a friends feature, allowing users to save friends and invite them seamlessly to listening sessions. In addition, allow users to seek and exchange admin permissions in a shared listening session. It would be favorable to add a queue feature to allow users to select songs that will play when the current song is over.
