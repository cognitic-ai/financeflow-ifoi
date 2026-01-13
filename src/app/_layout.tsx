import { ThemeProvider } from "@/components/theme-provider";
import { TransactionProvider } from "@/contexts/transaction-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { Platform, useWindowDimensions } from "react-native";

export default function Layout() {
  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <ThemeProvider>
      <TransactionProvider>
      {process.env.EXPO_OS === "web" ? (
        <WebTabs
          screenOptions={{
            headerShown: false,
            ...(isMd
              ? {
                  tabBarPosition: "left",
                  tabBarVariant: "material",
                  tabBarLabelPosition: isLg ? undefined : "below-icon",
                }
              : {
                  tabBarPosition: "bottom",
                }),
          }}
        >
          <WebTabs.Screen
            name="(index)"
            options={{
              title: "Overview",
              tabBarIcon: (props) => <MaterialIcons {...props} name="account-balance-wallet" />,
            }}
          />
          <WebTabs.Screen
            name="(info)"
            options={{
              title: "Transactions",
              tabBarIcon: (props) => <MaterialIcons {...props} name="list" />,
            }}
          />
        </WebTabs>
      ) : (
        <NativeTabs>
          <NativeTabs.Trigger name="(index)">
            <Label>Overview</Label>
            <Icon
              {...Platform.select({
                ios: { sf: { default: "wallet.pass", selected: "wallet.pass.fill" } },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="account-balance-wallet" />,
                },
              })}
            />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(info)">
            <Label>Transactions</Label>
            <Icon
              {...Platform.select({
                ios: { sf: "list.bullet" },
                default: {
                  src: <VectorIcon family={MaterialIcons} name="list" />,
                },
              })}
            />
          </NativeTabs.Trigger>
        </NativeTabs>
      )}
      </TransactionProvider>
    </ThemeProvider>
  );
}
