import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput, View, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useComm } from '@/context/commContext';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  const { addCustomItem } = useComm();
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    // Slightly reduced bottom inset padding
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.two,
  };
  const theme = useTheme();

  // Form State
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [buttonLabel, setButtonLabel] = useState('');
  const [speechText, setSpeechText] = useState('');

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Camera permission is required to take pictures for buttons.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveButton = async () => {
    if (!imageUri) {
      Alert.alert('Missing Image', 'Please take a picture for the button first.');
      return;
    }
    if (!speechText) {
      Alert.alert('Missing Speech Text', 'Please enter the text that should be read when this button is pressed.');
      return;
    }

    const newButton = {
      id: Date.now().toString(),
      label: buttonLabel || speechText,
      speechText: speechText,
      imageUri: imageUri,
    };

    try {
      await addCustomItem(newButton);

      router.back()
      
      setImageUri(null);
      setButtonLabel('');
      setSpeechText('');
    } catch (error) {
      console.error('Failed to save button:', error);
      Alert.alert('Error', 'Could not save the button. Please try again.');
    }
  };

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: Math.max(insets.top - 10, Spacing.two), // Reduced top padding
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.three, // Reduced from Spacing.six
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Add Communication Button</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            Take a photo, label it, and set the robotic voice phrase.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.formContainer}>
          {/* Photo Preview / Capture Box */}
          <Pressable style={[styles.imagePreviewBox, { borderColor: theme.text }]} onPress={handleTakePhoto}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
            ) : (
              <ThemedText style={styles.centerText} type="small">
                Tap here to open Camera & Take Picture
              </ThemedText>
            )}
          </Pressable>

          {/* Optional Button Name Input */}
          <View style={styles.inputGroup}>
            <ThemedText type="small">Button Label (Optional)</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              placeholder="e.g., Toy, Ball, Mom"
              placeholderTextColor="#888"
              value={buttonLabel}
              onChangeText={setButtonLabel}
            />
          </View>

          {/* Speech Text Input */}
          <View style={styles.inputGroup}>
            <ThemedText type="small">Spoken Text (Required)</ThemedText>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              placeholder="e.g., I want to play with my toy."
              placeholderTextColor="#888"
              value={speechText}
              onChangeText={setSpeechText}
            />
          </View>

          {/* Save Button */}
          <Pressable style={styles.saveButton} onPress={handleSaveButton}>
            <ThemedText style={styles.saveButtonText}>Save Button to Grid</ThemedText>
          </Pressable>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: Spacing.four,
  },
  titleContainer: {
    gap: Spacing.one, // Tightened gap
    alignItems: 'center',
    paddingVertical: Spacing.two, // Reduced from Spacing.four
  },
  centerText: {
    textAlign: 'center',
  },
  formContainer: {
    gap: Spacing.three, // Reduced gap between fields
    width: '100%',
    paddingBottom: Spacing.four,
  },
  imagePreviewBox: {
    width: 130, // Slightly reduced size to save vertical space
    height: 130,
    alignSelf: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(150,150,150,0.05)',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  inputGroup: {
    gap: 4, // Tightened gap between label and input box
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8, // Slightly more compact padding
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});