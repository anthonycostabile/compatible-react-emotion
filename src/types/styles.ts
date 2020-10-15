/* eslint-disable @typescript-eslint/ban-types */
import {
  ComponentClass,
  DOMAttributes,
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactHTML,
  ReactSVG,
  SVGAttributes,
} from 'react';
import {
  CssWithLabel,
  CssWithoutLabel,
  StyledClass,
  StyledFC,
  StyledHTML,
  StyledInput,
  StyledSVG,
  StyledDOM,
} from './function';

export type CreateCssFunction = CssWithLabel & CssWithoutLabel;

export type CreateStyledFunction = (<
  P extends InputHTMLAttributes<E>,
  T extends object = object,
  E extends HTMLInputElement = HTMLInputElement
>(
  type: 'input',
  label?: string,
) => StyledInput<P, T>) &
  (<
    P extends HTMLAttributes<E>,
    T extends object = object,
    E extends HTMLElement = HTMLElement
  >(
    type: keyof ReactHTML,
    label?: string,
  ) => StyledHTML<P, T>) &
  (<
    P extends SVGAttributes<E>,
    T extends object = object,
    E extends SVGElement = SVGElement
  >(
    type: keyof ReactSVG,
    label?: string,
  ) => StyledSVG<P, T>) &
  (<
    P extends DOMAttributes<E>,
    T extends object = object,
    E extends Element = Element
  >(
    type: string,
    label?: string,
  ) => StyledDOM<P, T>) &
  (<P extends object = object, T extends object = object>(
    type: ComponentClass<P>,
    label?: string,
  ) => StyledClass<P, T>) &
  (<P extends object = object, T extends object = object>(
    type: FC<P>,
    label?: string,
  ) => StyledFC<P, T>);
