import type { CSSProperties } from 'react';

export const reassignCssProperties = (
  element: HTMLElement,
  cssProperties: CSSProperties
) => {
  for (const cssProperty in cssProperties) {
    if (cssProperties.hasOwnProperty(cssProperty)) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      element.style[cssProperty] = cssProperties[cssProperty];
    }
  }
};

export const getElementCssProperties = (
  element: HTMLElement,
  cssProperties: CSSProperties
) => {
  let res = cssProperties;

  for (const cssProperty in cssProperties) {
    if (cssProperties.hasOwnProperty(cssProperty)) {
      res = {
        ...res,
        // @ts-ignore
        [cssProperty]: element.style[cssProperty],
      };
    }
  }

  return res;
};
