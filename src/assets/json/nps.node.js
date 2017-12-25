const router = require("express").Router();
const db = require("./db/db_sssdata");

function getLastWeekScore(req,res,next){

	function getMonday(d) {
	  var d = new Date(d);
	  var day = d.getDay(),
	      diff = d.getDate() - day + (day == 0 ? -30:1); // adjust when day is sunday
	  
	  //Use this one to return this format: 25-Jan-2016
	  monday=new Date(d.setDate(diff));
	  var curr_date = monday.getDate();
	  var curr_month = monday.getMonth() + 1;
	  var curr_year = monday.getFullYear();
	  return  curr_year + "-" + curr_month + "-" + curr_date;
	}

	function occurrence(score,arr) {
	    var result = 0;
	    for ( var i = 0; i < arr.length; i++ ) {
	    	if(arr[i] == score) result++;
	    }
	    return result;

	}


	var lastMonday = getMonday(new Date()) + " 00:00:01";

	var query = db.from("npsData")
	  .select('*')
	  query
	  	.whereRaw("insertDT >= ?", lastMonday)
	  	//.whereNotNull("score");
	  /* conditional query building 
	  if ( eventID > 0 ) {
	  	query.where('eventID', eventID);
	  }
	  if ( startDate != "" ) {
	  	
	  }
	  if ( startDate != "" ) {
	  	query.whereRaw("insertDate <= ?", endDate);
	  }*/

	  // console.log(query.toSQL());

	  query.then((data) => {

	  	var submitedScores = data.filter((d) =>{
	  		return d.score
	  	});	  

	  	var scoreMap = submitedScores.map((d) =>{
	  		return d.score;
	  	});

	  	var result=[];
	  	for(var i=0; i < 11; i++){
	  		result.push(occurrence(i,scoreMap))
	  	};

	  	let count = submitedScores.length;
	  	let totolVal = 0;

	  	submitedScores.forEach((d) => {
	  		totolVal += d.score;
	  	});

	  	let averageVal = totolVal / count;	  
	  	
	  	var dismissedScores = data.filter((d) =>{
	  		return d.bDismissed
	  	});

	  	var response_rate = ((submitedScores.length / data.length) * 100).toFixed(2);
	  	
	  	var jsonResult = {
  			aveage: averageVal,
  			scored: submitedScores.length,
  			dimissed: dismissedScores.length,
  			response_rate:response_rate,
  			scores_histogram : result
	  	}

	  	res.json(jsonResult);

	  });
}


router
	.get('/api/photosite/nps/',getLastWeekScore);



module.exports = router  	