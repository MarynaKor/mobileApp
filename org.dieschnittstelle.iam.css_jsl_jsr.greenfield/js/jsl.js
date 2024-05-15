class ViewController {

    root;
    constructor() {
        console.log("constructor(): has been called");
    }
    oncreate(){
        console.log("oncreate(): root is: ", this.root);
        this.initialiseViewSwitching();
    }

    initialiseViewSwitching(){
        const switchElement = this.root.getElementsByTagName("header")[0];
        console.log("switchElement", switchElement);
        const switchTarget = this.root;
        switchElement.onclick = () => {
            this.root.classList.toggle("myapp-tiles");
        }
    }
}
window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
}