import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { MenuView } from '@expo/ui/community/menu';

import { ThemedText } from '@/components/themed-text';
import { CommButton } from '@/types/comm';
import { ALL_GRID_ITEMS } from '@/data/commData'; // chunkArray is no longer needed!
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useComm } from '@/context/commContext';

export function CommGrid() {
  const { gridItems, deleteCustomItem, isLoading } = useComm();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleWordPress = (item: CommButton) => {
    Speech.stop();
    Speech.speak(item.speechText, {
      pitch: 0.8,
      rate: 0.9,
      language: 'en-US',
    });
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.gridContainer}>
        {gridItems.map((item) => {
          const isDefaultItem = ALL_GRID_ITEMS.some((defaultItem) => defaultItem.id === item.id);

          const buttonContent = (
            <TouchableOpacity
              style={styles.gridButton}
              activeOpacity={0.7}
              onPress={() => handleWordPress(item)}
            >
              <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="contain" />
              <ThemedText type="small" style={styles.buttonLabel}>
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          );

          if (isDefaultItem) {
            return <React.Fragment key={item.id}>{buttonContent}</React.Fragment>;
          }

          return (
            <View key={item.id} style={styles.gridButton}>
              <MenuView
                style={styles.fill}
                shouldOpenOnLongPress={true}
                actions={[
                  {
                    id: 'delete',
                    title: 'Delete Button',
                    attributes: { destructive: true },
                    image: 'trash',
                  },
                ]}
                onPressAction={({ nativeEvent }) => {
                  if (nativeEvent.event === 'delete') {
                    deleteCustomItem(item.id);
                  }
                }}
              >
                <TouchableOpacity
                  style={styles.innerButton}
                  activeOpacity={0.7}
                  onPress={() => handleWordPress(item)}
                >
                  <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="contain" />
                  <ThemedText type="small" style={styles.buttonLabel}>
                    {item.label}
                  </ThemedText>
                </TouchableOpacity>
              </MenuView>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Spacing.one,
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'column', // Flows top-to-bottom first, creating columns dynamically
    flexWrap: 'wrap',        // Wraps into a new column after every 4 rows
    alignContent: 'flex-start',
    paddingVertical: Spacing.one,
    gap: 8,
    padding: 8,
  },
  gridButton: {
    width: 100,              // Adjust fixed width per button as needed for column sizing
    height: '23%',           // Ensures exactly 4 rows fit vertically inside the container
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    overflow: 'hidden',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  innerButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '600',
  },
});