import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import Login from './src/components/auth/login';
import SignIn from './src/components/auth/signIn';
import DrawerNavigator from './src/components/drawer';
import {StatusBar} from 'react-native';
const Stack = createStackNavigator();
import LoadingScreen from './src/components/loadingScreen';
import {initializeAppData} from './src/components/mainFunctions';

const App = () => {
  const [user, setUser] = useState(undefined);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const authUnsubscribe = auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        await initializeAppData().catch((err) => {
          console.warn('error trying to initialize app data', err);
        });
        setUser(authUser);
      } else {
        setUser(authUser);
      }
      setInitializing(false);
    });
    return () => {
      authUnsubscribe;
    };
  });

  if (initializing) {
    return <LoadingScreen text="Iniciando" />;
  }

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="drawerNavigator" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="#0000"
      />
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
