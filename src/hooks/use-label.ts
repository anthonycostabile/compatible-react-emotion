import { useContext } from 'react';
import { __context__ } from '../context';
import { StyledConfig } from '../types';

interface LabelConfig extends StyledConfig {
  label?: string;
}

export const useLabel = ({
  interpolation,
  label = '',
  template,
}: LabelConfig): StyledConfig => {
  const context = useContext(__context__);

  // When running in development, pass the Label into the template strings
  // array and ensure the interpolations array has the correct offset by using
  // an empty string
  if (context.__DEV__ && label) {
    const newLabel = `\n  label: ${label};`;
    template.unshift(newLabel);
    template.raw.unshift(newLabel);
    interpolation.unshift('');
  }

  return { interpolation, template };
};
