$(() => {
  //console.log("App.js successfully connected");
  //Calling weather api to check for its values
  //c4a833b10b9fb7fdc0ba57f9b6a5e4a3
  //api.openweathermap.org/data/2.5/weather?zip={zip code}
  //news key: c9b28a91c2114ad2bb5aed577298b412


  ////weather api giving out the weather information
  //   $.ajax({
  //     url: "http://api.openweathermap.org/data/2.5/weather?zip=94087&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3"
  //   }).then((data) => {
  //     const convertToFahrenheit = (num) => {
  //       num =parseFloat((num-273.15) * (9/5) + 32).toFixed(1);
  // return num;
  //     }
  //
  //     $('.content').append($('<p>').text("Temperature : " + convertToFahrenheit(data.main.temp)));
  //     $('.content').append($('<p>').text("Pressure : " + data.main.pressure));
  //     $('.content').append($('<p>').text("Humidity : " + data.main.humidity));
  //     $('.content').append($('<p>').text("Min-Temp : " + convertToFahrenheit(data.main.temp_min)));
  //     $('.content').append($('<p>').text("Max-Temp : " + convertToFahrenheit(data.main.temp_max)));
  //     //console.log(data.main.temp);
  //   }, (error) => {
  //     console.log(error);
  //   })

  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=c9b28a91c2114ad2bb5aed577298b412"
  }).then((data) => {
    for (x of data.articles) {
      $('.news-carousel-images').append($('<img>').attr('src', x.urlToImage).addClass('newsimg'));
      $('.news-carousel-images').append($('<p>').text(x.title).addClass('description'));
    } //end of for loop

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
      (currentImgIndex < highestIndex) ? currentImgIndex +=2 : currentImgIndex = 0;

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
      (currentImgIndex > 0)? currentImgIndex -= 2: currentImgIndex = highestIndex;
      //bringing up the previous image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
      $('.news-carousel-images').children().eq(currentImgIndex + 1).css('display', 'block');
    })


  }, (error) => {

  })


})
