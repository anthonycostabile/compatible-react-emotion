import { css, Interpolation as CssInterpolation } from 'emotion';
import React, { useMemo } from 'react';
import { BasicProps, UseStyled } from '../types';
import { classNames } from '../utils';

export const SimpleRenderer: UseStyled = ({
  Component,
  interpolation,
  template,
}) => {
  // If  there are functions as part of the CSS interpolations, we can optimise
  // the derivation of the emotion classname by creating a hook style function
  // to interpret the next styles as props change
  const staticClassname = css(
    template,
    ...(interpolation as CssInterpolation[]),
  );

  // We now return a component function that computes styles based on changing
  // props as a single `className` prop
  return ({ className, ...rest }: BasicProps) => (
    <Component
      {...rest}
      className={useMemo(() => classNames(staticClassname, className), [
        className,
      ])}
    />
  );
};
