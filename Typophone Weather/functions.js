basePath = 'Private/';
AM_PM = true;    // switch between 12 (true) and 24 (false) hour format ! Respring to take effect !

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
    document.hr1.src = basePath + hour.substring(0,1) + '.png';
    document.hr2.src = basePath + hour.substring(1,2) + '.png';
}

function setMinute(minute) {
    document.mn1.src = basePath + minute.substring(0,1) + '.png';
    document.mn2.src = basePath + minute.substring(1,2) + '.png';
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
    return "date" + date().getDate();
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
function catchSwipe(event, tapFunction, args){
	var args = args || null;
	if(event && event.touches && event.touches.length == 1){
		event.stopPropagation();
		
		var startX = event.touches[0].pageX;
		var startY = event.touches[0].pageY;
		var x = startX;
		var y = startY;

		document.ontouchend = function(){
			if(typeof(tapFunction) == "function" && Math.sqrt(Math.pow(startX - x, 2) + Math.pow(startY -y, 2)) <= 3){
				tapFunction(args);
			}
			document.ontouchend = undefined;
			document.ontouchmove = undefined;
		};

		document.ontouchmove = function(e){
			if(Math.abs(startY - e.touches[0].pageY) > 20){
				x = e.touches[0].pageX;
				y = e.touches[0].pageY;
				document.ontouchend(e);
				return false;
			}else if(Math.abs(startX - x) >= 60){
				if(Math.abs(y - e.touches[0].pageY) <= 20){
					if(startX > x){
						//show forecast
						$('#weather').addClass('forecast');
					}else {
						//hide forecast
						$('#weather').removeClass('forecast');
					}
				}
				x = e.touches[0].pageX;
				y = e.touches[0].pageY;
				document.ontouchend(e);
			}else{
				x = e.touches[0].pageX;
				y = e.touches[0].pageY;
			}
		};
	}else if(typeof(tapFunction) == "function"){
		tapFunction(args);
	}
}
function toggleForecast(){
		$('#weather').toggleClass('forecast');
}