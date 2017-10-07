(function() {

    const CAT_PICTURES = [
        "cutie.jpg",
        "spy.jpg",
        "heidiAndHennes.jpg"
    ]

    var catFocusImage;
    var catFocusCounter;
    var fullImagePath;

    class Cat {

        constructor(index) {
            this.imageIndex = index;
            this.counter = 0;
        }

        static set currentIndex(index) {
            this._currentIndex = index;
        }

        static get currentIndex() {
            return this._currentIndex;
        }

        onListClick() {
            if (Cat.currentIndex !== this.imageIndex) {
                catFocusImage.src = CAT_PICTURES[this.imageIndex];
                catFocusImage.addEventListener('click', this.onFocusClick.bind(this));
                Cat.currentIndex = this.imageIndex;
                catFocusCounter.textContent = this.counter;
            }
        }

        onFocusClick() {
            ++this.counter;
            catFocusCounter.textContent = this.counter;
        }

    }

    function incrementCounter () {
        ++this.clickCounter;
        this.textContent = this.clickCounter;
    }
    
    window.onload = function () {

        var catList = document.getElementById("catList");
        var catFocus = document.getElementById("catFocus");

        for (var index in CAT_PICTURES) {
            var image = document.createElement('img');
            image.src = CAT_PICTURES[index];
            image.width = 100;
            catList.appendChild(image);

            var cat = new Cat(index);
            image.addEventListener('click', cat.onListClick.bind(cat));
        }

        catFocusImage = document.createElement('img');
        catFocusCounter = document.createElement('div');

        catFocus.appendChild(catFocusImage);
        catFocus.appendChild(catFocusCounter);
    }

})();