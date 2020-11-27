import { css, Interpolation as CssInterpolation } from 'emotion';
import React from 'react';
import { Context, __context__ } from '../context';
import { shouldDisplayEmotionLabels } from '../internals';
import { BasicProps, Interpolation, UseStyled } from '../types';
import { classNames } from '../utils';

type ToStyles<Return, C = undefined> = <P extends BasicProps = BasicProps>(
  props: P,
  context: C,
) => Return;

export const ComplexRenderer: UseStyled = ({
  Component,
  interpolation,
  label,
  template,
}) => {
  // For any functions within the CSS interpolation array, we can optimise the
  // derivation of the emotion `className` by creating a hook which interprets
  // the next styles as props change
  const useComplexStyles: ToStyles<string, Context> = (props, context) => {
    const emotionStyles = Array.from(interpolation).map((style) =>
      typeof style === 'function'
        ? (style as ToStyles<string>)(
            { ...props, theme: context.theme },
            undefined,
          )
        : (style as Interpolation<unknown>),
    );

    const emotionClassname = css(
      template,
      ...(emotionStyles as CssInterpolation[]),
    );

    return classNames(emotionClassname, props.className);
  };

  // We now return a memoized function component that computes styles based on
  // changing props as a single `className` prop
  const StyledComponent: React.FC<BasicProps> = (props) => (
    <__context__.Consumer>
      {(context) => (
        <Component {...props} className={useComplexStyles(props, context)} />
      )}
    </__context__.Consumer>
  );

  if (label && shouldDisplayEmotionLabels()) {
    StyledComponent.displayName = `StyledComponent_${label}`;
  }

  return StyledComponent;
};
