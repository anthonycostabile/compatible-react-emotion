import { CreateStyledFunction } from './types/styles';
import { createStyledFactory } from './factory';

export const styled = createStyledFactory as CreateStyledFunction;
