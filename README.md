<p>Projet X - Play video from one youtube channel</p>
<p>1.  git clone https://github.com/sulmanbashir/projetx-react-native.git</p>
<p>2.  cd projetx-react-native && npm install</p>
<p>3.  For running on iOS (only supported by Mac)</p>
<p>    3.1 In your root project run 'npm start' </p>
<p>    3.2 In your folder/finder, go to the root of your project ios/ => click on ProjetX.xcodeproj </p>
<p>    3.3 Run with simulator or your iPhone from xcode</p>
<p>4.  For running on Android</p>
<p>    4.1 In your root project run 'npm start' </p>
<p>    4.2 Connect your Android device to your computer (Android Studio or Android SDK is necessary)</p>
<p>    4.2 Open another terminal, go to your root project and run this command 'react-native run-ios'</p>

<p>Error Solution</p>
<p>If you see this issue :</p>
<p>"Error: While resolving module `react-native-vector-icons/MaterialIcons`, the Haste package `react-native-vector-icons` was found"</p>
<p>Solution: From your root project, run this command :</p>
<p>rm ./node_modules/react-native/local-cli/core/__fixtures__/files/package.json</p>
<p>Now from xcode run again your iOS project</p>
