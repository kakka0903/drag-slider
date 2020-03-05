class dragSlider{
    constructor(pointerId, progressId, containerId, direction) {
        // check direction
        if (!(direction == 'horizontal' || direction == 'vertical')) {
        	throw('Direction must be: "horizontal" or "vertical"') 
        }
        
        // set direction
        this.direction = direction
        
        // get elements
        this.pointer = document.getElementById(pointerId)
        this.progress = document.getElementById(progressId)
        this.container = document.getElementById(containerId)
    
        if (!(this.pointer && this.progress && this.container)) {
        	throw('Could not init dragSlider class: some element not found  ')
        }
        // set variables to be used
        this.dragging = false;
        this.initalWidth = null;
        this.initalHeight = null;
        this.initalX = null;
        this.intialY = null;
        this.percent = 0;
        
        // attach event listeners
        this.container.addEventListener('mousedown', this.startDrag.bind(this))
        document.addEventListener('mouseup', this.endDrag.bind(this))
        document.addEventListener('mousemove', this.drag.bind(this))

        this.container.addEventListener("touchstart", this.startDrag.bind(this), false);
        document.addEventListener("touchend", this.endDrag.bind(this), false);
        document.addEventListener("touchmove", this.drag.bind(this), false);
    }
    startDrag(e) {
        // start dragging if the pointer was clicked
        if (e.target == this.pointer) {
            // set inital vaulues for x and width
            this.initalWidth = this.progress.offsetWidth
            this.initalHeight = this.progress.offsetHeight

            // check if touch or click
            if (e.type === "touchstart") {
                this.initalY = e.touches[0].clientY;
                this.initalX = e.touches[0].clientX;
            } else {
                this.initalY = e.clientY;
                this.initalX = e.clientX;
            }

            // start dragging
            this.dragging = true
        } else {
            // skip to where was clicked
            var rect = this.container.getBoundingClientRect();
            if (this.direction == 'horizontal' ) {
                var x = e.clientX - rect.left; //x position within the element.
                this.percent = x / this.container.offsetWidth
                
                this.updateUI(this.percent)
            }
            else if (this.direction == 'vertical' ) {
                //y position within the element.
                var y =  e.clientY - rect.top   
                this.percent = 1 - (y / this.container.offsetHeight)
                this.updateUI(this.percent)
            }
            this.onDrag(this.percent)
            this.onEnd(this.percent)
        }
    }
    endDrag(e) {
        if(this.dragging) {
            //stop dragging
            this.dragging = false
            this.onEnd(this.percent)
        }
    }
    drag (e) {
        if(this.dragging) {
            
            e.preventDefault();

            // check if touch or click
            if (e.type === "touchmove") {
                var y = e.touches[0].clientY;
                var x = e.touches[0].clientX;
            } else {
                var y = e.clientY;
                var x = e.clientX;
            }
            
            // use mouse movement to calculate new width
            var changeX = x - this.initalX;
            var changeY = y - this.initalY;
            var newWidth = this.initalWidth+changeX
            var newHeight = this.initalHeight-changeY

            // calculate new width
            if(newWidth > this.container.offsetWidth) {
                newWidth = this.container.offsetWidth
            } else if(newWidth < 0) {
                newWidth = 0
            }
            
            // caculate new height
            if(newHeight > this.container.offsetHeight) {
                newHeight = this.container.offsetHeight
            } else if(newHeight < 0) {
                newHeight = 0
            }

            //calculate percent completion
            if (this.direction == 'horizontal' ) {
            	this.percent = (newWidth / this.container.offsetWidth)
            }
            else if (this.direction == 'vertical' ) {
            	this.percent = (newHeight / this.container.offsetHeight)
            }
            
            //update ui
            this.updateUI(this.percent)
            
            // call function to be used outside class
            this.onDrag(this.percent)
        }
    }
    updateUI(percent){
        // update percent 
        this.percent = percent

        // update width 
        if (this.direction == 'horizontal' ) {
            var w = percent*this.container.offsetWidth
        	this.progress.style.width = w+'px'
        }
        //update height
        else if (this.direction == 'vertical' ) {
            var h = percent*this.container.offsetHeight
            this.progress.style.height = h+'px'
        }
    }
    onDrag(percent){}
    onEnd(percent){}
}

export { dragSlider }