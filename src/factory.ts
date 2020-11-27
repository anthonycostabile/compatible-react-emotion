import { ComponentType, createElement } from 'react';
import { useLabel } from './hooks/use-label';
// import { ComplexParser } from './renderers/complex-parser';
import { ComplexRenderer } from './renderers/complex-renderer';
import { SimpleParser } from './renderers/simple-parser';
import { SimpleRenderer } from './renderers/simple-renderer';
import {
  BasicProps,
  Interpolation,
  TemplateStringsArrayOverride,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStyledFactory = (element: any, label?: string) => {
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
      label,
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
      ? ComplexRenderer({ ...styles, label, Component })
      : SimpleRenderer({ ...styles, label, Component });
  };

  return useStyledFunction;
};

export const createCssFactory = (devLabel?: string) => {
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

    return SimpleParser(styles);

    // // Determine if any of the interpolations are functional style segments
    // const withFunctions = styles.interpolation.some(
    //   (interpolation) => typeof interpolation === 'function',
    // );

    // // If there are no functions in the interpolation, we can return a more
    // // optimised component that only re-renders if the incoming `className`
    // // prop changes
    // return withFunctions ? ComplexParser<T>(styles) : SimpleParser(styles);
  };

  return useStyledFunction;
};
