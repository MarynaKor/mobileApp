class ViewController {

    root;

    constructor() {
    }

    oncreate(){
        console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        this.prepareListItemSelection();
        this.prepareAddingListItems();
        this.loadAndDisplayListItems();
    }

    prepareViewSwitching(){
        const switchTrigger = this.root.querySelector("header .myapp-img-grid"); // DOM element getTag oder querySelector
        const switchTarget  = this.root;
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        switchTrigger.onclick = () => {
            console.log("button clicked!")
            fadingTarget.classList.toggle("myapp-faded");
            const onTransitionend = () => {
                console.log("ontransitionend is done");
                fadingTarget.classList.toggle("myapp-faded");
                switchTarget.classList.toggle("myapp-tiles");
            };
            fadingTarget.addEventListener("transitionend", onTransitionend, {once: true});
        }

    }

    prepareListItemSelection() {
        // const listItems = this.root.getElementsByTagName("li");
        const onclickListener = (evt) => {
            alert("selected: " + evt.target.closest("li").querySelector("h2").textContent);
        };
        // for(let i = 0; i < listItems.length; i++) {
        //     const currentItem = listItems[i]; //var keyword
        //     currentItem.onclick = onclickListener;
        // event objekt hat ein Target womit ich dann auf ein Element direkt zugreifen kann und es peichert dieses im evt dann
        //achtung wir haben zu viele Event Listener weil es auf dem eins sitzt also minimieren wir das
        //listener achtet nur auf das ul
        const listRoot = this.root.querySelector("ul");
        listRoot.onclick = onclickListener;
        }

        prepareAddingListItems() {
        const addingItem = this.root.querySelector(".myapp-img-add");
        this.listRoot= this.root.querySelector("ul");

        this.copiedLi = this.listRoot.querySelector("template");
        console.log("read li element now called dollyLi: ", this.copiedLi);
        // this.copiedLi.parentNode.removeChild(this.copiedLi);
        // this.copiedLi.classList.remove("myapp-template");

        addingItem.onclick = (evt) => {
            evt.stopPropagation(); // stopped das Bubblen auf den Header, da wir nur den Button brauchen
             const srcOptions = ["cat.jpeg", "greycat.jpeg","whitecat.jpeg"];
             const titleOptions = ["TitelSong1", "TitelSong2", "TitelSong3", "TitelSong4", "TitelSong5", "TitelSong6"];

            const selectedSrc= srcOptions[Date.now() % srcOptions.length];
            const selectedTitle= titleOptions[Date.now() % titleOptions.length];

            this.addNewListItem({src: "data/img/" + selectedSrc, title: selectedTitle});
            }
        }

        addNewListItem(obj) {

            // cloning: viel effizienter vor allem bei komplexerem li Elementen aber es ist auch bessere separation of htnl and js
            console.log("cloning template content :", this.copiedLi.content);
            const li = document.importNode(this.copiedLi.content, true). querySelector("li");
            console.log("cloned li element ", li);
            li.querySelector("img").src = obj.src;
            li.querySelector("h2").textContent = obj.title;

            this.listRoot.appendChild(li);
        }
        //http://localhost:63342/mobileApp/data/listitems.json
        loadAndDisplayListItems() {
            const request = new XMLHttpRequest();
            request.open("GET","data/listitems.json");

        //eventlistener auf load setzen
            request.onload = () => {
                console.log("response status: " + request.status, request.statusText);
                if (request.status === 200) {
                    const responseText = request.responseText;
                    console.log(responseText);
                    const responseItems = JSON.parse(responseText);
                    console.log(responseItems);
                    responseItems.forEach(item => this.addNewListItem(item));
                }else{
                    alert("got error status: " + request.status + " statusText: " + request.statusText);
                }
            }
            request.send();
            console.log("2.REQUEST has been send to server");
        }
}
window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate(); //gleichnamige Methode und es gibt ein Anroid Framework dafür

}