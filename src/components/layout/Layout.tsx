import useBreakpoint from "use-breakpoint";
import Navigation from "../navigation/Navigation";
import NavigationMobile from "../navigation/NavigationMobile";
import style from "../layout/Layout.module.scss";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const BREAKPOINTS = { mobile: 0, desktop: 678 };

export default function Layout({ children }: DashboardLayoutProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "mobile");

  return (
    <div className={style.layout}>
      {breakpoint === "mobile" ? (
        <NavigationMobile></NavigationMobile>
      ) : (
        <Navigation />
      )}
      {children}
    </div>
  );
}
