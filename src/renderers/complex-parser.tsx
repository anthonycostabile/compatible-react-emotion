// import { css, Interpolation as CssInterpolation } from 'emotion';
// import { useContext, useMemo } from 'react';
// import { __context__ } from '../context';
// import { Interpolation, StyledConfig, Themed } from '../types';

// type ToStyles<T extends object = object> = (props: Themed<object, T>) => string;

// export const ComplexParser = <T extends object = object>({
//   interpolation,
//   template,
// }: StyledConfig): string => {
//   const context = useContext(__context__);

//   const emotionStyles = Array.from(interpolation).map((style) =>
//     typeof style === 'function'
//       ? (style as ToStyles<T>)({ theme: context.theme as T })
//       : (style as Interpolation<unknown>),
//   );

//   return useMemo(
//     () => css(template, ...(emotionStyles as CssInterpolation[])),
//     emotionStyles,
//   );
// };
