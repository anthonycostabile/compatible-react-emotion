import { PropertiesFallback, Pseudos } from 'csstype';

type CSSObject = PropertiesFallback<number | string> &
  { [K in Pseudos]?: CSSObject } & {
    [propertiesName: string]: BaseInterpolation;
  };

interface ClassInterpolation extends Function {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  __emotion_real: any;
  __emotion_styles: Array<BaseInterpolation>;
  __emotion_base: ClassInterpolation;
  __emotion_target: string;
  __emotion_forwardProp: undefined | null | ((arg: string) => boolean);
}

type BaseInterpolation =
  | boolean
  | ClassInterpolation
  | CSSObject
  | null
  | number
  | string
  | undefined;

export type FunctionInterpolation<Props> = (
  props: Props,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
) => Interpolation<Props>;

export type Interpolation<Props> =
  | Array<Interpolation<Props>>
  | BaseInterpolation
  | FunctionInterpolation<Props>;
