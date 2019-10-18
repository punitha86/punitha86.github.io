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
      $('.content').append($('<img>').attr('src', x.urlToImage).addClass('newsimg'));
    } //end of for loop
  }, (error) => {

  })


})
