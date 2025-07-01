import { useState, useEffect } from "react";
import { CirclePlus, Clock, Contact, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

function SidebarButton({
  useToggle,
  showMenu,
  setShowMenu,
  text,
  LucideIcon,
  urlExtension,
}) {
  const [tabIndex, setTabIndex] = useState("-1");
  const navigate = useNavigate();

  useEffect(() => {
    if (showMenu) {
      setTabIndex("0");
    } else {
      setTabIndex("-1");
    }
  });

  function handleSidebarButtonClick() {
    if (useToggle) {
      setShowMenu(false);
    }
    if (urlExtension) {
      navigate(urlExtension);
    }
  }

  return (
    <>
      <button
        type="button"
        className="sidebarButton"
        tabIndex={tabIndex}
        onClick={handleSidebarButtonClick}
      >
        <LucideIcon />
        {text}
      </button>
      <hr />
    </>
  );
}

function FriendPostsButton({ useToggle, showMenu, setShowMenu }) {
  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"Friends Posts"}
      LucideIcon={Contact}
      urlExtension={"postsByFriends"}
    />
  );
}

function MyProfileButton({ useToggle, showMenu, setShowMenu }) {
  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"My Profile"}
      LucideIcon={User}
      urlExtension={"me"}
    />
  );
}

function RecentPostsButton({ useToggle, showMenu, setShowMenu }) {
  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"Recent Posts"}
      LucideIcon={Clock}
      urlExtension={"/"}
    />
  );
}

export default function SideMenu({ profile }) {
  if (!profile) {
    return null;
  }
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
      <MyProfileButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <RecentPostsButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <FriendPostsButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </nav>
  );
}
