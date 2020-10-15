export const classNames = (
  ...args: Array<string | false | null | undefined>
): string =>
  Array.from(args)
    .filter((arg) => !!arg)
    .join(' ');
