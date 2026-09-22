import { CommButton } from '@/types/comm';

export const ALL_GRID_ITEMS: CommButton[] = [
  { id: '1', label: 'Granola', speechText: 'I want granola.', imageUri: require('@/assets/photos/granola.png') },
  { id: '2', label: 'Ginger Ale', speechText: 'I want ginger ale.', imageUri: require('@/assets/photos/gingerale.png') },
  { id: '3', label: 'Dorito', speechText: 'I want dorito.', imageUri: require('@/assets/photos/dorito.png') },
  { id: '4', label: 'Oreo', speechText: 'I want oreo.', imageUri: require('@/assets/photos/oreo.png') },
  { id: '5', label: 'Chips', speechText: 'I want chips.', imageUri: require('@/assets/photos/chips.png') },
  { id: '6', label: 'Cheese', speechText: 'I want cheese.', imageUri: require('@/assets/photos/cheese.png') },
  { id: '7', label: 'Juice', speechText: 'I want juice.', imageUri: require('@/assets/photos/juice.png') },
  { id: '8', label: 'Popcorn', speechText: 'I want popcorn.', imageUri: require('@/assets/photos/popcorn.png') },
  { id: '9', label: 'Smarties', speechText: 'I want smarties.', imageUri: require('@/assets/photos/smarties.png') },
  { id: '10', label: 'Spaghetti', speechText: 'I want spaghetti.', imageUri: require('@/assets/photos/spaghetti.png') },
  { id: '11', label: 'Yogurt Drink', speechText: 'I want yogurt drink.', imageUri: require('@/assets/photos/yog_drink.png') },
  { id: '12', label: 'Yogurt', speechText: 'I want yogurt.', imageUri: require('@/assets/photos/yogurt.png') },
  { id: '13', label: 'Apple', speechText: 'I want apple.', imageUri: require('@/assets/photos/apple.png') },
];

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}