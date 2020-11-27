import { createStyledFactory } from './factory';
import {
  CreateStyledFunction,
  CreateThemedStyledFunction,
} from './types/styles';

// Normal `styled` function
export const styled = createStyledFactory as CreateStyledFunction;

// Advanced `styled` function that accepts typescript `Theme`
export const themedStyled = <Theme extends object = object>() =>
  createStyledFactory as CreateThemedStyledFunction<Theme>;
