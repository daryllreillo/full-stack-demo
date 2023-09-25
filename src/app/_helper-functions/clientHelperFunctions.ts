import { validate } from 'uuid';
import { signIn } from 'next-auth/react';

import { nameToIcon } from '@/app/_config/nameToIconListConfig';

// provides a random color from the array list
export const getColor: () => string = () => {
  const colorArr = [
    '#D32F2F',
    '#C2185B',
    '#7B1FA2',
    '#512DA8',
    '#303F9F',
    '#0D47A1',
    '#01579B',
    '#006064',
    '#00796B',
    '#388E3C',
    '#689F38',
    '#827717',
    '#F57F17',
    '#FF6F00',
    '#F57C00',
    '#E64A19',
  ];
  const tailwindColorArr = [
    '#991B1B',
    '#9A3412',
    '#92400E',
    '#854D0E',
    '#3F6212',
    '#166534',
    '#065F46',
    '#115E59',
    '#155E75',
    '#075985',
    '#1E40AF',
    '#3730A3',
    '#6B21A8',
    '#86198F',
    '#9F1239',
    '#1F2937',
    '#1E293B',
  ];
  return tailwindColorArr[Math.floor(Math.random() * (tailwindColorArr.length - 1))] + 'A0';
};

// gets the equivalent icon element from the name provided
export const getIcon: (iconName: string) => JSX.Element | null = iconName => {
  const iName = iconName.trim().toLowerCase();
  const isNameFound: boolean = Object.keys(nameToIcon).some(el => el === iName);
  if (isNameFound) {
    const key = iName as keyof typeof nameToIcon;
    return nameToIcon[key];
  } else {
    // returns null if iconName is not found in the maintained object literal nameToIcon
    return null;
  }
};

// checks if id is a valid UUID
export const isValidUuid = (uuid: string) => {
  return validate(uuid);
};

export const zSignIn = (email: string, password?: string | null, token?: string | null) => {
  setTimeout(async () => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const callbackUrl = currentSearchParams?.get('callbackUrl') || '/';
    await signIn('credentials', {
      email: email,
      password: password,
      token: token,
      redirect: true,
      callbackUrl: callbackUrl,
    });
  }, 200);
};
