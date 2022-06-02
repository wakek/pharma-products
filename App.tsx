import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import RootStoreProvider from './hooks/useRootStore';
import Navigation from './navigation';
import { default as theme } from './theme.json';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <RootStoreProvider>
          <ApplicationProvider
            {...eva} theme={{ ...eva.light, ...theme }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <Navigation />
              <StatusBar backgroundColor="#61dafb" style='dark' />
            </SafeAreaView>
          </ApplicationProvider>
        </RootStoreProvider>
      </>
    );
  }
}
