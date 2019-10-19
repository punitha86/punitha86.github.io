const newsAjaxCall = () => {
  //creating container for teh news articles
  // <div class="container">
  $('.container').empty();
  $('.container').append($('<h1>').text('NEWS'));
  $('.container').append($('<div>').addClass('content'));
  $('.content').append($('<div>').addClass('news-carousel-button previous'));
  $('.news-carousel-button previous').append($('<span class="lnr lnr-chevron-left"></span>'))
  $('.content').append($('<div>').addClass('news-carousel-images'));
  $('.content').append($('<div>').addClass('news-carousel-button next'));
  $('.news-carousel-button next').append($('<span class="lnr lnr-chevron-right"></span>'))


  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=c9b28a91c2114ad2bb5aed577298b412"
  }).then((data) => {
    for (x of data.articles) {
      $('.news-carousel-images').append($('<img>').attr('src', x.urlToImage).addClass('newsimg'));
      $('.news-carousel-images').append($('<p>').text(x.title));
      $('.news-carousel-images').append($('<article>').text(x.description).addClass('description'));
    } //end of for loop
    ////on click of the images we need to give out its conetent
    // $('.newsimg').on('click',() => {
    //   $(event.target).siblings('.description').eq(0).css('display','block');
    //   //$('.content').append('<p>'+x.description+'</p>');
    // })

    //////////////writing the carousel logic///////////////
    let currentImgIndex = 0;
    let highestIndex = $('.news-carousel-images').children().length - 1;

    $('.next').on('click', () => {

      /////first moving to the next element/////////
      //hiding the first image//////
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      ////hiding the description of the first image
      $('.news-carousel-images').children().eq(currentImgIndex + 1).css('display', 'none');
      //moving the index to the next image and check for last image & loop
      (currentImgIndex < highestIndex) ? currentImgIndex += 3: currentImgIndex = 0;

      //bringing up the next image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
      $('.news-carousel-images').children().eq(currentImgIndex + 1).css('display', 'block');
    });

    /////first moving to the previous element/////////
    //hiding current element
    $('.previous').on('click', () => {
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      $('.news-carousel-images').children().eq(currentImgIndex + 1).css('display', 'none');
      //moving the index to the previous image and check for first img & loop
      (currentImgIndex > 0) ? currentImgIndex -= 3: currentImgIndex = highestIndex;
      //bringing up the previous image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
      $('.news-carousel-images').children().eq(currentImgIndex + 1).css('display', 'block');
    })


  }, (error) => {

  })
}
//////////////////////////////Weather Ajax /////////////////////////
const weatherAjaxCall = () => {

  $('.container').append($('<input type="text" placeholder="ZipCode Please!!"/>'));

  $('.container').append($('<button type="button">SUBMIT</button>'))
  event.preventDefault();
  $('.container').append($('<div>').addClass('weathercontent'))
  $('button').on('click', () => {

    let userInput = $('input[type="text"]').val();
    (userInput != "") ? userInput = $('input[type="text"]').val(): userInput = '94087';
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${userInput}&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3`
    }).then((data) => {
      ////converting to fahreinheit funtcion
      const convertToFahrenheit = (num) => {
        num = parseFloat((num - 273.15) * (9 / 5) + 32).toFixed(1);
        return num;
      }
      $('.weathercontent').empty();
      $('.weathercontent').append($('<p>').text("Temperature : " + convertToFahrenheit(data.main.temp)));
      $('.weathercontent').append($('<p>').text("Pressure : " + data.main.pressure));
      $('.weathercontent').append($('<p>').text("Humidity : " + data.main.humidity));
      $('.weathercontent').append($('<p>').text("Min-Temp : " + convertToFahrenheit(data.main.temp_min)));
      $('.weathercontent').append($('<p>').text("Max-Temp : " + convertToFahrenheit(data.main.temp_max)));
      //console.log(data.main.temp);
    }, (error) => {
      console.log(error);
    })

  })

}
//////////////////////////ToDo List//////////////////////////////////


///////////////////////////Games////////////////////////////////////////
//https://www.emoji.co.uk/files/phantom-open-emojis/animals-nature-phantom/12490-jack-o-lantern.png
const gameFunction = () => {

  $('.container').append($('<h2>').text("SMILEY GAME"));
  $('.container').append($('<p>').text("Please click on the extra smiley face on the left"));
  $('.container').append($('<div>').addClass('gameContainer'));
  $('.gameContainer').append($('<div>').addClass("leftsideGamediv").attr('id', 'leftid'));
  $('.gameContainer').append($('<div>').addClass("rightsideGamediv").attr('id', 'rightid'));
  ///increasing the number of faces by 5 for each success
  let noOfFaces = 5;
  for (let i = 0; i < noOfFaces; i++) {
    let randomTopAttribute = Math.floor(Math.random() * 20 )+ 70;
    let randomLeftAttribute = Math.floor((Math.random() * 43)+2);
    $('#leftid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top',randomTopAttribute+"%").css('left',randomLeftAttribute+"%"));
    $('#rightid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top',randomTopAttribute+"%").css('left',(randomLeftAttribute+50)+"%"));
  }
$('#rightid').children().last().remove();
/////need to write logic for the click of teh right image



}

$(() => {
  //console.log("App.js successfully connected");
  //Calling weather api to check for its values
  //c4a833b10b9fb7fdc0ba57f9b6a5e4a3
  //api.openweathermap.org/data/2.5/weather?zip={zip code}
  //news key: c9b28a91c2114ad2bb5aed577298b412


  $('#news').on('click', newsAjaxCall)
  $('#weather').on('click', weatherAjaxCall)
  //$('#games').on('click', gameFunction)
  gameFunction();

})
