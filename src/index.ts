import { __context__, EmotionProvider } from './context';
import { css } from './css';
import { explicitDisplayEmotionLabels } from './internals';
import { styled, themedStyled } from './styled';

export default styled;
export * from './types/function';
export {
  __context__ as emotionContext,
  css,
  EmotionProvider,
  explicitDisplayEmotionLabels,
  styled,
  themedStyled,
};
