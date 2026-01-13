import * as AC from '@bacons/apple-colors';
import { Stack } from 'expo-router';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const AppleStackPreset: NativeStackNavigationOptions =
  process.env.EXPO_OS !== 'ios'
    ? {}
    : {
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: 'transparent',
        },
        headerBlurEffect: 'systemChromeMaterial',
        headerBackButtonDisplayMode: 'default',
      };

export default function Layout() {
  return (
    <Stack screenOptions={AppleStackPreset}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Overview',
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="add-transaction"
        options={{
          presentation: 'modal',
          title: 'Add Transaction',
          headerTitleStyle: {
            color: AC.label as any,
          },
        }}
      />
    </Stack>
  );
}
