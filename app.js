const movies = ['Star Wars', 'Star Wars: Episode V - The Empire Strikes Back', 'Star Wars: Episode VI - Return of the Jedi', 'Star Wars: Episode I - The Phantom Menace', 'Star Wars: Episode II - Attack of the Clones', 'Star Wars: Episode III - Revenge of the Sith', 'The Force Awakens', 'Rogue One: A Star Wars Story', 'The Last Jedi', 'Solo: A Star Wars Story'];
let rottenTomatoes = [];
let userRanking = [];
const omdbKey = '400f5810';
let movieTitle = 'Star+Wars';
// function Movie(name, date, rank) {
//   this.name = name;
//   this.releaseDate = date;
//   this.ranking = rank;
// }
$(document).ready(rottenRanking());
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
    $('.rankList').after('<ol class="rottenList"></ol>');
    $('.rankList').after('<h3 class="listHeader rankListHeader">Rotten Tomatoes Scores</h3>');
    for(i = 0; i < rottenTomatoes.length; i++) {
      $('.rottenList').append(`<li class="ranking">${rottenTomatoes[i].Ratings[1].Value} - ${rottenTomatoes[i].Title}</li>`);
    }
  }
});



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
      rottenTomatoes.push(response);
      if(rottenTomatoes.length > 9) {
        rottenTomatoes.sort(compareValues('Ratings[1].Value'));
        console.log(rottenTomatoes);
      };
    });
  };
};

function compareValues(key, order="asc") {
  return function (a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    let yearA = a[key].replace(/%/g, '');
    let yearB = b[key].replace(/%/g, '');
    let comparison = 0;
    if(yearA > yearB) {
      comparison = -1;
    } else if(yearA < yearB) {
      comparison = 1;
    }
    if(order == 'desc') {
      let comparison = (comparison * -1);
      return comparison;
    } else {
      return comparison;
    }
  }
}

// function movieSort(a, b) {
//   let yearA = a.Ratings[1].Value;
//   let yearB = b.Ratings[1].Value;
//   let comparison = 0;
//   if(yearA > yearB) {
//     comparison = -1;
//   } else if(yearA < yearB) {
//     comparison = 1;
//   }
//   return comparison;
// }



// const newHope = new Movie(response.Title, response.Year, response.Ratings[0].Value);
