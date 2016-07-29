'use strict'


class DragList{
	constructor(){
		this.ulDrag = document.querySelector('.dragList');
		this.onStart = this.onStart.bind(this);
		this.onMove = this.onMove.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.update = this.update.bind(this);




		this.addEventListeners();
		requestAnimationFrame(this.update);
	}

    addEventListeners(){
    	this.ulDrag.addEventListener('touchstart', this.onStart);
    	this.ulDrag.addEventListener('touchmove', this.onMove);
    	this.ulDrag.addEventListener('touchend',this.onEnd);

    }

    onStart(event){
    	if(!event.target.classList.contains('dragList_li')) 
    		return;
    	this.target = event.target;
    	this.targetBCR = this.target.getBoundingClientRect();
    	this.startY = event.pageY || event.touches[0].pageY;
    	// Add case horizontal move and add flag dragging here!!
        this.currentY	 = this.startY;
    	this.target.style.willChange = 'transform';
    }

    onMove(event){
    	if (!this.target) return;
    	this.currentY = event.pageY || event.touches[0].pageY;
    }

    onEnd(event){
    	if (!this.target) return;

    	// add functional about end move and flags mkust be here
    	

    }

    update(){
    		requestAnimationFrame(this.update);
    		
    		if (!this.target)
            return;
        	console.log(this.currentY - this.startY)
    		this.screenY = this.currentY - this.startY;

    		this.target.style.transform = `translateY(${this.screenY}px)`

    }
}

new DragList()