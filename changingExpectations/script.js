(function() {

    function incrementCounter () {
        ++this.clickCounter;
        this.textContent = this.clickCounter;
    }
    
    window.onload = function () {

        for (var i = 0; i <= 1; ++i) {
            var counterElement = document.getElementById("counter" + i);
            counterElement.clickCounter = 0;
            var cat = document.getElementById("cat" + i);
            cat.addEventListener('click', incrementCounter.bind(counterElement));
        }
    }
})();