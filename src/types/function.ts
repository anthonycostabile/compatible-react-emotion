import {
  ClassAttributes,
  ComponentClass,
  DetailedReactHTMLElement,
  DOMAttributes,
  DOMElement,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactSVGElement,
  SVGAttributes,
} from 'react';
import { Themed } from './internal';
import { Interpolation } from './interpolation';

interface BaseStyleTemplate<
  Props extends object = object,
  Theme extends object = object
> {
  Props: Props;
  Theme: Theme;
}

type ConfigBase = { [K in keyof BaseStyleTemplate]?: BaseStyleTemplate[K] };

// CSS Function with Label Provided
export type CssWithLabel = <T extends object = object>(
  label: string,
) => (
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<object, T>>>
) => string;

// CSS Function with no Label Provided
export type CssWithoutLabel = <T extends object = object>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<object, T>>>
) => string;

// Class Component Style Function
export type StyledClass<P extends object, T extends object = object> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<W['Props'], W['Theme']>>>
) => ComponentClass<W['Props']>;

// Function Component Style Function
export type StyledFC<P extends object, T extends object = object> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<W['Props'], W['Theme']>>>
) => FC<W['Props']>;

// HTML General Element Style Function
export type StyledHTML<
  P extends HTMLAttributes<E>,
  T extends object = object,
  E extends HTMLElement = HTMLElement
> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<P & W['Props'], W['Theme']>>>
) => (
  props: PropsWithChildren<ClassAttributes<E> & P & W['Props']>,
) => DetailedReactHTMLElement<P & W['Props'], E>;

// HTML Input Element Style Function
export type StyledInput<
  P extends InputHTMLAttributes<E>,
  T extends object = object,
  E extends HTMLInputElement = HTMLInputElement
> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<P & W['Props'], W['Theme']>>>
) => (
  props: PropsWithChildren<ClassAttributes<E> & P & W['Props']>,
) => DetailedReactHTMLElement<P & W['Props'], E>;

// HTML SVG Element Style Function
export type StyledSVG<
  P extends SVGAttributes<E>,
  T extends object = object,
  E extends SVGElement = SVGElement
> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<P & W['Props'], W['Theme']>>>
) => (
  props: PropsWithChildren<ClassAttributes<E> & P & W['Props']>,
) => ReactSVGElement;

// HTML DOM Element Style Function
export type StyledDOM<
  P extends DOMAttributes<E>,
  T extends object = object,
  E extends Element = Element
> = <
  W extends Styled<{ Props?: P; Theme?: T }> = Styled<{ Props: P; Theme: T }>
>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation<Themed<P & W['Props'], W['Theme']>>>
) => (
  props: PropsWithChildren<ClassAttributes<E> & P & W['Props']>,
) => DOMElement<P & W['Props'], E>;

export type Styled<
  // eslint-disable-next-line @typescript-eslint/ban-types
  Template extends ConfigBase = {},
  Props extends object = object,
  Theme extends object = object
> = {
  Props: Template['Props'] extends object ? Template['Props'] : Props;
  Theme: Template['Theme'] extends object ? Template['Theme'] : Theme;
};
