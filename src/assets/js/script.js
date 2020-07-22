function scrollnav() {
  const myNav = document.getElementById('nav');
  let scrollPos = document.documentElement.scrollTop;
  if(window.innerWidth>700) {
    if(scrollPos >= 0 && scrollPos < 50) {
      myNav.classList.add("navbar-transparent");
      myNav.classList.add("text-white");
      myNav.classList.remove("opacity-4");
      myNav.classList.remove("opacity-3");
    }
    else if (scrollPos > 150 && scrollPos < 300) {
      myNav.classList.add("opacity-4");
      myNav.classList.remove("navbar-transparent");
      myNav.classList.remove("text-white");
    }
    else if (scrollPos >= 300 && scrollPos < 600) {
      myNav.classList.remove("opacity-4");
      myNav.classList.add("opacity-3");
    }
    else {
      myNav.classList.remove("opacity-3");
    }
  } else {
    myNav.style.backgroundImage = "url('../../assets/pictures/header/header.jpeg')";
  }
}
