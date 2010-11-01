basePath = '';
AM_PM = true;    // switch between 12 (true) and 24 (false) hour format ! Respring to take effect !
function isArray(obj) {
	return (obj.constructor.toString().indexOf("Array") != -1);
}
function handle() {
    setTimeout('handle()',1000);
    setHour(getHour(AM_PM), AM_PM);
    setMinute(getMinute());
}

function setHour(hour, AM_PM) {
    if(AM_PM) {
        am = (date().getHours() < 13) ? true : false;
        document.ampm.src = (am) ? basePath + 'am.png' : basePath + 'pm.png';
    } else
        document.ampm.src = basePath + 'NOTamNORpm.png';
	$('#hr1').text(hour.substring(0,1));	
	$('#hr2').text(hour.substring(1,2));
    //document.hr1.src = basePath + hour.substring(0,1) + '.png';
    //document.hr2.src = basePath + hour.substring(1,2) + '.png';
}

function setMinute(minute) {
	$('#mn1').text(minute.substring(0,1));	
	$('#mn2').text(minute.substring(1,2));
    //document.mn1.src = basePath + minute.substring(0,1) + '.png';
    //document.mn2.src = basePath + minute.substring(1,2) + '.png';
}

function getMinute() {
    minute = date().getMinutes().toString();
    if(minute < 10)
        minute = '0' + minute;
    return minute;
}

function getHour(AM_PM) {
	hour = date().getHours();
		if(AM_PM) {
			if(hour == 0)
				hour = 12;
			else if(hour > 12)
				hour -= 12;
}
	if(hour < 10)
		hour = '0' + hour;
	return hour.toString();
}

function Day() {
    day = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
    return day[date().getDay()];
}

function DayNumeric() {
	var s = ""+date().getDate();
	if(s.length==1)
		s="0"+s;
    return "date" + s;
}

function Month() {
    month = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
    return month[date().getMonth()];
}

function Year() {
    return date().getFullYear();
}

function date() {
    return new Date();
}
/*
(function($) {
	$.fn.swipe = function(options) {
		
		// Default thresholds & swipe functions
		var defaults = {
			threshold: {
				x: 50,
				y: 30
			},
			swipeLeft: function() { alert('swiped left') },
			swipeRight: function() { alert('swiped right') }
		};
		
		var options = $.extend(defaults, options);
		
		if (!this) return false;
		
		return this.each(function() {
			
			var me = $(this)
			
			// Private variables for each element
			var originalCoord = { x: 0, y: 0 }
			var finalCoord = { x: 0, y: 0 }
			
			// Screen touched, store the original coordinate
			function touchStart(event) {
				//console.log('Starting swipe gesture...')
				originalCoord.x = event.targetTouches[0].pageX
				originalCoord.y = event.targetTouches[0].pageY
			}
			
			// Store coordinates as finger is swiping
			function touchMove(event) {
			    event.preventDefault();
				finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
				finalCoord.y = event.targetTouches[0].pageY
			}
			
			// Done Swiping
			// Swipe should only be on X axis, ignore if swipe on Y axis
			// Calculate if the swipe was left or right
			function touchEnd(event) {
				//console.log('Ending swipe gesture...')
				var changeY = originalCoord.y - finalCoord.y
				if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
					changeX = originalCoord.x - finalCoord.x
					
					if(changeX > defaults.threshold.x) {
						defaults.swipeLeft()
					}
					if(changeX < (defaults.threshold.x*-1)) {
						defaults.swipeRight()
					}
				}
			}
			
			// Swipe was started
			function touchStart(event) {
				//console.log('Starting swipe gesture...')
				originalCoord.x = event.targetTouches[0].pageX
				originalCoord.y = event.targetTouches[0].pageY

				finalCoord.x = originalCoord.x
				finalCoord.y = originalCoord.y
			}
			
			// Swipe was canceled
			function touchCancel(event) { 
				//console.log('Canceling swipe gesture...')
			}
			
			// Add gestures to all swipable areas
			this.addEventListener("touchstart", touchStart, false);
			this.addEventListener("touchmove", touchMove, false);
			this.addEventListener("touchend", touchEnd, false);
			this.addEventListener("touchcancel", touchCancel, false);
				
		});
	};
})(jQuery);

function swipeWeatherLeft(){
	//alert('swipe left'); 
	if(currentWeatherShowing<2)
		currentWeatherShowing++;	
	var t = $(this);
	t.attr('class','forecast'+currentWeatherShowing);
	$('#timeWrap').removeClass('showSelector');
	
}
function swipeWeatherRight(){
	//alert('swipe right');
	if(currentWeatherShowing>1)
		currentWeatherShowing--;	
	var t = $(this);
	t.attr('class','forecast'+currentWeatherShowing);
	$('#timeWrap').removeClass('showSelector');
}*/
var currentWeatherShowing = 0;
function tapWeather(){
	if(currentWeatherShowing>1)
		currentWeatherShowing=0;		
	else	
		currentWeatherShowing++;	
	var t = $(this);
	t.attr('class','forecast'+currentWeatherShowing);
	$('#timeWrap').removeClass('showSelector');
}