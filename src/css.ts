import { createCssFactory } from './factory';
import {
  CreateCssFunction,
  Interpolation,
  TemplateStringsArrayOverride,
} from './types';

const createCss = <T extends object = object>(
  stringTemplate: TemplateStringsArrayOverride,
  ...args: Array<Interpolation<unknown>>
) => {
  const interpolation = Array.from(args);

  if (typeof stringTemplate === 'string' && interpolation.length === 0) {
    return createCssFactory<T>(stringTemplate);
  }

  return createCssFactory<T>()(stringTemplate, ...interpolation);
};

export const css = createCss as CreateCssFunction;
