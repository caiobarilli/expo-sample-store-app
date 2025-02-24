import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useSession } from '@/hooks/useSession';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/login" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="(root)"
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                    }}
                />
                <Drawer.Screen
                    name="logout"
                    options={{
                        drawerLabel: 'Logout',
                        title: 'overview',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
