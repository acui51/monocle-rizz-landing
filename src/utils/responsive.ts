import { useMediaQuery as useRawMediaQuery } from "react-responsive";

type BreakpointType = "phablet" | "tablet" | "desktop" | "widescreen";

const breakpoints = {
  phablet: 480,
  tablet: 768,
  desktop: 991,
  widescreen: 1280,
};

export const useMediaQuery = ({
  minWidth,
  maxWidth,
}: {
  minWidth?: BreakpointType;
  maxWidth?: BreakpointType;
}) => {
  return useRawMediaQuery({
    minWidth: minWidth && breakpoints[minWidth],
    maxWidth: maxWidth && breakpoints[maxWidth],
  });
};

export const useIsMobile = () => {
  return useMediaQuery({
    maxWidth: "tablet",
  });
};
