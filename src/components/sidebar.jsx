import { useState, useEffect } from "react";
import {
  CirclePlus,
  Clock,
  SquarePlus,
  User,
  UserSearch,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { readProfileLocalStorage } from "../functions/localStorage";

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

function MyProfileIcon({ profile }) {
  if (!profile) {
    return null;
  }

  return (
    <img className="avatar-small" src={profile.avatarUrl} alt="profile image" />
  );
}

function SidebarButton({
  useToggle,
  showMenu,
  setShowMenu,
  text,
  IconComponentName,
  urlExtension,
  profile,
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
        className="sidebar-button"
        tabIndex={tabIndex}
        onClick={handleSidebarButtonClick}
      >
        <IconComponentName profile={profile} />
        {text}
      </button>
      <hr />
    </>
  );
}

function FindFriendsButton({ useToggle, showMenu, setShowMenu }) {
  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"Add a Friend"}
      IconComponentName={UserSearch}
      urlExtension={"friends/add"}
    />
  );
}

function FriendsButton({ useToggle, showMenu, setShowMenu }) {
  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"My Friends"}
      IconComponentName={Users}
      urlExtension={"friends"}
    />
  );
}

function MyProfileButton({ useToggle, showMenu, setShowMenu, profile }) {
  const urlExtension = `profile/${profile.id}`;

  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"My Profile"}
      IconComponentName={MyProfileIcon}
      urlExtension={urlExtension}
      profile={profile}
    />
  );
}

function NewPostButton({ useToggle, showMenu, setShowMenu, profile }) {
  const urlExtension = "newPost";

  return (
    <SidebarButton
      useToggle={useToggle}
      showMenu={showMenu}
      setShowMenu={setShowMenu}
      text={"New Post"}
      IconComponentName={SquarePlus}
      urlExtension={urlExtension}
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
      IconComponentName={Clock}
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
      setMenuClass("shown no-toggle");
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
        profile={profile}
      />
      <NewPostButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        profile={profile}
      />
      <FindFriendsButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <FriendsButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
      <RecentPostsButton
        useToggle={useToggle}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </nav>
  );
}
