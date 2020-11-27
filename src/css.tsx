import { createCssFactory } from './factory';
import {
  CreateCssFunction,
  Interpolation,
  TemplateStringsArrayOverride,
} from './types';

const createCss = (
  stringTemplate: TemplateStringsArrayOverride,
  ...args: Array<Interpolation<unknown>>
) => {
  const interpolation = Array.from(args);

  if (
    stringTemplate === undefined ||
    (typeof stringTemplate === 'string' && interpolation.length === 0)
  ) {
    return createCssFactory(stringTemplate || '');
  }

  return createCssFactory()(stringTemplate, ...interpolation);
};

export const css = createCss as CreateCssFunction;
