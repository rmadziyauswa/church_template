(function ($){

	
	FixsidebarHeights();

	
	//show hide the serach input box

	$('#searchbutton').click(function(){
		ToggleSearch();
	});


	$("#axis-menu-search").blur(function(){
			ToggleSearch();
	});

	function ToggleSearch(){
		$('#searchbutton').toggle();
		$("#search-container").toggle();

		//check if the search input is visible
		if( $('#search-container').css('display') == 'block'){
			$('input#axis-menu-search').focus();
		}
	}



	//auto show bootsraps sub menus on hover
	$("li.dropdown").hover(function(){

		if($(window).width() > 768){
			$(this).children('.dropdown-menu').stop(true,true).show();
		}
		

	},function(){
		if($(window).width() > 768){
			$(this).children('.dropdown-menu').stop(true,true).hide();
		}

	});


	//auto show bootsraps sub menus on click in small screen devices
	$("li.dropdown.open a, li.dropdown.open").click(function(e){



		if($(window).width() < 768){
			$(this).children('.dropdown-menu').stop(true,true).show();

			console.log($(this).children('.dropdown-menu'));
		}
		

	});


	//window resizing corectional functions
	$(window).resize(function(){
		FixsidebarHeights();		

	});


	function FixsidebarHeights()
	{

		var container_height = $('.blog-container').height();
		var sidebar_height = $('.axis-right-sidebar').height();
		var win_width = $(window).width();


		$('.axis-right-sidebar').css('height' , 'initial');



		if(( win_width > 980) && (container_height > sidebar_height ))
		{
			//console.log("Win Width = " +  win_width );


			$('.axis-right-sidebar').height(container_height * 0.9);

		}
		else
			{
			$('.axis-right-sidebar').css('height' , 'initial');
		}
	}


	$('.event-month-name').click(function(e){
		e.preventDefault();
		$(this).siblings('.event-month-list').slideToggle();
	});

})(jQuery);