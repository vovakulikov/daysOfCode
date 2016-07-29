function Y_Menu(element, numberLine){
     if(!element) return;

     this.el = element;
     this.panels = element.querySelectorAll('.y_menu_panels');
     this.controller = this.el.querySelector('.y_menu_wrap_controller');
     this.close_layout = this.el.querySelector('.y_menu_closelayout');

     this._init(numberLine);
}
Y_Menu.prototype._init = function(numberLine){
	this.numberLine = Math.abs(numberLine);
	this.panelsLength = this.panels.length;
	this.selectedPanel = 0;
	this.controller_clickListener = this.controller_clickEvent.bind(this);

	var self = this;

	this.controller.addEventListener('click',this.controller_clickListener,false);
	this.close_layout.addEventListener('click',this.controller_clickListener,false);

	if (!isNaN(numberLine)) {
		this.selectedPanel = (this.numberLine<this.panelsLength)? this.numberLine : this.panelsLength-1;
	}

	this.selectPanel(this.selectedPanel);

}
Y_Menu.prototype.controller_clickEvent = function(event){
	this.el.classList.toggle('y_menu_is_open');
	document.body.classList.toggle('block_body_scroll')
	
}
Y_Menu.prototype.selectPanel = function(numberLine){
	this.panels[numberLine].classList.add('y_menu_first_panel');
}

new Y_Menu(document.querySelector('.y_menu'),1)