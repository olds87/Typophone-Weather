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
        am = (date().getHours() < 12) ? true : false;
        document.ampm.src = (am) ? basePath + 'am.png' : basePath + 'pm.png';
    } else
        document.ampm.src = basePath + 'NOTamNORpm.png';
	$('#hr1').text(hour.substring(0,1));	
	$('#hr2').text(hour.substring(1,2));
}

function setMinute(minute) {
	$('#mn1').text(minute.substring(0,1));	
	$('#mn2').text(minute.substring(1,2));
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