import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { Rocket, Sun, Moon } from "lucide-react";
import  roket  from "../../assets/img/roket.png";
export default function Header() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header className="bg-[#d9d9d9] dark:bg-[#0d0d0d] backdrop-blur dark:border-gray-800 mx-auto  ">
      <div className="px-4 py-16 flex items-center justify-center relative ">
        <div className="flex items-center ">
          <img src={roket} alt="logo todo" className="h-16" />
          <h1 className="text-5xl font-black font-inter  bg-clip-text tracking-widest text-[#5E60CE]">
            <span className="text-[#4EA8DE]">to</span>do
          </h1>
        </div>

        <div className="absolute right-0 mx-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
