import React, { createContext, PropsWithChildren } from 'react';

interface StyledProviderProps<Theme extends object = object> {
  theme?: Theme;
}

export interface Context {
  theme: object;
}

export const __context__ = createContext<Context>({ theme: {} });

export const EmotionProvider: React.FC<StyledProviderProps> = <
  T extends object = object
>({
  children,
  theme = {} as T,
}: PropsWithChildren<StyledProviderProps<T>>) => (
  <__context__.Provider value={{ theme }}>{children}</__context__.Provider>
);
