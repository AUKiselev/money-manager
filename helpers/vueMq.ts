import { useMediaQuery } from '@vueuse/core';

const isDesktopScreen = useMediaQuery('(min-width: 1024px)');
const isTabletScreen = useMediaQuery('(min-width: 769px) and (max-width: 1023px)');
const isMobileScreen = useMediaQuery('(max-width: 768px)');

export {
  isDesktopScreen,
  isTabletScreen,
  isMobileScreen,
};
