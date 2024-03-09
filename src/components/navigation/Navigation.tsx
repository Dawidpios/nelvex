"use client";

import useBreakpoint from "use-breakpoint";
import NavigationDesc from "./(navigationDesktop)/NavigationDesktop";
import NavigationMobile from "./(navigationMobile)/NavigationMobile";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const BREAKPOINTS = { mobile: 0, desktop: 678 };

const Navigation = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");
  
  return (
    <>
      {breakpoint === "mobile" ? (
        <NavigationMobile></NavigationMobile>
      ) : (
        <NavigationDesc />
      )}
    </>
  );
};

export default Navigation;
