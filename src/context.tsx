import React, { createContext, PropsWithChildren } from 'react';

interface StyledProviderProps<Theme extends object = object> {
  development?: boolean;
  theme?: Theme;
}

export const __context__ = createContext({ __DEV__: false, theme: {} });

export const EmotionProvider: React.FC<StyledProviderProps> = <
  T extends object = object
>({
  children,
  development = false,
  theme = {} as T,
}: PropsWithChildren<StyledProviderProps<T>>) => (
  <__context__.Provider
    value={{
      __DEV__: development,
      theme,
    }}
  >
    {children}
  </__context__.Provider>
);
