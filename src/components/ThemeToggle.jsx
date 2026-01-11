import { useTheme } from "@/theme-provider";
import { Button } from "./ui/button";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-md border px-3 py-2"
    >
      {theme === "light" ? "Dark" : "Light"}
    </button>
  );
}
