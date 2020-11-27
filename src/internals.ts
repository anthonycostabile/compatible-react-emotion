const __INTERNAL__ = {
  current: false,
  isSet: false,
  get __LABELS__(): boolean | undefined {
    return this.isSet ? this.current : undefined;
  },
  set __LABELS__(shouldDisplayLabels: boolean | undefined) {
    if (!this.isSet && shouldDisplayLabels !== undefined) {
      this.isSet = true;
      this.current = shouldDisplayLabels;
    }
  },
};

export const shouldDisplayEmotionLabels = () => __INTERNAL__.__LABELS__;

export const explicitDisplayEmotionLabels = (shouldDisplayLabels: boolean) => {
  __INTERNAL__.__LABELS__ = shouldDisplayLabels;
};
