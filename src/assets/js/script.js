window.onload = smoothscroll;
window.onscroll = scrollnav;

function smoothscroll(){
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    window.requestAnimationFrame(smoothscroll);
    window.scrollTo (0,currentScroll - (currentScroll/5));
  }
}

function scrollnav () {
  const myNav = document.getElementById('nav');
  let scrollPos = document.documentElement.scrollTop;
  if(window.innerWidth>700) {
    if(scrollPos >= 0 && scrollPos <= 150) {
      myNav.classList.remove("opacity-4");
      myNav.classList.remove("opacity-3");
      myNav.classList.add("navbar-transparent");
    }
    else if (scrollPos > 150 && scrollPos < 300) {
      myNav.classList.add("opacity-4");
      myNav.classList.remove("navbar-transparent");
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

function afterReloadScroll() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const myNav = document.getElementById('nav');
  if(window.innerWidth>700) {
    if(currentScroll >= 0 && currentScroll < 50) {
      myNav.classList.add("navbar-transparent");
      myNav.classList.remove("opacity-4");
      myNav.classList.remove("opacity-3");
    }
    else if (currentScroll > 150 && currentScroll < 300) {
      myNav.classList.add("opacity-4");
      myNav.classList.remove("navbar-transparent");
    }
    else if (currentScroll >= 300 && currentScroll < 600) {
      myNav.classList.remove("navbar-transparent");
      myNav.classList.remove("opacity-4");
      myNav.classList.add("opacity-3");
    }
    else {
      myNav.classList.remove("navbar-transparent");
      myNav.classList.remove("opacity-3");
    }
  } else {
    myNav.style.backgroundImage = "url('../../assets/pictures/header/header.jpeg')";
  }
}
