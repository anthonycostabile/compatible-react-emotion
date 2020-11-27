import { css, Interpolation as CssInterpolation } from 'emotion';
import React, { useMemo } from 'react';
import { useLabel } from '../hooks/use-label';
import { shouldDisplayEmotionLabels } from '../internals';
import { BasicProps, UseStyled } from '../types';
import { classNames } from '../utils';

export const SimpleRenderer: UseStyled = ({ Component, label, ...rest }) => {
  // If  there are functions as part of the CSS interpolations, we can optimise
  // the derivation of the emotion classname by creating a hook style function
  // to interpret the next styles as props change
  const useSimpleStyles = () => {
    const { interpolation, template } = useLabel({ label, ...rest });

    return css(template, ...(interpolation as CssInterpolation[]));
  };

  // We now return a component function that computes styles based on changing
  // props as a single `className` prop
  const StyledComponent: React.FC<BasicProps> = ({ className, ...rest }) => {
    const staticClassName = useSimpleStyles();

    return (
      <Component
        {...rest}
        className={useMemo(() => classNames(staticClassName, className), [
          staticClassName,
          className,
        ])}
      />
    );
  };

  if (label && shouldDisplayEmotionLabels()) {
    StyledComponent.displayName = `StyledComponent_${label}`;
  }

  return StyledComponent;
};
