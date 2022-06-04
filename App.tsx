import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ThemeContext } from './contexts/theme-context';
import useCachedResources from './hooks/useCachedResources';
import RootStoreProvider from './hooks/useRootStore';
import Navigation from './navigation';
import { default as custom_theme } from './theme.json';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const [theme, setTheme] = React.useState<string>('light');

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <>
                <IconRegistry icons={EvaIconsPack} />
                <RootStoreProvider>
                    <ThemeContext.Provider value={{ theme, toggleTheme }}>
                        <ApplicationProvider
                            {...eva} theme={{ ...(eva as any)[theme], ...custom_theme }}
                        >
                            <RootSiblingParent>
                                <Navigation />
                                <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
                            </RootSiblingParent>
                        </ApplicationProvider>
                    </ThemeContext.Provider>
                </RootStoreProvider>
            </>
        );
    }
}
