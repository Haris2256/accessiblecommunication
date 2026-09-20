import { CommButton } from '@/types/comm';

export const ALL_GRID_ITEMS: CommButton[] = [
  // Page 1: Basics & Needs
  { id: '1', label: 'Yes', speechText: 'Affirmative. Yes.', imageUri: 'https://img.icons8.com/color/96/ok--v1.png' },
  { id: '2', label: 'No', speechText: 'Negative. No.', imageUri: 'https://img.icons8.com/color/96/cancel--v1.png' },
  { id: '3', label: 'Water', speechText: 'I require water please.', imageUri: 'https://img.icons8.com/color/96/water.png' },
  { id: '4', label: 'Food', speechText: 'I require food please.', imageUri: 'https://img.icons8.com/color/96/hamburger.png' },
  { id: '5', label: 'Bathroom', speechText: 'I need to use the restroom.', imageUri: 'https://img.icons8.com/color/96/toilet.png' },
  { id: '6', label: 'Help', speechText: 'Attention required. Help me.', imageUri: 'https://img.icons8.com/color/96/help.png' },
  { id: '7', label: 'Pain', speechText: 'I am experiencing pain.', imageUri: 'https://img.icons8.com/color/96/poor-health.png' },
  { id: '8', label: 'Tired', speechText: 'I am feeling tired.', imageUri: 'https://img.icons8.com/color/96/sleeping-in-bed.png' },
  { id: '9', label: 'Happy', speechText: 'I am feeling happy.', imageUri: 'https://img.icons8.com/color/96/happy.png' },
  { id: '10', label: 'Sad', speechText: 'I am feeling sad.', imageUri: 'https://img.icons8.com/color/96/sad.png' },
  { id: '11', label: 'Hot', speechText: 'The environment is too hot.', imageUri: 'https://img.icons8.com/color/96/sun--v1.png' },
  { id: '12', label: 'Cold', speechText: 'The environment is too cold.', imageUri: 'https://img.icons8.com/color/96/cold.png' },
  { id: '13', label: 'Stop', speechText: 'Cease action. Stop.', imageUri: 'https://img.icons8.com/color/96/hand.png' },
  { id: '14', label: 'More', speechText: 'I request more.', imageUri: 'https://img.icons8.com/color/96/plus--v1.png' },
  { id: '15', label: 'Hello', speechText: 'Greetings user.', imageUri: 'https://img.icons8.com/color/96/handshake.png' },
  { id: '16', label: 'Goodbye', speechText: 'Farewell.', imageUri: 'https://img.icons8.com/color/96/goodbye.png' },

  // Page 2: Additional Actions & Feelings
  { id: '17', label: 'Please', speechText: 'Please.', imageUri: 'https://img.icons8.com/color/96/pray.png' },
  { id: '18', label: 'Thank you', speechText: 'Thank you very much.', imageUri: 'https://img.icons8.com/color/96/flower.png' },
  { id: '19', label: 'Listen', speechText: 'Please listen to me.', imageUri: 'https://img.icons8.com/color/96/ear.png' },
  { id: '20', label: 'Wait', speechText: 'Please wait a moment.', imageUri: 'https://img.icons8.com/color/96/clock.png' },
  { id: '21', label: 'Good', speechText: 'That is good.', imageUri: 'https://img.icons8.com/color/96/facebook-like.png' },
  { id: '22', label: 'Bad', speechText: 'That is bad.', imageUri: 'https://img.icons8.com/color/96/thumbs-down.png' },
  { id: '23', label: 'Sick', speechText: 'I am feeling sick.', imageUri: 'https://img.icons8.com/color/96/thermometer.png' },
  { id: '24', label: 'Medication', speechText: 'I need my medication.', imageUri: 'https://img.icons8.com/color/96/pills.png' },
  { id: '25', label: 'Music', speechText: 'I would like to listen to music.', imageUri: 'https://img.icons8.com/color/96/musical-notes.png' },
  { id: '26', label: 'TV', speechText: 'I would like to watch television.', imageUri: 'https://img.icons8.com/color/96/tv.png' },
  { id: '27', label: 'Walk', speechText: 'I would like to go for a walk.', imageUri: 'https://img.icons8.com/color/96/walking.png' },
  { id: '28', label: 'Sleep', speechText: 'I want to go to sleep.', imageUri: 'https://img.icons8.com/color/96/bed.png' },
  { id: '29', label: 'Friend', speechText: 'Where is my friend?', imageUri: 'https://img.icons8.com/color/96/conference-call.png' },
  { id: '30', label: 'Family', speechText: 'I want to see my family.', imageUri: 'https://img.icons8.com/color/96/family.png' },
  { id: '31', label: 'Phone', speechText: 'I need to use the phone.', imageUri: 'https://img.icons8.com/color/96/phone.png' },
  { id: '32', label: 'Ready', speechText: 'I am ready.', imageUri: 'https://img.icons8.com/color/96/checked.png' },
];

export function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}