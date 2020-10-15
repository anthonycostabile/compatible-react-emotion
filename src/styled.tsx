import React, { ComponentType, createElement } from 'react';
import { useLabel } from './hooks/use-label';
import { ComplexRenderer } from './renderers/complex-renderer';
import { SimpleRenderer } from './renderers/simple-renderer';
import {
  CreateStyledFunction,
  Interpolation,
  TemplateStringsArrayOverride,
} from './types';

type BasicProps = React.PropsWithChildren<{
  className: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createStyled = (element: any, devLabel?: string) => {
  const Component: ComponentType<BasicProps> =
    typeof element === 'string'
      ? (props) => createElement(element, props)
      : element;

  // If there are no functions in the interpolation, we can return a
  // more optimised component that only re-renders if the incoming
  // `className` prop changes
  const useStyledFunction = (
    stringTemplate: TemplateStringsArrayOverride,
    ...args: Array<Interpolation<unknown>>
  ) => {
    const styles = useLabel({
      interpolation: Array.from(args),
      label: devLabel,
      template: stringTemplate,
    });

    // Determine if any of the interpolations are functional style segments
    const withFunctions = styles.interpolation.some(
      (interpolation) => typeof interpolation === 'function',
    );

    // If there are no functions in the interpolation, we can return a more
    // optimised component that only re-renders if the incoming `className`
    // prop changes

    return withFunctions
      ? ComplexRenderer({ ...styles, Component })
      : SimpleRenderer({ ...styles, Component });
  };

  return useStyledFunction;
};

export const styled = createStyled as CreateStyledFunction;
