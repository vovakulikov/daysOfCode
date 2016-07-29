function Menu(element){
	if(!element)	return;

	this.el = element;
	this.search_button = document.querySelectorAll('._nav_search_button');
	this.follows_button = this.el.querySelector('._nav_follows_button');
	this.extra_follows = this.el.querySelector('._follows_extra');
	this.search_window = document.querySelector('#search');
	this.mobile_button = this.el.querySelector("._nav_mobile_button");
	this.search_input = this.search_window.querySelector('.search_form_input');
	this.nav_section = this.el.querySelector('.nav_sections');
	this.nav_mobile = this.el.querySelector('.nav_mob');
	this._init();
}
Menu.prototype._init = function(){

    this.follows_clickListener = this.follows_clickEvent.bind(this);
    this.search_clickListener = this.search_clickEvent.bind(this);
    this.mobile_clickListener= this.mobile_clickEvent.bind(this);
    var self = this;

    this.follows_button.addEventListener('click',this.follows_clickListener,false);
    this.mobile_button.addEventListener('click',this.mobile_clickListener,false);
    Array.prototype.forEach.call(this.search_button,function(item,i,arr){
    	item.addEventListener('click', self.search_clickListener,false);
    })
}
Menu.prototype.follows_clickEvent = function(event){

	this.follows_button.classList.toggle('_icon_follows_more_is_active');
	this.extra_follows.classList.toggle('_extra_follows_is_active')
	this.nav_section.classList.toggle('_show_or_hide')
	
}
Menu.prototype.search_clickEvent = function(event){

	this.search_window.classList.toggle('_search_window_is_opened')
	this.search_input.focus()
	//document.body.style.overflow = (document.body.style.overflow === 'hidden')? 'auto': 'hidden';
}
Menu.prototype.mobile_clickEvent = function(event){

	document.body.classList.toggle('_mob_is_active');
	//document.body.style.overflow = (document.body.style.overflow === 'hidden')? 'auto': 'hidden';
	//this.nav_mobile.classList.toogle('')
}

new Menu(document.querySelector('.nav'));
