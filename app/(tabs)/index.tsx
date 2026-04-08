import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ExternalLink } from '@/components/external-link'

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">List of Members of the Parliament of Åland</ThemedText>
        <ThemedText>
          {`Here you can see a list of all `}
          <ThemedText type="defaultSemiBold">currently</ThemedText> sitting members of the{' '}
          <ThemedText type="defaultSemiBold">parliament of Åland</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ExternalLink href="https://www.lagtinget.ax/">
            <ThemedText type="subtitle">For more information click here</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
