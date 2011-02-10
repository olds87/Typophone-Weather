var weather = {};
var TO, toShow;
var currentZip;
var temp;
var conditions;
function showSelector(el){
	el.toggleClass('showSelector');
	var wth = $('#weather');
	wth.toggleClass('showSelector');
}
function listCities(){
	//if(navigator.userAgent.toLowerCase().match("mozilla"))
	//	$('#timeWrap').hide();
	$('#locationSelector').html('');
	
	//populate locations selector
	for(var l = 0 ; l<weather.places.length ; l++){
		var cls="location";
		var cty = weather.places[l];
		console.log(cty.zip + "==" +currentZip);
		if(cty.zip==currentZip || (!currentZip && l==0)){
			cls="location active";
		}
		$('#locationSelector').append('<span ref="'+cty.zip+'" class="'+cls+'">'+cty.cityName+"</span>");
	}
	//Activate interactions
	var loc = $('.location');
	loc.click(function(){
		var t = $(this);
		t.addClass('active').siblings('span').removeClass('active');
		loadingAnimation(true, t.attr('ref'));
	});
	$('#locationRight').addClass('visible');
	locationArrows();				
	
	$('#timeWrap').click(function(){
		var t = $(this);
		showSelector(t);	
	});
}
var currentPage = 1;
function locationArrows()
{
	var right = $('#locationRight');
	var left = $('#locationLeft');
	var sel = $('#locationSelector');
	right.click(function(){
		left.addClass('visible');
		var pos = sel.position().left;
		if(currentPage<weather.places.length){
			//slideLeft
			var lft = pos-320;
			sel.attr('style','-webkit-transform: translateX('+lft+'px);');
			currentPage ++;					
		}
		if(currentPage==weather.places.length){
				right.removeClass('visible');
		}
	});
	left.click(function(){
		var pos = sel.position().left;
		right.addClass('visible');
		if(currentPage>1)
		{
			var lft = pos+320;
			sel.attr('style','-webkit-transform: translateX('+lft+'px);');
			currentPage--;
			if(currentPage==1){
				left.removeClass('visible');
			}
		}
	});
}
function loadingAnimation(fadeOut, zip)
{
	if(fadeOut){
		$('#loader').addClass('visible');
		renderWeather(zip);
	}
	else
		$('#loader').removeClass('visible');
}
function renderWeather(z)
{
	currentZip = z;
	if(TO)
		clearTimeout(TO);
	$.simpleWeather({
		//location: cLoc,
		zipcode: currentZip,
		unit: temp,
		success: function(weather) {
			var region = ', ' + weather.region;
			if(region == ', ')
			{
				region = ', ' + weather.country;
			}
			var curr0 = (conditions) ? conditions[weather.code].toLowerCase() : weather.currently;
			var curr1 = (conditions) ? conditions[weather.today.code].toLowerCase()  : weather.forecast;
			var curr2 = (conditions) ? conditions[weather.tomorrow.code].toLowerCase()  : weather.tomorrow.forecast;
			$("#weatherThumb").attr('src', weather.image[0]);
			$("#weatherCity").html(weather.city+region);
			$("#weatherTemp").html(weather.temp+'&deg; '+weather.units.temp);
			$("#weatherCurrently").text(curr0);//weather.currently);
			$('#weatherCurrently1').text(curr1);//weather.forecast);
			$('#weatherCurrently2').text(curr2);//weather.tomorrow.forecast);
			$("#weatherCity1").html('Today');
			$("#weatherCity2").html('Tomorrow');
			$('#weather1High').html('<span class="label">High: </span><span class="bold">'+weather.high +'&deg; </span>'+weather.units.temp);
			$('#weather1Low').html('<span class="label">Low: </span><span class="bold">'+weather.low +'&deg; </span>'+weather.units.temp);
			$('#weather2High').html('<span class="label">High: </span><span class="bold">'+weather.tomorrow.high +'&deg; </span>'+weather.units.temp);
			$('#weather2Low').html('<span class="label">Low: </span><span class="bold">'+weather.tomorrow.low +'&deg; </span>'+weather.units.temp);
			$("#weatherThumb1").attr('src', weather.image[1]);
			$("#weatherThumb2").attr('src', weather.tomorrow.image);
			TO = setTimeout('getWeather()', 600000);
			setTimeout(function(){loadingAnimation(false);},500);
		},
		error: function(error) {
			$("#weatherThumb").attr('src', '');//replace with loading
			$("#weatherCity").html('');
			$("#weatherTemp").html('');
			$("#weatherCurrently").text('');
			$('#weatherCurrently1').text('');
			$("#weatherCity1").html('');
			$('#weather1High').html('');
			$('#weather1Low').html('');
			$("#weatherThumb1").attr('');
			$('#weatherCurrently2').text('');
			$("#weatherCity2").html('');
			$('#weather2High').html('');
			$('#weather2Low').html('');
			$("#weatherThumb2").attr('');
			TO = setTimeout('getWeather()',1000);
		}
	});
}
function getWeather(z){
	
	loadingAnimation(false);
	if(!weather.places){
		$('#loader').ajaxError(function(e, xhr, settings, exception) {
			if(isArray(weather.places)){
				if(weather.places.length>1)
					listCities();
				currentZip = weather.places[0].zip;
			}
			else
				currentZip = weather.places.zip;
				renderWeather(currentZip);
		});
		//GET Weather.txt
		$.get('weather.txt', function(d){
			weather = eval("("+d+")");
			temp = weather.units.substr(0,1).toLowerCase();
			var lang = (weather.lang)?weather.lang:"en-us";
			$.get('lang/'+lang+'.txt', function(l){
				conditions = eval("("+l+")");
				if(isArray(weather.places)){
					if(weather.places.length>1)
						listCities();
					currentZip = weather.places[0].zip;
				}
				else
					currentZip = weather.places.zip;
					renderWeather(currentZip);
			});
		});
	}
	else
	{
		renderWeather(currentZip);
	}
}