import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CommGrid } from '@/components/commGrid'; // Ensure this matches your file path structure
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Communication Board
          </ThemedText>
        </ThemedView>

        <CommGrid />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    paddingBottom: BottomTabInset + Spacing.two,
  },
  header: {
    alignItems: 'center',
    marginVertical: Spacing.two,
  },
  title: {
    textAlign: 'center',
    marginTop: 64,
  },
  subtitle: {
    opacity: 0.6,
    marginTop: 4,
  },
});