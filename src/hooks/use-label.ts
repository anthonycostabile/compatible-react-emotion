import { shouldDisplayEmotionLabels } from '../internals';
import { StyledConfig, TemplateStringsArrayOverride } from '../types';

interface LabelConfig extends StyledConfig {
  label?: string;
}

export const useLabel = ({
  interpolation,
  label = '',
  template,
}: LabelConfig): StyledConfig => {
  // When running in development, pass the Label into the template strings
  // array and ensure the interpolations array has the correct offset by using
  // an empty string
  if (shouldDisplayEmotionLabels() && label) {
    const newLabel = `\n  label: ${label};`;
    const newTemplate = Array.from([
      newLabel,
      ...template,
    ]) as TemplateStringsArrayOverride;
    newTemplate.raw = Array.from([newLabel, ...template.raw]);

    return {
      template: newTemplate,
      interpolation: ['', ...interpolation],
    };
  }

  return { interpolation, template };
};
