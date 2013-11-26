$(document).ready(function(){
	alert($(window).width());
	/*
		Global variables
	*/
	var clues = [];
	var markers = [];
	var answers = [];
	
	/*
		Down here is the generating of clues and all that stuff
	*/
	clues[0] = {id: 0, name:"Wishing Chair", done:false, description:"In bronze this leaf holds the key<br>A wishing chair just made for me<br>The first of Betty's middle name<br>Will help the maker with my game", latlng: [-67.60922, -101.25]};
	clues[1] = {id: 1, name:"Bucket of Treasure", done:false, description:"The bucket is somewhere, but can you find it and find out what is inside?!", latlng: [13.9234, -56.25]};
	clues[2] = {id: 2, name:"Sea of the undead", done: false, description: "The sea of the undead hasn't been visited in over 200 years, will you be the first to see what's inside?", latlng: [-8.40717, 81.5625]};	
	clues[3] = {id: 3, name:"Sugar Island of Doom", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[4] = {id: 4, name:"Toblerone of Terror", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[5] = {id: 5, name:"Haunted Gallows", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};
	clues[6] = {id: 6, name:"Treasure Chest", done:false, description:"Find the treasure chest and hopefully it hasn't been looted before!", latlng: [-67.60922, -101.25]};


	function submit(input,index){
		for(var	i = 0; i < answers.length; i++ ){
			if(answers[i].clue == index){
				answers[i].answer = input;
				alert("submitted");
				return;
			}
		}
		clues[index].done = true;
		answers.push({answer: input, clue: index, id: answers.length});
		alert(clues[index].done);
		//$("#clueList #" + index).attr("data-theme", "a");
		updateColors(index);
	}
	
	for(var i = 0; i < clues.length; i++){
		generateClues(clues[i], i);
		generateCluesList(clues[i], i);
	}
	
  for(var i = 0; i < 3; i++){
   	$("#clueList #" + i).attr("data-icon", "check");
  }
  $("#clueList").trigger("create");

	function generateClues(clues, index){
		append("body", "<div id=\"clue"+index+"\" data-role=\"page\"></div>");
		append("#clue"+index, "<div data-role=\"content\" id =\"content\" align=\"center\"></div>");
		append("#clue"+index+" #content", "<div data-role=\"header\" data-position=\"fixed\" id=\"head\"></div>");
		//  append("#clue"+index+" #content #head","<h1>"+clues.name+"</h1>");
		append("#clue"+index+ " #content", "<div id=\"title\"></div>");
		//append("#clue"+index+" #content #title", "<img src=\"place.png\"> </img>");
		append("#clue"+index+" #content #title", "<b>"+clues.name+"</b>");
		append("#clue"+index+ " #content", "<p>"+clues.description+"</p>");
		//append("#clue"+index+ " #content #head", "<a href=\"#clues\" data-icon=\"arrow-l\" data-role=\"button\">Back</a>");
		append("#clue"+index+" #content", "<input type=\"text\" name=\"text-basic\" id=\"text-basic\" value=\"Enter your answer here!\">");
		append("#clue"+index+" #content","<div id=\"submit-answer\"data-role=\"controlgroup\" data-type=\"horizontal\" data-mini=\"true\">");
		append("#clue"+index+" #content", "<input type=\"button\" value=\"Submit\" id=\"submitButton"+index+"\" data-theme=\"b\"  data-mini=\"true\">");
		
		$("#clue" +index+" #content #text-basic").click(function(e){
			$("#clue" +index+" #content #text-basic").val("");
		});
	
			
		$("#submitButton" +index).click(function(){
			var value = $("#clue"+index+" #content #text-basic").val();
			submit(value, index);
		});
		$("#back" + index).click(function(){
			window.history.back();
		});
	}

	function answerQuestion(question, answer){
		clues[question].done = true;
		answers.push(aswer);
	}

	function generateCluesList(clues, index){
    count = index+1;
		append("#clueList ", "<li id=\""+index+"\" data-icon=\"false\"><a href=\"body #clue"+index+"\" data-rel=\"dialog\">"+clues.name+"</a> </li>");
		updateColors(index);
	}
	
	function updateColors(index){
		if(clues[index].done){
			$("#clueList #" + index).attr("data-theme", "a");
		}else{
			$("#clueList #" + index).attr("data-theme", "c");
		}
	}
	
	function append(to, args){
		$(to).append(args);
	}
	
	$("#back").click(function(){
		window.history.back();
	});
	
	
	/*
		Initializing leaflet.js
	*/
	$("#mapPlacement").html("<div id=\"map\" style=\"height: 500px\"></div>");
	var imageUrl = 'img/Map.png',
    	imageBounds = [[40, -60], [-85, 102]];
	var map = L.map('map', {
		center: [40,-60],
		zoom: 1,
		minZoom: 1,
		maxZoom: 6,
		trackResize: false,
		maxBounds: [[42, -62], [-85, 102]]
	});
	map.on("zoomend", function(){
		var size = map.getZoom();
		var pixToCord = 0.92 * 4;
		var width = $("#map").width();
		var height = 500;
		map.setMaxBounds([[42, -62],[-82 + (height / (size * (pixToCord * 5))), 102 - (width / (size * pixToCord))]]);

	});
	//$(".text").toggle();
	//map.fitBounds([[40, -60], [-85.28792, 102.65625]]);
	//$("#map").width(width + 1);
	//var id = 0;	
	/*map.on('mousemove', function(e) {
		$(".text").html("<p>"+e.latlng.toString()+"</p>");
	});*/
	
	L.imageOverlay(imageUrl, imageBounds).addTo(map);
	/*L.tileLayer('HighResCat/{z}/{x}/{y}.jpg', {
            minZoom: 0,
            maxZoom: 6,
            attribution: 'ESO/INAF-VST/OmegaCAM',
            tms: true,
			noWrap: true
        }).addTo(map);*/

	for(var i = 0; i < clues.length; i++){
		var marker = L.marker(clues[i].latlng,{title: clues[i].name, riseOnHover: true }).addTo(map);
		addClueMarker(marker, i);
		markers.push(marker);
	}
	
	function addClueMarker(marker, route){
		marker.on('click', function(){
      			// location.href = "#clue"+route;
      			$.mobile.changePage( "#clue"+route, { role: "dialog"} );
		});
	}
});
