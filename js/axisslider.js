(function ($){


	var auto_slide = 0; //keep track of auto slideshow
	var num_slides = 4; //total number of slides available
	var prev_slide = $('.axis-slides li').eq(num_slides -1 ); //keep track of the last shown slide
	var loop = true;	// should the slide show loop
	var random_slides = false;	// should the slide show select slides randomly or in sequence
	var show_speed = 10000; 	//slideshow speed
	var active_dot_color = "#FF2D00"; //color of the currently active dot
	var non_active_dot_color = "#FF8C00"; //color of the unactive dot

	var the_interval;



	$(window).resize(function(){

		//hide captions if screen height is less than 500px
		var window_height = $(window).height() ;


		if( window_height < 500 ){

			$('.axis-caption').hide();
		}
		else{
			$('.axis-caption').show();
		}


	});

	// ShowSlide($('.axis-slides li:eq(0)')); //start by showing the first slide

	$('ul.the-dots li').click(function(e){



		e.preventDefault();

		//get the position of selected dot
		var selected_dot = $(this).index();
		auto_slide = selected_dot;

		// get the list item that corresponds to the number of the dot clicked
		var slide = $('.axis-slides li').eq(selected_dot);

		ShowSlide(slide);

		clearInterval(the_interval);

	});



function makeDotActive(dot){

	//make all dots same color
	$('ul.the-dots li a ').css('color', non_active_dot_color);

	//give the active dot its active dot color
	dot.css('color', active_dot_color);

}


function ShowSlide(slideToShow){


	//get the dot to change color
	var dot_num = $('.axis-slides li').index(slideToShow);
	var dot = $('ul.the-dots li').eq(dot_num).children('a');
	makeDotActive(dot);


	//get the currently visible slide and make it the previous slide
	prev_slide = GetPreviousSlide();


	//hide the previous slide and show the requested slide


	//slide transitions
	// $('.axis-slides li').eq(prev_slide).hide('slide',{ direction : "left" },'fast',function(){
	// 	slideToShow.show('slide',{ direction : "right" },'slow');
	// });


	//fade transitions
	prev_slide.hide('fade','1200',function(){
		slideToShow.show('fade','fast');
	});


}


function AutoSlideShow(){

	var rnd = Math.random() * num_slides; //get random number from 0 to number of slides

	//increment the slide number for next slide to show
	if( ! random_slides){
		auto_slide++;
	}
	else{

		//if random get a random generated slide number
		auto_slide = Math.floor( rnd );
	}
	 

	if (auto_slide >= num_slides && loop){

		//reset the slideshow
		auto_slide = 0;
	}
	else if (auto_slide >= num_slides && !loop){

		auto_slide = num_slides - 1; //set the slideshow to the last slide
	}


	var slideToShow = $('.axis-slides li').eq(auto_slide); //get the current slide


	ShowSlide(slideToShow);


}


function GetPreviousSlide(){

	var visible_slide = null;

	$('.axis-slides li').each(function(index,ele){

		// console.log($(ele).css('display'));


		if ( $(ele).css('display') != 'none' ){

			visible_slide = $(ele);
		}

	});

	 
	if ( visible_slide == null){
		visible_slide = $('.axis-slides li');
	}

	return visible_slide;
}



//start by hiding all slides and showing the first slide
$('.axis-slides li').hide();

ShowSlide($('.axis-slides li').eq(auto_slide));

the_interval = setInterval(AutoSlideShow , show_speed);





//functionality for the event slider
var AxisEventSlider = {

	num_slides: 0,
	current_slide: 0,
	init : function(num_slides){
		this.num_slides = num_slides;
		this.current_slide = 0;
	},
	moveToNextSlide : function(){
		this.current_slide += 1;
		this.current_slide = (this.current_slide >= this.num_slides) ? 0 : this.current_slide  ;
		this.showCurrentSlide();

	},
	moveToPrevSlide : function(){
		this.current_slide -= 1;
		this.current_slide = (this.current_slide < 0 ) ? (this.num_slides - 1 ) : this.current_slide ;
		this.showCurrentSlide();

	},
	showCurrentSlide : function(){
		$('.events-slider li').hide();
		$('.events-slider li').eq(this.current_slide).show();
	}

}


AxisEventSlider.init(4);


$('.events-slider-arrows .col-xs-3 a').click(function(e){
	e.preventDefault();

	if ( $('.events-slider-arrows .col-xs-3 a').index($(this)) == 0 ){
		AxisEventSlider.moveToPrevSlide();
	}
	else{
		AxisEventSlider.moveToNextSlide();

	}

});


})(jQuery);