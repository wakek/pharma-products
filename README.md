<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/wakek/pharma-products">
    <img src="https://i.imgur.com/lUy49cx.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Pharma Products</h3>

  <p align="center">
    An expo react native project to manage (CRUD) a drug listing.
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites & Installation](#prerequisites-&-installation)
* [Usage](#usage)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- div with flex wrap for images -->
<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
  <img src="https://i.imgur.com/grWK2vL.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/fVJfkN6.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/dLSKrOi.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/EDe8Uvc.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/IKgFkOI.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/2pFxjhR.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
  <img src="https://i.imgur.com/8KJ6y3O.png" alt="drawing" width="200" style="border: 1px solid rgba(0,0,0,0.05)"/>
</div>

Pharma-Products is a react native mobile app built to perform CRUD operations on local storage, with initial data fetched from [mocky](http://www.mocky.io/v2/5c3e15e63500006e003e9795).

Here are the list of functions that can be performed in this app:

* Displaying a list of products and their historical prices. List items show name and latest price.
* Add new products and a set price as well.
* Delete products.
* Edit products and set a new price.

### Built With

Pharma-Products was built with the following:

* [React Native](https://reactnative.dev/)
* [Expo](https://docs.expo.dev/)
* [UI Kitten](https://akveo.github.io/react-native-ui-kitten/)
* [MobX](https://mobx.js.org/README.html)

<!-- GETTING STARTED -->
## Getting Started

To get Pharma-Products up and running on your local machine, kindly follow these steps.

### Prerequisites & Installation

Ensure you have the following software installed:

* [node & npm](https://nodejs.org/en/download/)
  * upgrade to the latest version of npm if an older version is already installed

    ```sh
    npm install npm@latest -g
    ```

  * check if node and npm are installed installed by running `node -v` and `npm -v`

    ```sh
    node -v
    ```

    ```sh
    npm -v
    ```

* The [Expo](https://docs.expo.dev/get-started/installation/) platform should be installed

    ```sh
    npm install --global expo-cli
    ```

* The project's npm packages must be installed in the project's root directory:
  
    ```sh
    expo install
    ```


## Available Scripts

The following scripts are available to run on your local machine:

### `npm start`

Runs your app in development mode.

Open it in the [Expo Go app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```sh
npm start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

<!-- CONTACT -->
## Contact

[LinkedIn](https://www.linkedin.com/in/william-a-k-e-k-003b3612a/)
[Project](https://github.com/wakek/pharma-products)
