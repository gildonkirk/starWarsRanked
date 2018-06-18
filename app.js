const omdbKey = '400f5810';

$.ajax({
  url: `http://www.omdbapi.com/?t=the+revenant&y=&plot=short&apikey=${omdbKey}`,
  method: "GET"
}).done(function(response) {
  console.log(response);
});
