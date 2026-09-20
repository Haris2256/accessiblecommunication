import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import * as Speech from 'expo-speech';
import { MenuView } from '@expo/ui/community/menu';

import { ThemedText } from '@/components/themed-text';
import { CommButton } from '@/types/comm';
import { chunkArray, ALL_GRID_ITEMS } from '@/data/commData';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useComm } from '@/context/commContext';

export function CommGrid() {
  const { gridItems, deleteCustomItem, isLoading } = useComm();
  const pages = chunkArray(gridItems, 16);

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
    <FlatList
      data={pages}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item: pageItems }) => (
        <View style={styles.pageContainer}>
          <View style={styles.gridContainer}>
            {pageItems.map((item) => {
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
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    width: Dimensions.get('window').width > MaxContentWidth ? MaxContentWidth - 32 : Dimensions.get('window').width - 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    width: '100%',
    paddingVertical: Spacing.one,
    gap: 8,
    padding: 8,
  },
  gridButton: {
    width: '23%',
    height: '15%',
    backgroundColor: 'rgba(150, 150, 150, 0.1)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    overflow: 'hidden', // Ensures inner content respects border radius
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