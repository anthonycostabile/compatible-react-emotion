import { css, Interpolation as CssInterpolation } from 'emotion';
import { useMemo } from 'react';
import { StyledConfig } from '../types';

export const SimpleParser = ({
  interpolation,
  template,
}: StyledConfig): string =>
  useMemo(
    () => css(template, ...(interpolation as CssInterpolation[])),
    interpolation,
  );
