import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NunitoText } from '../components/StyledText';
import { Strings } from '../constants/Strings';
import { RootStackScreenProps } from '../types';


const NotFoundScreen = ({ navigation }: RootStackScreenProps<'NotFound'>) => {
  return (
    <View style={styles.container}>
      <NunitoText
        style={styles.title}
        weight='bold'
      >
        {Strings.EN.Screen_not_available}
      </NunitoText>
      <TouchableOpacity
        onPress={() => navigation.replace('Root')}
        style={styles.link}
      >
        <NunitoText
          style={styles.linkText}
          weight='regular'
        >
          {Strings.EN.Go_to_home}
        </NunitoText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

export default NotFoundScreen;