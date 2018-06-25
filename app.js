const movies = ['Star Wars', 'Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'The Force Awakens', 'Rogue One', 'The Last Jedi', 'Solo'];
let moviesRanked = {

}

const trilogies = ['Star Wars', 'Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menace', 'Attack of the Clones', 'Revenge of the Sith', 'The Force Awakens', 'The Last Jedi'];
const ranking = [];
$(document).on('click', '.movie', function() {
  $(this).removeClass('movie');
  $(this).addClass('ranking');
  $(this).clone().appendTo('.rankList');
  $(this).removeClass('ranking');
  $(this).addClass('ranked');
  ranking.push(this.innerText || this.textContent);
  if(ranking.length > 9) {
    $('.movieList').remove();
    $('.movieListHeader').remove();
  }
});

const omdbKey = '400f5810';
let movieTitle = 'Star+Wars';

$.ajax({
  url: `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieTitle}`,
  method: "GET"
}).done(function(response) {
  console.log(response);
});

for(i = 0; i < movies.length; i++) {
  movieTitle = movies[i].replace(/ /g, '+');
  console.log(movieTitle);
  // $.ajax({
  //   url: `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieTitle}`,
  //   method: "GET"
  // }).done(function(response) {
  //   console.log(response);
  // });
}
