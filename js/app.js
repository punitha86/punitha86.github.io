//******************************************************************//
//////////////////////////////News Ajax /////////////////////////
//******************************************************************//

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
    //$('.news-carousel-images').append($('<div>').addClass('newsDiv'))
    //$('.news-carousel-images').append(('<div class="newsDiv">'));
    for (x of data.articles) {
      let appendingString = `<div class="newsDiv">`;
      appendingString += `<img src=${x.urlToImage} class='newsimg' style="width:100%;height=100%">`;
      appendingString += `<p class='newsPara'> ${x.title}</p>`;
      appendingString += `<article class='description'> ${x.description} </article></div>`;
      //  $('.newsDiv').append($('<img>').attr('src', x.urlToImage).addClass('newsimg'));
      //  $('.newsDiv ').append($('<p>').text(x.title).addClass('newsPara'));
      //  $('.newsDiv').append($('<p>').text(x.description).hide());
      $('.news-carousel-images').append(appendingString);
      $('.description').hide();
    } //end of for loop
    //on click of the images we need to give out its conetent
    $('.newsDiv').on('click', () => {
      console.log($(event.currentTarget).children().eq(2));
      $(event.currentTarget).children().eq(2).css('display', 'block');
      //$('.content').append('<p>'+x.description+'</p>');
    })

    //////////////writing the carousel logic///////////////
    let currentImgIndex = 0;
    let highestIndex = $('.news-carousel-images').children().length - 1;
    console.log(highestIndex, currentImgIndex);
    $('.next').on('click', () => {
      ///first moving to the next element/////////
      //hiding the first image//////
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      //  moving the index to the next image and check for last image & loop
      (currentImgIndex < highestIndex) ? currentImgIndex += 1: currentImgIndex = 0;
      //bringing up the next image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
    });
    /////moving to the previous element/////////
    //hiding current element
    $('.previous').on('click', () => {
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      //moving the index to the previous image and check for first img & loop
      (currentImgIndex > 0) ? currentImgIndex -= 1: currentImgIndex = highestIndex;
      //bringing up the previous image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
    })


  }, (error) => {
    console.log(error);
  })
}
//******************************************************************//
//////////////////////////////Weather Ajax /////////////////////////
//******************************************************************//

const weatherAjaxCall = () => {
  $('.container').empty();
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

  });

}
//******************************************************************//
//////////////////////////ToDo List//////////////////////////////////
//******************************************************************//
const todoFunction = () => {
  let list = [];
let counter = 0;


  ///variable to store the todo list

  $('.container').empty();
  //adding a form to the body
  $('.container').append($('<div>').addClass('todoContent'));
  //adding the input to the form
  let appendingTodoString = '<form><input type="text" id="input-box"/>';
  //adding submit button to the form
  appendingTodoString += '<input type="submit" id="submit-btn"/>';
  //adding reset button to the form
  appendingTodoString += '<input type="reset" /> </form>';
  $('.todoContent').append($(appendingTodoString));
  $('.todoContent').append($('<ul>').attr('id', 'listitem'));

  const render = () => {
    console.log("inside render");
    ///counter value to check if its the first render of the page;

    let itemList = localStorage.getItem('listitem').split(',');
    console.log(itemList);
    if (counter === 0) {
      for (i = 0; i < itemList.length; i++) {
        $('#listitem').append('<li>' + itemList[i] + '</li>');
      }
    } else {
      $('#listitem').append('<li>' + itemList[itemList.length - 1] + '</li>');
    }


    //localStorage.getItem('listitem'));
    //'<li>' + list[list.length - 1] + '</li>');
    $('li').on('click', (event) => {
      $(event.currentTarget).css('text-decoration', 'line-through');
      $(event.target).append($('<button id="remove-btn">REMOVE</button>'));
      $('#remove-btn').on('click', (event1) => {
        $(event1.target).parent().remove();
      })
    });
  }
  ////if teh weather is cold we are adding msg to get the jacket
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?zip=94087&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3`
  }).then((data) => {
    ////converting to fahreinheit funtcion
    const convertToFahrenheit = (num) => {
        num = parseFloat((num - 273.15) * (9 / 5) + 32).toFixed(1);
        return num;
      }
      (convertToFahrenheit(data.main.temp_min) < 60.0) ? list.push('better pack ur jacket weather is cold today') : list.push('Pack ur hat');
    render();
    //console.log(data.main.temp);
  }, (error) => {
    console.log(error);
  })


  $('form').on('submit', (event) => {
    const inputValue = $('#input-box').val();
    list.push(inputValue);
    counter++;
    localStorage.setItem('listitem', list);
    event.preventDefault();
    $(event.currentTarget).trigger('reset');
    render();
  });


}

//******************************************************************//
///////////////////////////Games////////////////////////////////////////
//******************************************************************//

//https://www.emoji.co.uk/files/phantom-open-emojis/animals-nature-phantom/12490-jack-o-lantern.png
const gameFunction = () => {
  $('.container').empty();
  const removeChildren = () => {
    $('#leftid').children().remove();
    $('#rightid').children().remove();
  }
  /////////////////////initial set up field for the smileys
  $('.container').append($('<h2>').text("SMILEY GAME"));
  $('.container').append($('<p>').text("Please click on the extra smiley face on the left"));
  $('.container').append($('<div>').addClass('gameContainer'));
  $('.gameContainer').append($('<div>').addClass('leftsideGamediv').attr('id', 'leftid'));
  $('.gameContainer').append($('<div>').addClass('rightsideGamediv').attr('id', 'rightid'));
  ///increasing the number of faces by 5 for each success
  let noOfFaces = 5;
  ////generarte the faces//////////////
  const generateFaces = () => {
    for (let i = 0; i < noOfFaces; i++) {
      let randomTopAttribute = Math.floor(Math.random() * 50) + 60;
      let randomLeftAttribute = Math.floor((Math.random() * 43) + 2);
      $('#leftid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top', randomTopAttribute + "%").css('left', randomLeftAttribute + "%"));
      $('#rightid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top', randomTopAttribute + "%").css('left', (randomLeftAttribute + 50) + "%"));
    } //end of for loop
    $('#rightid').children().last().remove();
    $('#leftid').children().last().attr('id', 'difference');
    /////need to write logic for the click of teh right image

    $('#difference').on('click', (event) => {
      event.stopPropagation();
      console.log("won");
      removeChildren();
      noOfFaces += 5;
      generateFaces();
    });
  }

  //////////////////////////////////////////Fail case/////////////////////////

  $('.gameContainer').on('click', (event) => {
    let playAgain = confirm("Game Over! Restart Game?");
    if (playAgain === true) {
      removeChildren();
      numberOfFaces = 5;
      //console.log(numberOfFaces);
      generateFaces();
    } else {
      ('.gameContainer').prop('onclick', null).off('click');
      ('#difference').prop('onclick', null).off('click');
    }

  });
  generateFaces();
}

$(() => {
  //console.log("App.js successfully connected");
  //Calling weather api to check for its values
  //c4a833b10b9fb7fdc0ba57f9b6a5e4a3
  //api.openweathermap.org/data/2.5/weather?zip={zip code}
  //news key: c9b28a91c2114ad2bb5aed577298b412


  $('#news').on('click', newsAjaxCall)
  $('#weather').on('click', weatherAjaxCall)
  $('#games').on('click', gameFunction)
  $('#todo').on('click', todoFunction)

})
