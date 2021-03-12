class AppController { 

    constructor() {

        this.btnPrevEl = document.getElementById('prev') // get the prev button element
        this.btnNextEl = document.getElementById('next') // get the next button element

        this.numbersEl = document.querySelector('.numbers') // get the numbers numeric div

        this.images = [...document.querySelectorAll('.slide-image')] // this is the image array elements
        this.imagesSize = this.images.length // get the size of our images array

        this.linkedList = new CircularLinkedList() // instantiate the linked list class
        this.initialize() // init the app events and more
        this.initSlider() // init the auto slider
        this.initKeyEvents() // this is the left and back arrow mouse click

    }

    initialize() {

        //go through the images and append it to the linked list
        this.images.forEach((row, index) => {

            const img = row.querySelector('img')
            
            this.linkedList.append(index) // append the value to the linked list

        })

        this.current = this.linkedList.head // point the current node to the head node of the circular linked list

        //init all the events 

        //verify if the button exists
        if(this.btnPrevEl) {

            //init the button click event
            this.btnPrevEl.addEventListener('click', e => {

                this.updateSlide("left") // update slide method call

            })

        }

        //verify if the button exists
        if(this.btnNextEl) {

            //init the button click event
            this.btnNextEl.addEventListener('click', e => {

                this.updateSlide() // update slide method call

            })

        }

        this.updateSlideStat() //update slide stat method call

    }

    //this method inits the image timer
    initSlider() {

        //set a timer for the slider to run
        this.timer = this.initTimer()

    }

    //this the key event method
    initKeyEvents() {

        window.addEventListener('keyup', e => {

            switch(e.key) {
                case 'ArrowLeft': 
                case 'A':
                case 'a':
                    this.updateSlide("left")
                    break
                case 'ArrowRight': 
                case 'D':
                case 'd':
                    this.updateSlide()
                    break
            }

        })

    }

    //this this is the method that creates the timer (setInterval function)
    initTimer() {

        return setInterval(() => {

            this.updateSlide() // update the slide method call

        }, 5000)

    }

    //this method updates the slider image and the numbers stat
    updateSlideStat() {

        this.images.forEach( image => image.style.display = 'none' )

        this.images[this.current.value].style.display = 'block'

        this.updateNumbersStat()

    }

    //this method update the slider numbers stat
    updateNumbersStat() {

        this.numbersEl.innerHTML = `${this.current.value + 1} / ${this.imagesSize}`

    }

    //this method updates the slide stat and the current circular linked list data structure node
    updateSlide(target = 'next') {

        clearInterval(this.timer)

        // set the current according to the prev/next button click
        this.current = (target == 'next') ? this.current.next : this.current.prev 

        //update the slide image and the slide numbers stat
        this.updateSlideStat()

        this.timer = this.initTimer()

    }

}

new AppController()