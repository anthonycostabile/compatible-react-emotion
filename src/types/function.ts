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
  ReactHTML,
  ReactSVG,
  ReactSVGElement,
  SVGAttributes,
} from 'react';
import { Interpolation } from './interpolation';

type StyledBase<S> = (
  template: TemplateStringsArray,
  ...args: Array<Interpolation<unknown>>
) => S;

type StyledClass<P extends object> = StyledBase<ComponentClass<P>>;
type StyledFC<P extends object> = StyledBase<FC<P>>;

type StyledHTML = StyledBase<
  <P extends HTMLAttributes<T>, T extends HTMLElement>(
    props: PropsWithChildren<ClassAttributes<T> & P>,
  ) => DetailedReactHTMLElement<P, T>
>;

type StyledInput = StyledBase<
  <P extends InputHTMLAttributes<T>, T extends HTMLInputElement>(
    props: PropsWithChildren<ClassAttributes<T> & P>,
  ) => DetailedReactHTMLElement<P, T>
>;

type StyledSVG = StyledBase<
  <P extends SVGAttributes<T>, T extends SVGElement>(
    props: PropsWithChildren<ClassAttributes<T> & P>,
  ) => ReactSVGElement
>;

type StyledDOM = StyledBase<
  <P extends DOMAttributes<T>, T extends Element>(
    props: PropsWithChildren<ClassAttributes<T> & P>,
  ) => DOMElement<P, T>
>;

export type CreateStyledFunction = ((
  type: 'input',
  label?: string,
) => StyledInput) &
  ((type: keyof ReactHTML, label?: string) => StyledHTML) &
  ((type: keyof ReactSVG, label?: string) => StyledSVG) &
  ((type: string, label?: string) => StyledDOM) &
  (<P extends {}>(type: ComponentClass<P>, label?: string) => StyledClass<P>) &
  (<P extends {}>(type: FC<P>, label?: string) => StyledFC<P>);
