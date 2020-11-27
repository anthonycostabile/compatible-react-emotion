import { css, Interpolation as CssInterpolation } from 'emotion';
import { StyledConfig } from '../types';

export const SimpleParser = ({
  interpolation,
  template,
}: StyledConfig): string =>
  css(template, ...(interpolation as CssInterpolation[]));
