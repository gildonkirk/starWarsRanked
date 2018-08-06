const movies = ['Star Wars: Episode IV - A New Hope', 'Star Wars: Episode V - The Empire Strikes Back', 'Star Wars: Episode VI - Return of the Jedi', 'Star Wars: Episode I - The Phantom Menace', 'Star Wars: Episode II - Attack of the Clones', 'Star Wars: Episode III - Revenge of the Sith', 'The Force Awakens', 'The Last Jedi'];
let rottenTomatoes = [];
let releaseDate = [];
let imdbRatings = [];
let userRanking = [];
let dbRatings;
let listMovie;
const omdbKey = '400f5810';
let movieTitle = 'Star+Wars';


$('#sortable').sortable();

$(document).ready(function() {
  displayHomepage();
  dbAverages();
  rottenRanking();
});

$(document).on('click', '.movie', function() {
  if(userRanking.length === 0) {
    $('.rankListContainer').show();
  }
  listMovie = this.innerText;
  $(this).remove();
  $('.rankList').append(`<li class="ranking userRanking list-group-item draggable"><span>${listMovie}</span></li>`);
  userRanking.push(this.innerText || this.textContent);
  lastRanking();
});

$(document).on('click', '.unselected', function() {
  if($(this).hasClass('firstName')) {
    $('.firstName').val('');
    $('.firstName').removeClass('unselected');
  } else if($(this).hasClass('lastName')) {
    $('.lastName').val('');
    $('.lastName').removeClass('unselected');
  };
});

$(document).on('click', '.submit', function() {
  $('.userRanking').removeClass('draggable');
  userRanking = [];
  $('.userRanking').each(function() {
    userRanking.push(this.innerText || this.textContent);
  });
  console.log(userRanking);
  for(i = 0; i < userRanking.length; i++) {
    let rating = (i + 1);
    let movie = userRanking[i];
    let firstName = $('.firstName').val().trim().toLowerCase();
    let lastName = $('.lastName').val().trim().toLowerCase();
    let newRanking = {
      firstName: firstName,
      lastName: lastName,
      movie: movie,
      rating: rating
    };
    $.post('/api/new', newRanking).done(function() {
      console.log('Ranking Added');
    });
  };
  showRankings();
});

function dbAverages() {
  $.get('/api/all', function(data) {
    dbRatings = data;
    dbRatings.sort(compareValues('avg_rating', 'desc'));
    console.log(dbRatings);
  });
};

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
      if(imdbRatings.length > 7) {
        releaseDate.sort(compareValues('Year', 'desc'));
        rottenTomatoes.sort(compareValues('Ratings'));
        imdbRatings.sort(compareValues('imdbRating'));
      };
    });
  };
};

function lastRanking() {
  if(userRanking.length > 7) {
    $('.movieListContainer').remove();

    $('.homepage').append('<div class="row formRow"><div>');

    $('.formRow').append('<div class="col-sm formCol"></div>')

    $('.formCol').append('<input value="First Name" class="firstName unselected">');
    $('.formCol').append('<input value="Last Name" class="lastName unselected">');
    $('.formCol').append('<button class="submit">Submit</button>');
  };
};

function displayHomepage() {
  $(document).on('click', '.instrucButton', function() {
    $('.instructions').hide();
    $('.homepage').show();
  })
};

function showRankings() {
  $('.homepage').append('<div class="row infoRow"><div>');

  $('.infoRow').append('<div class="col-sm infoCol rottenContainer"></div>')
  $('.infoRow').append('<div class="col-sm infoCol imdbContainer"></div>')
  $('.infoRow').append('<div class="col-sm infoCol siteAvgContainer"></div>')



  $('.rottenContainer').append('<h3 class="listHeader rankListHeader rottenListHeader">Rotten Tomatoes Ratings</h3>');
  $('.imdbContainer').append('<h3 class="listHeader rankListHeader imdbListHeader">IMDB Ratings</h3>');
  $('.siteAvgContainer').append('<h3 class="listHeader rankListHeader siteAvgListHeader">SW Ranked Average Rankings</h3>');

  $('.rottenContainer').append('<ol class="rottenList"></ol>');
  $('.imdbContainer').append('<ol class="imdbList"></ol>');
  $('.siteAvgContainer').append('<ol class="siteAvgList"></ol>');

  for(i = 0; i < rottenTomatoes.length; i++) {
    $('.rottenList').append(`<li class="ranking">${rottenTomatoes[i].Title} - ${rottenTomatoes[i].Ratings[1].Value}</li>`);
    $('.imdbList').append(`<li class="ranking">${imdbRatings[i].Title} - ${imdbRatings[i].imdbRating}/10</li>`);
    $('.siteAvgList').append(`<li class="ranking">${dbRatings[i].movie}`);
  };
  $('.formRow').remove();
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
