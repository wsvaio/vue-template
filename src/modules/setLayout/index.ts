const setLayout = (ev) => {
  const main = mainStore();

  if (window.innerWidth < 768) {
    main.setting.layout = "mobile";
  }
  else main.setting.layout == "mobile" && (main.setting.layout = "left");

};

window.addEventListener("resize", setLayout);
window.addEventListener("load", setLayout);

export { };