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
