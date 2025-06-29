import { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";

function ToggleDisplayButton({ showMenu, setShowMenu, useToggle }) {
  if (!useToggle) {
    return null;
  }

  function handleClick() {
    const newBool = !showMenu;
    setShowMenu(newBool);
  }

  return (
    <button type="button" onClick={handleClick} className="toggle">
      <CirclePlus color="#000000" />
    </button>
  );
}

export default function SideMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [useToggle, setUseToggle] = useState(true);
  const [menuClass, setMenuClass] = useState("hidden toggled");

  useEffect(() => {
    if (!useToggle) {
      setMenuClass("shown noToggle");
    } else {
      if (showMenu) {
        setMenuClass("shown toggled");
      } else {
        setMenuClass("hidden toggled");
      }
    }
  }, [showMenu, useToggle]);

  function checkWindowSize() {
    const width = window.innerWidth;
    const minToShowSidebar = 650;

    if (width > minToShowSidebar && useToggle) {
      setUseToggle(false);
    } else if (width <= minToShowSidebar && !useToggle) {
      setUseToggle(true);
    }
  }

  window.addEventListener("resize", checkWindowSize);

  // decide whether to show sidebar constantly or not
  useEffect(() => {
    if (!useToggle) {
      setShowMenu(true);
    } else if (useToggle && showMenu) {
      setShowMenu(false);
    }
  }, [useToggle]);

  // things to be done upon page load
  useEffect(() => {
    checkWindowSize();
  }, []);

  return (
    <nav className={menuClass}>
      <ToggleDisplayButton
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        useToggle={useToggle}
      />
    </nav>
  );
}
