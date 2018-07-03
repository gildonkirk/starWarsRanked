const movies = ['Star Wars', 'Star Wars: Episode V - The Empire Strikes Back', 'Star Wars: Episode VI - Return of the Jedi', 'Star Wars: Episode I - The Phantom Menace', 'Star Wars: Episode II - Attack of the Clones', 'Star Wars: Episode III - Revenge of the Sith', 'The Force Awakens', 'Rogue One: A Star Wars Story', 'The Last Jedi', 'Solo: A Star Wars Story'];
let data = [];
let userRanking = [];
let rottenTomatoesRanking = [];
// function Movie(name, date, rank) {
//   this.name = name;
//   this.releaseDate = date;
//   this.ranking = rank;
// }

$(document).on('click', '.movie', function() {
  $(this).removeClass('movie');
  $(this).addClass('ranking');
  $(this).clone().appendTo('.rankList');
  $(this).removeClass('ranking');
  $(this).addClass('ranked');
  userRanking.push(this.innerText || this.textContent);
  if(userRanking.length > 9) {
    $('.movieList').remove();
    $('.movieListHeader').remove();
    rottenRanking();
    $('.rankList').after('<ol class="rotten"><li>Hey</li></ol>');
  }
});

const omdbKey = '400f5810';
let movieTitle = 'Star+Wars';

// $.ajax({
//   url: `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieTitle}`,
//   method: "GET"
// }).done(function(response) {
//   console.log(response);
// });



function rottenRanking() {
  for(i = 0; i < movies.length; i++) {
    movieTitle = movies[i].replace(/ /g, '+');
    $.ajax({
      url: `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieTitle}`,
      method: "GET"
    }).done(function(response) {
      // console.log(response);
      data.push(response);
      if(data.length > 9) {
        data.sort(movieSort);
        console.log(data);
      };
    });
  };
};

function movieSort(a, b) {
  let yearA = a.Ratings[1].Value;
  let yearB = b.Ratings[1].Value;
  let comparison = 0;
  if(yearA > yearB) {
    comparison = -1;
  } else if(yearA < yearB) {
    comparison = 1;
  }
  return comparison;
}



// const newHope = new Movie(response.Title, response.Year, response.Ratings[0].Value);
