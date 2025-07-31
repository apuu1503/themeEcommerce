import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-100 dark:bg-gray-900 p-4 shadow-md z-50 flex justify-between items-center">
      {/* <h1 className="text-xl font-bold">MultiTheme App</h1>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as any)}
        className="p-2 border rounded"
      >
        <option value="theme1">Theme 1 (Default)</option>
        <option value="theme2">Theme 2 (Dark Sidebar)</option>
        <option value="theme3">Theme 3 (Colorful)</option>
      </select> */}
    </header>
  );
};

export default Header;
