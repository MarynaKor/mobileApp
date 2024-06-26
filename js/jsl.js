class ViewController {

    root;

    constructor() {
    }

    oncreate(){
        console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        this.prepareFading();

    }

    prepareViewSwitching(){
        const switchTrigger = this.root.querySelector("header .myapp-img-grid"); // DOM element getTag oder querySelector
        const switchTarget  = this.root;
        switchTrigger.onclick = () => {
           this.root.classList.toggle("myapp-tiles");

        }
    }
    prepareFading() {
        const fadingTrigger = this.root.querySelector("footer #fadingTrigger"); // getElementbyID and class  nur auf document vorhanden
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        fadingTrigger.onclick = () => {
            // alert("fading");
            console.log("fadingTrigger is clicked");
            fadingTarget.classList.toggle("myapp-faded");
            const onTransitionend = () => {
                console.log("ontransitionend is clicked");
                fadingTarget.classList.toggle("myapp-faded");
            };
            fadingTarget.addEventListener("transitionend", onTransitionend, {once: true});

        }
    }

}
window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate(); //gleichnamige Methode und es gibt ein Anroid Framework dafür

}