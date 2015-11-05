$(function(){
	$("#search").submit(findJob);
// prev button of pagination
	$("#jobs").on("click", "#prev", function(){
		if(page > 0){
			page--;
		}
		changePage(page);
	});
// next button of pagination
	$("#jobs").on("click", "#next", function(){
		page++;
		changePage(page);
	});
// click event for table rwo
	$("#jobs").on("click", "table tr", function(e){
		// extracting id from the tr data using jQuery
		var detail = jobDetail($(this).data('id'));
	});

});


	
