import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CartProvider } from './src/context/CartContext';
import { colors } from './src/theme/tokens';

import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import TrackingScreen from './src/screens/TrackingScreen';
import OrderSuccessScreen from './src/screens/OrderSuccessScreen';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.accent,
  },
};

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
              color: colors.text,
            },
            headerTintColor: colors.text,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: 'Curated Menu' }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Checkout Summary' }}
          />
          <Stack.Screen
            name="Success"
            component={OrderSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tracking"
            component={TrackingScreen}
            options={{ title: 'Order Timeline' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
