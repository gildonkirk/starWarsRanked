const movies = ['Star Wars', 'Star Wars: Episode V - The Empire Strikes Back', 'Star Wars: Episode VI - Return of the Jedi', 'Star Wars: Episode I - The Phantom Menace', 'Star Wars: Episode II - Attack of the Clones', 'Star Wars: Episode III - Revenge of the Sith', 'The Force Awakens', 'Rogue One: A Star Wars Story', 'The Last Jedi', 'Solo: A Star Wars Story'];
let rottenTomatoes = [];
let releaseDate = [];
let imdbRatings = [];
let userRanking = [];
let listMovie;
const omdbKey = '400f5810';
let movieTitle = 'Star+Wars';

$(document).ready(rottenRanking());
$(document).on('click', '.movie', function() {
  listMovie = this.innerText;
  console.log(listMovie);
  $(this).remove();
  $('.rankList').append(`<li class="ranking list-group-item"><span>${listMovie}</span></li>`);
  userRanking.push(this.innerText || this.textContent);
  if(userRanking.length > 9) {
    $('.movieList').remove();
    $('.movieListHeader').remove();
    $('.rankList').after('<ol class="rottenList"></ol>');
    $('.rankList').after('<h3 class="listHeader rankListHeader">Rotten Tomatoes Scores</h3>');
    for(i = 0; i < rottenTomatoes.length; i++) {
      $('.rottenList').append(`<li class="ranking">${rottenTomatoes[i].Ratings[1].Value} - ${rottenTomatoes[i].Title}</li>`);
    }
    $('.rankList').after('<button class="submit">Submit</button>');
  }
});

$(document).on('click', '.submit', function() {
  console.log(userRanking);
  for(i = 0; i < userRanking.length; i++) {
    let rating = (i + 1);
    let movie = userRanking[i];
    let newRanking = {
      movie: movie,
      rating: rating
    };
    $.post('/api/new', newRanking).done(function() {
      console.log('Ranking Added');
    })
  }
});

function rottenRanking() {
  for(i = 0; i < movies.length; i++) {
    movieTitle = movies[i].replace(/ /g, '+');
    $.ajax({
      url: `http://www.omdbapi.com/?apikey=${omdbKey}&t=${movieTitle}`,
      method: "GET"
    }).done(function(response) {
      // console.log(response);
      releaseDate.push(response);
      rottenTomatoes.push(response);
      imdbRatings.push(response);
      if(imdbRatings.length > 9) {
        releaseDate.sort(compareValues('Year', 'desc'));
        console.log(releaseDate);
        rottenTomatoes.sort(compareValues('Ratings'));
        console.log(rottenTomatoes);
        imdbRatings.sort(compareValues('imdbRating'));
        console.log(imdbRatings);
      };
    });
  };
};

function compareValues(key, order="asc") {
  return function (a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    let yearA;
    let yearB;
    if(key === 'Ratings') {
      yearA = a[key][1].Value.replace(/%/g, '');
      yearB = b[key][1].Value.replace(/%/g, '');
    } else {
      yearA = a[key];
      yearB = b[key];
    }

    let comparison = 0;
    if(yearA > yearB) {
      comparison = -1;
    } else if(yearA < yearB) {
      comparison = 1;
    }
    if(order == 'desc') {
      comparison = (comparison * -1);
      return comparison;
    } else {
      return comparison;
    }
  }
};
