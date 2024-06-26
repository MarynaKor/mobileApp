class ViewController {

    root;

    constructor() {
    }

    oncreate(){
        console.log("oncreate(): root is: ", this.root);
        this.prepareViewSwitching();
        this.prepareFading();
        this.prepareListItemSelection();
        this.prepareAddingListItems();
    }

    prepareViewSwitching(){
        const switchTrigger = this.root.querySelector("header .myapp-img-grid"); // DOM element getTag oder querySelector
        const switchTarget  = this.root;
        switchTrigger.onclick = () => {
           switchTarget.classList.toggle("myapp-tiles");

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
    prepareListItemSelection() {
        const listItems = this.root.getElementsByTagName("li");
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

        this.copiedLi = this.listRoot.querySelector("li");
        console.log("read li element now called dollyLi: ", this.copiedLi);
        this.copiedLi.parentNode.removeChild(this.copiedLi);

        addingItem.onclick = (evt) => {
            evt.stopPropagation(); // stopped das Bubblen auf den Header, da wir nur den Button brauchen
            const srcOptions = ["cat.jpeg", "greycat.jpeg","whitecat.jpeg"];
            const titleOptions = ["TitelSong55", "TitelSong56", "TitelSong57", "TitelSong58"];

            const selectedSrc= srcOptions[Date.now() % srcOptions.length];
            const selectedTitle= titleOptions[Date.now() % titleOptions.length];
            this.addNewListItem({src: "data/img/" + selectedSrc, title: selectedTitle});
            }
        }

        addNewListItem(obj) {
            // ineffeziente Lösung weil es das gesamte DOM element immer wieder neu aufbaut  und Separation of Concern violated
            // this.listRoot.innerHTML += "<li>\n" +
            //     "            <div class=\"flexContainer\">\n" +
            //     "                    <div class=\"imgContainer\">\n" +
            //     "                        <img class=\"newView\" src=\"" + src + "\">\n" +
            //     "                    </div>\n" +
            //     "                    <div class=\"songinfo\">\n" +
            //     "                        <a>lorempixel.com</a>\n" +
            //     "                        <h2>"+ title +"</h2>\n" +
            //     "                        <div class=\"moreFlex\"><button class=\"myapp-imgbuttonPlay myapp-playArrow\"></button><p>0</p></div>\n" +
            //     "                    </div>\n" +
            //     "            </div>\n" +
            //     "            <div class=\"songDate\">\n" +
            //     "                <p><a> 11.02.2024</a></p>\n" +
            //     "                <button class=\"myapp-imgbutton myapp-img-morevert\"></button>\n" +
            //     "            </div>\n" +
            //     "        </li>";

            //neue effizeintere Lösung dom element wird hinzugefügt zu der schon ufgebauten struktur aber trotzdem violated und viel zu komplex bei meiner html struktur
            // const li = document.createElement("li");
            // const img = document.createElement("img");
            // li.appendChild(img);
            // const h2 = document.createElement("h2");

            // cloning: viel effizienter vor allem bei komplexerem li Elementen aber es ist auch bessere separation of htnl and js
            const li = this.copiedLi.cloneNode(true);
            const img =li.querySelector("img");
            img.src = obj.src;
            const h2 = li.querySelector("h2");
            h2.textContent = obj.title;
            this.listRoot.appendChild(li);

        }
}
window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate(); //gleichnamige Methode und es gibt ein Anroid Framework dafür

}