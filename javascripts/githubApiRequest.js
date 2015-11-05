
function findJob(){
	var func = $("#func").val();
	var loc = $("#loc").val();
	page = 0;
	try{
		// accessing job api at github for data based on the 
		// entered description of desired skill and locaiton
		$.ajax({
			url: "https://jobs.github.com/positions.json?",
			data: {
				description : func,
				location : loc,
				page: 0,
				callback: "displayJobs"
			},
			dataType: "jsonp",
			crossDomain: true
		});
		return false;
	} catch (e) {console.log(e.description);}
}

function changePage(page){
	var func = $("#func").val();
	var loc = $("#loc").val();
	try{
		// accessing job api at github for data based on the 
		// entered description of desired skill and locaiton
		$.ajax({
			url: "https://jobs.github.com/positions.json?",
			data: {
				description : func,
				location : loc,
				page: page,
				callback: "displayJobs"
			},
			dataType: "jsonp",
			crossDomain: true
		});
		return false;
	} catch (e) {console.log(e.description);}
}

function jobDetail(id){
	try{
		// getting job detail for the specific id
		$.ajax({
			url: "https://jobs.github.com/positions.json?",
			data:{
				search: id,
				callback: "displayJobDetail"
			},
			jsonp: false,
			dataType: "jsonp",
			crossDomain: true
			// success: function(res){
				// displayJobDetail(res);
            // }
		});
		return false;
	} catch (e) {console.log(e.description);}
}

function displayJobDetail(res){
	var response = res[0];
	$("#jobDetail").children().remove();
	// add link to the elements wrapped in <a>
	var display = "<a href='"+response.company_url+"'>";
	// if json includes a photo use the photo, other wise use the
	// company name
	if((response.company_logo!=null) && 
		(response.company_logo.search("http")==0)){
		display += "<img src='"+ response.company_logo +"' \
	class='img-responsive' alt='Responsive image'>";
	} else {
		display += "<h2>" + response.company +"</h2>";
	}
	// adding descriptions for the job
	display += "</a>";
	display += "<h3>"+response.title+"</h3>"
	display += "<h4>"+response.type+"</h4>"
	display += "<h4>"+response.location+"</h4>"
	display += "<ul>";
	display += "<li>"+response.description+"</li>";
	display += "</ul>";
	display += response.how_to_apply;
	$("#jobDetail").children().remove();
	$("#jobDetail").append(display);
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}

// processing the response to be displayed on the website
function displayJobs(response){
	$("#jobDetail").children().remove();
	var len = response.length;
	var display;
	if (len == 0 && page == 0){
		display = "<h4>No Match</h4>";
		$("#jobs").children().remove();
	} else if (len == 0 && page != 0){
		page--;
		alert("last page");
	} else {
		// simple display as a list
		display = "<table class='table table-hover'><tr><th>Duration\
		</th><th>Title</th><th>Company</th></tr>";
		for (var i = 0; i < len; i++){
			var cur = response[i];
			// adding ids to tr
			display += "<tr data-id='"+cur.id+"'>";
			var li = "<td>" +cur.type + "</td><td>" + cur.title
			+ "</td><td>" + cur.company + "</td>";
			display += li;
			display += "</tr>"
		}
		display += "</table>"
		// adding buttons for pagination
		var prev = "<button class='btn btn-default' id='prev'><span \
		class='glyphicon glyphicon-chevron-left' aria-hidden='true'>\
		</span>Prev</button>&nbsp";
		var next = "<button class='btn btn-default' id='next'>Next<span \
		class='glyphicon glyphicon-chevron-right' \
		aria-hidden='true'></span></button>";
		display += prev;
		display += next;
		$("#jobs").children().remove();
	}
	$("#jobs").append(display);
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}