(function() {

    const PATH = '../pics/';

    const CAT_PICTURES = [
        'cutie.jpg',
        'spy.jpg',
        'heidiAndHennes.jpg',
        'shoes.jpg',
    ];

    class Model {

        constructor (imageIndex) {
            this.imageIndex = imageIndex;
            this.counter = 0;
        }

        static init () {
            this.data = [];
            for (let index in CAT_PICTURES) {
                this.data.push(new Model(index));
            }
            return this.data;
        }

        static getCats () {
            return this.data;
        }

    }

    class ListView {

        static render () {
            Octopus.getCats().forEach(cat => {
                let image = document.createElement('img');
                image.src = PATH + CAT_PICTURES[cat.imageIndex];
                image.height = 100;
                this.catList.appendChild(image);

                image.addEventListener('click', (copyCat => {
                    return () => Octopus.onListClick(copyCat);
                })(cat));
            });
        }   

        static init () {
            this.catList = document.getElementById('catList');
        }

    }

    class FocusView {

        static init () {
            var catFocus = document.getElementById('catFocus');
            this.catFocusImage = document.createElement('img');
            this.catFocusCounter = document.createElement('div');
    
            catFocus.appendChild(this.catFocusImage);
            catFocus.appendChild(this.catFocusCounter);
        }

        static renderImage (cat) {
            this.catFocusImage.src = PATH + CAT_PICTURES[cat.imageIndex];
            this.catFocusImage.onclick = () => Octopus.onFocusClick(cat);
        }

        static renderCounter (cat) {
            this.catFocusCounter.textContent = cat.counter;
        }
    }

    class Octopus {
        static init () {
            Model.init();
            ListView.init();
            FocusView.init();
            
            ListView.render();
            
            this.currentIndex = 0;
            var cat = Model.getCats()[this.currentIndex];
            FocusView.renderImage(cat);
            FocusView.renderCounter(cat);
        }

        static getCats () {
            return Model.getCats();
        }

        static onListClick(cat) {
            if (this.currentIndex !== cat.imageIndex) {
                this.currentIndex = cat.imageIndex;
                FocusView.renderImage(cat);
                FocusView.renderCounter(cat);
            }
        }

        static onFocusClick (cat) {
            cat.counter++;
            FocusView.renderCounter(cat);
        } 
    }

    window.onload = () => {
        Octopus.init();
    };

})();
