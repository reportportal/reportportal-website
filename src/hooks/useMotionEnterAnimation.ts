import { AnimationProps, Transition, useReducedMotion, Variant } from 'framer-motion';
import { MEDIA_TABLET_SM } from '@app/utils';
import { useMediaQuerySafe } from '@app/hooks/useMediaQuerySafe';

interface UseMotionEnterAnimationProps {
  hiddenState: Variant;
  enterState: Variant;
  transition: Transition;
}

interface AnimationGetterProps {
  isInView: boolean;
  delay?: number;
  additionalEffects?: Partial<{
    hiddenAdditional: Variant;
    enterAdditional: Variant;
    transitionAdditional: Transition;
  }>;
}

type AnimationGetter = (props: AnimationGetterProps) => AnimationProps;

export const useMotionEnterAnimation = (
  { hiddenState, enterState, transition }: UseMotionEnterAnimationProps,
  isEnabled = true,
): AnimationGetter => {
  const shouldReduceMotion = useReducedMotion();
  // SSR fallback is `true` (assume desktop) so `shouldAnimate` is `true` from
  // the very first render. If we let `isTablet` start as `false` and flip to
  // `true` after mount, framer-motion would mount the element without any
  // motion props, then receive `initial`/`animate` on the next render -- and
  // because `initial` only applies on mount, the element would snap straight
  // to the enter state instead of animating from hidden. Starting `true`
  // keeps the SSR HTML and the first hydrated tree identical (no inline
  // styles either way -- framer injects them only after commit) and lets the
  // hidden -> enter animation play normally.
  const isTablet = useMediaQuerySafe(MEDIA_TABLET_SM, true);
  const shouldAnimate = !shouldReduceMotion && isEnabled && isTablet;

  return ({
    isInView,
    delay = 0,
    additionalEffects = { hiddenAdditional: {}, enterAdditional: {} },
  }) => {
    if (!shouldAnimate) {
      return {};
    }

    return {
      initial: 'hidden',
      animate: isInView ? 'enter' : 'hidden',
      exit: 'hidden',
      variants: {
        hidden: { ...hiddenState, ...additionalEffects.hiddenAdditional },
        enter: { ...enterState, ...additionalEffects.enterAdditional },
      },
      transition: {
        ...transition,
        ...additionalEffects.transitionAdditional,
        delay,
      },
    };
  };
};
