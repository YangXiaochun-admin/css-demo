//JS to make it work on single page/codepen
var MainNav = $('.MainNav-Button');

MainNav.on('mousedown', function(){
	var $this = $(this);
	$this.parent().find('.MainNav-Button').removeClass('MainNav-Button_LeftOfActive MainNav-Button_RightOfActive MainNav-Button_Active');
	$this.addClass('MainNav-Button_Active').prev().addClass('MainNav-Button_LeftOfActive');
	$this.next().addClass('MainNav-Button_RightOfActive');
});

MainNav.on('click', function(event){
	event.preventDefault();
});