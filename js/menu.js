(() => {
    const menuBtnRef = document.querySelector("[data-menu-btn]")
    const mobileBtnRef = document.querySelector("[data-menu]")
    menuBtnRef.addEventListener("click", () => {
        menuBtnRef.classList.toggle("is-open");
        mobileBtnRef.classList.toggle("is-open");
        
    })
})();