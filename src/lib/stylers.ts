export interface StyleObject {
  class: string;
}

function toCssClassName(str: string): string {
  let cssClass = str.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  if (/^\d/.test(cssClass)) cssClass = `n-${cssClass}`;
  return cssClass;
}

export function cellStyle(value: string | boolean | null | undefined): string {
  if (!value) return 'none';
  if ( typeof value !== 'string' ) {
    value = value.toString()
  }
  return value.match(/^\W/) ? `irregular-${toCssClassName(value)}` : toCssClassName(value);
}

export function clearStyle(value: string | null | undefined): string {
  const clearanceArray: string[] = ['unrestricted', 'restricted', 'confidential', 'secret', 'top-secret', 'cosmic-top-secret']

  if (!value) return 'none';
  if (value.match(/^[#0-9]\//)) {
    value = value.split('/')[0];
  }
  if (value.match(/ [#0-9]$/)) {
    value = value.split(' ')[1];
  }

  const clearanceIndex: number = parseInt(value) - 1;
  if (clearanceIndex >= 0 && clearanceIndex < clearanceArray.length) {
    return clearanceArray[clearanceIndex];
  }

  return `irregular-clear-${value}`;
}