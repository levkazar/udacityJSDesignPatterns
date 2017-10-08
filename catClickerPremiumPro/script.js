(function() {

    const PATH = '../pics/';

    const CAT_PICTURES = [
        'keys.jpg',
        'cutie.jpg',
        'spy.jpg',
        'heidiAndHennes.jpg',
        'shoes.jpg',
    ];

    class Model {

        constructor (index, imageSource) {
            this.index = index;
            this.imageSource = imageSource;
            this.counter = 0;
        }

        static init () {
            this.data = [];
            for (let index in CAT_PICTURES) {
                this.data.push(new Model(index, CAT_PICTURES[index]));
            }
            return this.data;
        }

        static getCats () {
            return this.data;
        }

    }

    class ListView {

        static render () {
            this.catList.innerHTML = '';
            Octopus.getCats().forEach(cat => {
                let image = document.createElement('img');
                image.src = PATH + cat.imageSource;
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

        static renderImage () {
            var cat = Octopus.getCurrentCat();
            this.catFocusImage.src = PATH + cat.imageSource;
            this.catFocusImage.onclick = () => Octopus.onFocusClick(cat);
        }

        static renderCounter () {
            var cat = Octopus.getCurrentCat();
            this.catFocusCounter.textContent = cat.counter;
        }
    }

    class AdminView {

        static init () {
            this.adminButton = document.getElementById('adminShowButton');
            this.adminButton.onclick = Octopus.onAdminShowClick.bind(Octopus);

            this.adminForm = document.getElementById('adminForm');
            this.adminSourceInput = document.getElementById('adminSourceInput');
            this.adminClickInput = document.getElementById('adminClickInput');

            document.getElementById('adminOkButton').onclick = Octopus.onAdminOkClick.bind(Octopus);
            document.getElementById('adminCancelButton').onclick = Octopus.onAdminCancelClick.bind(Octopus);
        }

        static render (formVisible) {

            if (formVisible) {
                this.adminButton.style.visibility = 'hidden';
                this.adminForm.style.visibility = 'visible';

                var cat = Octopus.getCurrentCat();
                this.adminSourceInput.value = cat.imageSource;
                this.adminClickInput.value = cat.counter;
            } else {
                this.adminButton.style.visibility = 'visible';
                this.adminForm.style.visibility = 'collapse';

                this.adminSourceInput.value = '';
                this.adminClickInput.value = 0;
            }
        } 

        static get sourceInput () {
            return this.adminSourceInput.value;
        }

        static get counterInput () {
            return this.adminClickInput.value;
        }
    }

    class Octopus {
        static init () {
            Model.init();
            ListView.init();
            FocusView.init();
            AdminView.init();
            
            ListView.render();
            
            this.currentIndex = 0;
            FocusView.renderImage();
            FocusView.renderCounter();

            this.adminViewVisible = false;
            AdminView.render(this.adminViewVisible);
        }

        static getCats () {
            return Model.getCats();
        }

        static getCurrentCat () {
            return Model.getCats()[this.currentIndex];
        }

        static onListClick(cat) {
            if (this.currentIndex !== cat.index) {
                this.currentIndex = cat.index;
                FocusView.renderImage();
                FocusView.renderCounter();
                AdminView.render(this.adminViewVisible);
            }
        }

        static onFocusClick (cat) {
            cat.counter++;
            FocusView.renderCounter();
            AdminView.render(this.adminViewVisible);
        } 

        static onAdminShowClick () {
            this.adminViewVisible = true;
            AdminView.render(true);
        }

        static onAdminOkClick () {
            var cat = this.getCurrentCat();
            cat.counter = AdminView.counterInput;
            FocusView.renderCounter();

            var src = AdminView.sourceInput;
            if (src !== cat.imageSource) {
                cat.imageSource = src;
                ListView.render();
                FocusView.renderImage();
            }

            this.adminViewVisible = false;
            AdminView.render(false);
            //return false to avoid page reload
            return false;
        }

        static onAdminCancelClick () {
            this.adminViewVisible = false;
            AdminView.render(false);
            //return false to avoid page reload
            return false;
        }
    }

    window.onload = () => {
        Octopus.init();
    };

})();
