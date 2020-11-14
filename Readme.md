## Covid Tracker by UtterLabs
---
A cross-platform mobile app built entirely with React Native and Typescript!
---
The data-per-country is taken from the Covid-19 API built on Johns Hopkins University, while the one used for daily updates is scraped from the web, with the use of the [node.js app](https://github.com/gianlourbano/covid-scraper) present in my repository.

---

### Android
First of all, install [Chocolatey](https://chocolatey.org/install) so that you can install the main dependencies for React Native in the powershell with 
`choco install -y nodejs.install python2 openjdk8`

Then run `npm install` in the root folder to install all project dependencies.

To build the app for android, open the **android** folder in Android Studio and run a gradle build (Android SDK 29 is required)

After the build is finished, run `npm run android` while your android emulator is active to start debugging. Enjoy!

---

###iOS

**TO-DO**
