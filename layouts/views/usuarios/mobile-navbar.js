class MobileNavBar{
    constructor(mobileMenu){
        this.mobileMenu = document.querySelector(mobileMenu)
        this.navList = document.querySelector(this.navList)
        this.navLinks = document.querySelectorAll(this.navLinks)
        this.activeClass = "active";
    }
    addClickEvent(){
        this.mobileMenu.addEventListener("click",
        ()=>console.log("HEY"));
    }
    init(){
        if(this.mobileMenu){
            this.addClickEvent()
        }
        return this
    }
}

const MobileNavbar = new MobileNavbar(
    ".mobileMenu",
    ".nav-list",
    ".nav-list li",
)

MobileNavBar.init();