# **Udacity React Nanodegree React-Native Project -> Mobile Flashcards**

This application is built with React Native - and Expo. It is tested only on Android for now.

This is a native iOS and Android application that lets you create quizzes and track your results after taking them. Quizzes are represented by decks which consist of cards, each with a question and an answer. You can create unlimited number of cards for every deck. After completing a quiz you get the number of correct answers as well as percentage of correct answers. If you forget to take a quiz on some day you will get a reminder (local notification) at 8 pm.

**Some technologies used in this project:** 
- React Native allows to create a native app for both iOS and Android
- Redux is used for state management in this project
- Persistent data is stored using AsyncStorage backed by native code
- Stack and Tab Navigation provided by React Navigation library lets user navigate in the app

**Getting Started**

To get started with this repository:

## git clone with HTTPS
git clone https://github.com/Gunner1905/mobile-flashcards.git

## change directory into the cloned repo
cd mobile-flashcards

## install the dependencies
npm install

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:


## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

