import { css, Interpolation as CssInterpolation } from 'emotion';
import React, { useContext, useMemo } from 'react';
import { __context__ } from '../context';
import { BasicProps, Interpolation, UseStyled } from '../types';
import { classNames } from '../utils';

type ToStyles<Return> = <P extends BasicProps = BasicProps>(props: P) => Return;

export const ComplexRenderer: UseStyled = ({
  Component,
  interpolation,
  template,
}) => {
  // For any functions within the CSS interpolation array, we can optimise the
  // derivation of the emotion `className` by creating a hook which interprets
  // the next styles as props change
  const useInterpolation: ToStyles<string> = (props) => {
    const context = useContext(__context__);

    const emotionStyles = Array.from(interpolation).map((style) =>
      typeof style === 'function'
        ? (style as ToStyles<string>)({ ...props, theme: context.theme })
        : (style as Interpolation<unknown>),
    );

    const emotionClassname = useMemo(
      () => css(template, ...(emotionStyles as CssInterpolation[])),
      emotionStyles,
    );

    return useMemo(() => classNames(emotionClassname, props.className), [
      emotionClassname,
      props.className,
    ]);
  };

  // We now return a memoized function component that computes styles based on
  // changing props as a single `className` prop
  return React.memo((props: BasicProps) => (
    <Component {...props} className={useInterpolation(props)} />
  ));
};
