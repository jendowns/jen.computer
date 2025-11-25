import { Desktop } from "./components/Desktop";
import { DesktopProvider } from "./components/DesktopContext";

export default function Homepage() {
  return (
    <DesktopProvider>
      <Desktop />
    </DesktopProvider>
  );
}
