import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_GRID_ITEMS } from '@/data/commData'; // Adjust path if needed
import { CommButton } from '@/types/comm'; // Use your actual type definition

const STORAGE_KEY = '@communication_board_custom_items';

interface CommContextType {
  gridItems: CommButton[];
  addCustomItem: (newItem: CommButton) => Promise<void>;
  deleteCustomItem: (id: string) => Promise<void>;
  isLoading: boolean;
}

const CommContext = createContext<CommContextType | undefined>(undefined);

export const CommProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gridItems, setGridItems] = useState<CommButton[]>(ALL_GRID_ITEMS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStoredItems = async () => {
      try {
        const storedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const parsedCustomItems: CommButton[] = JSON.parse(storedData);
          setGridItems([...ALL_GRID_ITEMS, ...parsedCustomItems]);
        }
      } catch (error) {
        console.error('Failed to load custom grid items', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredItems();
  }, []);

  const addCustomItem = async (newItem: CommButton) => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const currentCustom: CommButton[] = storedData ? JSON.parse(storedData) : [];
      
      const updatedCustom = [...currentCustom, newItem];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustom));      

      setGridItems([...ALL_GRID_ITEMS, ...updatedCustom]);
    } catch (error) {
      console.error('Failed to save new grid item', error);
    }
  };

  const deleteCustomItem = async (id: string) => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    const currentCustom: CommButton[] = storedData ? JSON.parse(storedData) : [];
    
    // Filter out the item with the matching id
    const updatedCustom = currentCustom.filter((item) => item.id !== id);
    
    // Save updated list back to AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustom));
    
    // Update global grid state
    setGridItems([...ALL_GRID_ITEMS, ...updatedCustom]);
  } catch (error) {
    console.error('Failed to delete grid item', error);
  }
};

  return (
<CommContext.Provider value={{ gridItems, addCustomItem, deleteCustomItem, isLoading }}>
          {children}
    </CommContext.Provider>
  );
};

export const useComm = () => {
  const context = useContext(CommContext);
  if (!context) {
    throw new Error('useComm must be used within a CommProvider');
  }
  return context;
};