import { ComponentType } from 'react';
import { Context } from '../context';
import { Interpolation } from './interpolation';

export type BasicProps = React.PropsWithChildren<{
  className: string;
}>;

export interface StyledConfig {
  interpolation: Array<Interpolation<unknown>>;
  template: TemplateStringsArrayOverride;
}

export interface UseCss extends StyledConfig {
  context: Context;
}

export type TemplateStringsArrayOverride = Array<string> & {
  raw: Array<string>;
};

export type Themed<P extends object, T extends object> = P & { theme: T };

export type UseStyled = (
  config: StyledConfig & {
    Component: ComponentType<BasicProps>;
    label?: string;
  },
) => ComponentType<BasicProps>;
