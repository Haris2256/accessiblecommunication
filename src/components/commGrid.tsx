import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, ActivityIndicator, useWindowDimensions } from 'react-native';
import * as Speech from 'expo-speech';
import { MenuView } from '@expo/ui/community/menu';

import { ThemedText } from '@/components/themed-text';
import { CommButton } from '@/types/comm';
import { ALL_GRID_ITEMS } from '@/data/commData';
import { Spacing } from '@/constants/theme';
import { useComm } from '@/context/commContext';

export function CommGrid() {
  const { gridItems, deleteCustomItem, isLoading } = useComm();
  const { width, height } = useWindowDimensions();

  // Dynamically calculate button sizes based on device screen dimensions
  const buttonWidth = width * 0.28;
  const buttonHeight = height * 0.18;

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
      style={styles.scrollWrapper}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.gridContainer}>
        {gridItems.map((item) => {
          const isDefaultItem = ALL_GRID_ITEMS.some((defaultItem) => defaultItem.id === item.id);

          const buttonContent = (
            <TouchableOpacity
              style={[styles.gridButton, { width: buttonWidth, height: buttonHeight }]}
              activeOpacity={0.7}
              onPress={() => handleWordPress(item)}
            >
              <Image source={item.imageUri} style={styles.image} resizeMode="contain" />              
              <ThemedText type="small" style={styles.buttonLabel} numberOfLines={1}>
                {item.label}
              </ThemedText>
            </TouchableOpacity>
          );

          if (isDefaultItem) {
            return <React.Fragment key={item.id}>{buttonContent}</React.Fragment>;
          }

          return (
            <View key={item.id} style={[styles.gridButton, { width: buttonWidth, height: buttonHeight }]}>
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
                  <Image source={item.imageUri} style={styles.image} resizeMode="contain" />              
                  <ThemedText type="small" style={styles.buttonLabel} numberOfLines={1}>
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
  scrollWrapper: {
    flexGrow: 0,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.one,
    alignItems: 'center',
  },
  gridContainer: {
    flexDirection: 'column', // Flows top-to-bottom to create vertical columns
    flexWrap: 'wrap',        // Wraps to a new column after 3 items
    alignContent: 'flex-start',
    gap: 12,
  },
  gridButton: {
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    overflow: 'hidden',
    padding: 8,
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
    width: '85%',
    height: '70%',
    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
});