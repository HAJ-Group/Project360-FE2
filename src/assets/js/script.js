function scrollnav() {
  const myNav = document.getElementById('nav');
  window.onscroll = function () {

  };
  if(window.innerWidth>700){
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      myNav.classList.remove("opacity-4");
      myNav.classList.remove("opacity-3");
    }
    else if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      myNav.classList.add("opacity-4");

    }
    else  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      myNav.classList.add("bg-dark");
      myNav.classList.add("opacity-3");
    }
    else {
      myNav.classList.remove("bg-dark");
      myNav.classList.remove("opacity-4");
      myNav.classList.remove("opacity-3");
    }
  }
}
