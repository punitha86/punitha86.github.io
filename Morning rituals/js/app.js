//////////array of images for random quotes for each load/////////////
const imgURLArray = ['https://www.spiritbutton.com/wp-content/uploads/2018/03/52-1.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/03/8.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/41.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/45.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/42a.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/46.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/26.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/39.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/54-e1519797270413.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/37.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/36-e1519797518910.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/38-e1519797741104.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/33.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/43-e1519798004175.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/3-1-e1519701451376.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/1-1.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/2-e1519701820341.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/4-1-e1519702191944.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/4-1-e1519702191944.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/9.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/17-e1519728325574.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/53.jpg',
  'https://www.spiritbutton.com/wp-content/uploads/2018/02/50.jpg'
]

//******************************************************************//
//////////////////////////////News Ajax /////////////////////////
//******************************************************************//

const newsAjaxCall = () => {
  //creating container for teh news articles
  // <div class="container">
  $('header').remove();
  $('body').prepend($('<header>'));
  $('header').append($('<img src="image/morning-rituals-cover-1-1024x317.jpg" alt="morning rituals">'));
  $('.container').empty();

  // $('header').append($('<img src="image/morning-rituals-cover-1-1024x317.jpg" alt="morning rituals">'));
  $('.container').append($('<h1>').text('NEWS'));
  $('.container').append($('<div>').addClass('content'));
  $('.content').append($('<div>').addClass('news-carousel-button previous'));
   $('.news-carousel-button previous').append($('<span></span>'))
  $('.content').append($('<div>').addClass('news-carousel-images'));
  $('.content').append($('<div>').addClass('news-carousel-button next'));
  $('.news-carousel-button next').append($('<span></span>'))


  $.ajax({
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=c9b28a91c2114ad2bb5aed577298b412"
  }).then((data) => {
    for (x of data.articles) {
      let appendingString = `<div class="newsDiv">`;
      ///when api is not giving any image with the news
      if(x.urlToImage!=null){
      appendingString += `<img src=${x.urlToImage} class='newsimg' style="width:100%;height=100%">`;
    }else{
      `<img class='newsimg'>`
    }
      appendingString += `<p class='newsPara'> ${x.title}</p>`;
      appendingString += `<article class='description'> ${x.description} </article> News Link to the site:<br><a href="${x.url}" target="_blank">${x.url}</a></div>`;

      $('.news-carousel-images').append(appendingString);
      $('.description').hide();
    } //end of for loop
    //on click of the images we need to give out its conetent
    $('.newsDiv').on('click', () => {
      clearInterval(interval);
      //console.log($(event.currentTarget).children().eq(2));
      $(event.currentTarget).children().eq(2).css('display', 'block');
      //$('.content').append('<p>'+x.description+'</p>');
    })
    $('.container').append($('<footer>').text('Powered by https://newsapi.org/').addClass('newsFooter'));

    //////////////writing the carousel logic///////////////
    let currentImgIndex = 0;
    let highestIndex = $('.news-carousel-images').children().length - 1;
    //console.log(highestIndex, currentImgIndex);
    const clickNextNews = () => {
      ///first moving to the next element/////////
      //hiding the first image//////
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      //  moving the index to the next image and check for last image & loop
      (currentImgIndex < highestIndex) ? currentImgIndex += 1: currentImgIndex = 0;
      //bringing up the next image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
    }
    $('.next').on('click', clickNextNews);
    /////moving to the previous element/////////
    //hiding current element
    $('.previous').on('click', () => {
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'none');
      //moving the index to the previous image and check for first img & loop
      (currentImgIndex > 0) ? currentImgIndex -= 1: currentImgIndex = highestIndex;
      //bringing up the previous image and description//
      $('.news-carousel-images').children().eq(currentImgIndex).css('display', 'block');
    })
    let interval = setInterval(clickNextNews, 5000);

  }, (error) => {
    console.log(error);
  })
}
//******************************************************************//
//////////////////////////////Weather Ajax /////////////////////////
//******************************************************************//

const weatherAjaxCall = () => {
  $('header').remove();
  $('body').prepend($('<header>'));
  $('header').append($('<img src="image/morning-rituals-cover-1-1024x317.jpg" alt="morning rituals">'));
  $('.container').empty();


  ///trying to validate the input from user
  $('.container').append($('<input id="zip" name="zip" type="text" inputmode="numeric" pattern="[0-9]{5}" id="weatherinput" class="weatherinputs" placeholder="Enter zipcode Please">'));


  $('.container').append($('<button type="button" class="weatherinputs">SUBMIT</button>'))
  event.preventDefault();
  $('.container').append($('<div>').addClass('weatherContainer'));
  $('.weatherContainer').append($('<div>').addClass('weathericon'));
  $('.weatherContainer').append($('<div>').addClass('weathercontent'));

  $('button').on('click', () => {

    let userInput = $('input[type="text"]').val();
    (userInput != "") ? userInput = $('input[type="text"]').val(): userInput = '94087';
    localStorage.setItem('zip', userInput);
    weatherAjaxFunction();
  });
  const weatherAjaxFunction = () => {
    $.ajax({
      url: `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?zip=${localStorage.getItem('zip')}&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3`
    }).then((data) => {
      ////converting to fahreinheit funtcion
      const convertToFahrenheit = (num) => {
        num = parseFloat((num - 273.15) * (9 / 5) + 32).toFixed(1);
        return num;
      }
      $('.weathercontent').empty();
      $('.weathericon').empty();
      $('.weathercontent').append($('<p>').text("City : " + (data.name)));
      $('.weathercontent').append($('<p>').text("Temperature : " + convertToFahrenheit(data.main.temp) + "F"));
      $('.weathercontent').append($('<p>').text("Humidity : " + data.main.humidity));
      $('.weathercontent').append($('<p>').text("Min-Temp : " + convertToFahrenheit(data.main.temp_min) + "F"));
      $('.weathercontent').append($('<p>').text("Max-Temp : " + convertToFahrenheit(data.main.temp_max) + "F"));
      // console.log(data.weather[0].main);
      // $('.weathercontent').append($('<p>').text("Weather : " + data.weather[0].icon));
      $('.weathericon').append($(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`))
      $('.weathericon').append($('<p>').text(data.weather[0].description));
      //console.log(data.main.temp);
    }, (error) => {
      console.log(error);
    })
  }
$('.container').append($('<footer>').text('Powered by https://openweathermap.org/api').addClass('weatherFooter'));

  weatherAjaxFunction();

}
//******************************************************************//
//////////////////////////ToDo List//////////////////////////////////
//******************************************************************//
const todoFunction = () => {
  let list = [];
  ///counter value to check if its the first render of the page;
  let counter = 0;
  /////local storage retrieval
  $('#list-items').html(localStorage.getItem('listItems'));
  $('header').remove();
  $('body').prepend($('<header>'));
  $('header').append($('<img src="image/morning-rituals-cover-1-1024x317.jpg" alt="morning rituals">'));

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
  $('.todoContent').append($('<div>').addClass('todoListContent'));
  $('.todoListContent').append($('<ul>').attr('id', 'list-items'));
  //
  const render = (value) => {
    $('#list-items').append($('<li>').text(value));
  }

  ////if teh weather is cold we are adding msg to get the jacket
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=${localStorage.zip}&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3`
  }).then((data) => {
    ////converting to fahreinheit funtcion
    const convertToFahrenheit = (num) => {
      num = parseFloat((num - 273.15) * (9 / 5) + 32).toFixed(1);
      return num;
    }
    ///If temperature is less than 60F add item to do list
    if (convertToFahrenheit(data.main.temp_min) < 60.0) {
      //$('#list-items').push('Better pack ur jacket weather is cold today');
      render('Better pack ur jacket weather is cold today');
    }

    //console.log(data.main.temp);
  }, (error) => {
    console.log(error);
  })


  $('form').on('submit', (event) => {
    const inputValue = $('#input-box').val();
    if (inputValue) {
      $('#list-items').append("<li><span class='list'>" + inputValue + "</span></li>");
      // $('#list-items').append($('<li>').text(inputValue));
      localStorage.setItem('listItems', $('#list-items').html());
      $(event.currentTarget).trigger('reset');
    }
    event.preventDefault();

    $('li').on('click', (event) => {
      //console.log(localStorage);
      //console.log(event.currentTarget);
      $(event.target).css('text-decoration', 'line-through');
      //event.stopPropagation();
      $(event.target).append($('<button>').text("REMOVE").addClass("remove-btn").css('text-decoration', 'none'));

      $('.remove-btn').on('click', (event1) => {
        //console.log($(event1.target).parent());
        $(event1.target).parent().remove();
        localStorage.setItem('listItems', $('#list-items').html());
      });
    });

  })


}


//******************************************************************//
///////////////////////////Games////////////////////////////////////////
//******************************************************************//

//https://www.emoji.co.uk/files/phantom-open-emojis/animals-nature-phantom/12490-jack-o-lantern.png
const gameFunction = () => {
  $('.container').empty();
  $('header').remove();
  const removeChildren = () => {
    $('#leftid').children().remove();
    $('#rightid').children().remove();
  }
  /////////////////////initial set up field for the smileys
  // $('.container').append($('<h2>').text("SMILEY GAME").addClass('gameElem'));
  // $('.container').append($('<p>').text("Please click on the extra smiley face on the left").addClass('gameElem'));
  $('.container').append($('<div>').addClass('gameContainer'));
  $('.gameContainer').append($('<div>').addClass('leftsideGamediv').attr('id', 'leftid'));
  $('.gameContainer').append($('<div>').addClass('rightsideGamediv').attr('id', 'rightid'));
  ///increasing the number of faces by 5 for each success
  let noOfFaces = 5;
  ////generarte the faces//////////////
  const generateFaces = () => {
    for (let i = 0; i < noOfFaces; i++) {
      let randomTopAttribute = Math.floor(Math.random() * 60) + 25;
      let randomLeftAttribute = Math.floor((Math.random() * 43) + 2);
      $('#leftid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top', randomTopAttribute + "vh").css('left', randomLeftAttribute + "vw"));
      $('#rightid').append($('<img>').attr('src', 'image/smiley.png').addClass('smileyimg').css('top', randomTopAttribute + "vh").css('left', (randomLeftAttribute + 50) + "vw"));
    } //end of for loop
    $('#rightid').children().last().remove();
    $('#leftid').children().last().attr('id', 'difference');
    /////need to write logic for the click of teh right image

    $('#difference').on('click', (event) => {
      event.stopPropagation();
      //console.log("won");
      removeChildren();
      noOfFaces += 5;
      generateFaces();
    });
  }

  //////////////////////////////////Game Fail case/////////////////////////

  $('.gameContainer').on('click', (event) => {
    let playAgain = confirm("Game Over! Restart Game?");
    if (playAgain === true) {
      removeChildren();
      numberOfFaces = 5;
      //console.log(numberOfFaces);
      generateFaces();
    } else {
      ('.gameContainer').off('click');
      ('#difference').off('click');
    }

  });
  generateFaces();
}
///////////////////////////////////////
/////////tic-tac-toe///////////
////////////////////////////////////////////
const ticTacToeFunction = () => {
  $('header').remove();
  $('body').prepend($('<header>'));
  $('header').append($('<img src="image/morning-rituals-cover-1-1024x317.jpg" alt="morning rituals">'));
  $('.container').empty();
  $('.container').append($('<div>').addClass('ticTacToeContainer'));
  $('.ticTacToeContainer').append($('<div>').addClass('board'));
  let mark = 'X';
  let numberOfClicks = 0;
  const markingSqr = (event) => {
    // console.log($(event.target));
    if (numberOfClicks < 9) {
      if ($(event.target).text() === '') {
        $(event.target).text(mark).addClass(mark);
        (mark === 'X') ? mark = 'O': mark = 'X';
      } else {
        //console.log(mark, $(event.target).text());
        alert("there is a value")
      }
      horizontalCheck();
      verticalCheck();
      diagonalCheck();
      //to ensure there are only 9 clicks per game
      numberOfClicks++;
    } else {
      alert("tie");
      clearAll();
    }
  }

  const clearAll = () => {
    $('.innerSqr').text('')
      .removeClass('X')
      .removeClass('O')
    numberOfClicks = 0;
  }
  for (i = 1; i <= 9; i++) {
    $div = $('<div>').addClass('innerSqr').attr('id', 'id' + i);
    $('.board').append($div);

  }
  $('.board').on('click', markingSqr);
  const $id1 = $('#id1');
  const $id2 = $('#id2');
  const $id3 = $('#id3');
  const $id4 = $('#id4');
  const $id5 = $('#id5');
  const $id6 = $('#id6');
  const $id7 = $('#id7');
  const $id8 = $('#id8');
  const $id9 = $('#id9');

  const horizontalCheck = () => {
    if (($id1.hasClass('X') && $id2.hasClass('X') && $id3.hasClass('X')) ||
      ($id4.hasClass('X') && $id5.hasClass('X') && $id6.hasClass('X')) ||
      ($id7.hasClass('X') && $id8.hasClass('X') && $id9.hasClass('X'))) {
      alert("X wins");
      clearAll();
    } else if (($id1.hasClass('O') && $id2.hasClass('O') && $id3.hasClass('O')) ||
      ($id4.hasClass('O') && $id5.hasClass('O') && $id6.hasClass('O')) ||
      ($id7.hasClass('O') && $id8.hasClass('O') && $id9.hasClass('O'))) {
      alert("O wins");
      clearAll();
    }
  }

  const verticalCheck = () => {
    if (($id1.hasClass('X') && $id4.hasClass('X') && $id7.hasClass('X')) ||
      ($id2.hasClass('X') && $id5.hasClass('X') && $id8.hasClass('X')) ||
      ($id3.hasClass('X') && $id6.hasClass('X') && $id9.hasClass('X'))) {
      alert("X wins");
      clearAll();
    } else if (($id1.hasClass('O') && $id4.hasClass('O') && $id7.hasClass('O')) ||
      ($id2.hasClass('O') && $id5.hasClass('O') && $id8.hasClass('O')) ||
      ($id3.hasClass('O') && $id6.hasClass('O') && $id9.hasClass('O'))) {
      alert("O wins");
      clearAll();
    }
  }

  const diagonalCheck = () => {
    if (($id1.hasClass('X') && $id5.hasClass('X') && $id9.hasClass('X')) ||
      ($id3.hasClass('X') && $id5.hasClass('X') && $id7.hasClass('X'))) {
      alert("X wins");
      clearAll();
    } else if (($id1.hasClass('O') && $id5.hasClass('O') && $id9.hasClass('O')) ||
      ($id3.hasClass('O') && $id5.hasClass('O') && $id7.hasClass('O'))) {
      alert("O wins");
      clearAll();
    }

  }



}



///onload function
$(() => {

  //sticky navbar
  let $navbar = $('#myTopnav');
  let sticky = $navbar.offset().top;
  $(window).scroll(() => {
    if ($(window).scrollTop() >= sticky) {
      //console.log("inside window");
      $navbar.addClass("sticky")
    } else {
      $navbar.removeClass("sticky");
    }
  })

  ///simply using function for top dropdown naigation
  const loadDropDown = () => {
    let $myTopNav= $("#myTopnav");
    if($myTopNav.hasClass('topnav')){
      $myTopNav.addClass('responsive');
    }
  }



  const selectRandomNum = () => {
    return Math.floor(Math.random() * 21) + 1;
  }
  let $wrapdiv = $('<div>');
  $('.randomImg').append($wrapdiv.attr('id', 'wrapdiv').addClass("wrapper"));


  for (i = 0; i <= 2; i++) {
    const $div1 = $('<div>').addClass('selectedImg');
    //console.log(imgURLArray[selectRandomNum()]);
    $div1.css('background-image', 'url(\'' + imgURLArray[selectRandomNum()] + '\')');
    $('#wrapdiv').append($div1);
  }

  $('.dropbtn').on('click', loadDropDown)

  $('#news').on('click', newsAjaxCall)
  $('#weather').on('click', weatherAjaxCall)
  $('#games').on('click', gameFunction)
  $('#todo').on('click', todoFunction)
  $('#tictactoe').on('click', ticTacToeFunction)

});

//////////welcome to the graveyard


//console.log("App.js successfully connected");
//Calling weather api to check for its values
//c4a833b10b9fb7fdc0ba57f9b6a5e4a3
//api.openweathermap.org/data/2.5/weather?zip={zip code}
//news key: c9b28a91c2114ad2bb5aed577298b412
//
///////////////code graveyard for todo listItems
// //updating the list from local storage
// let itemList = localStorage.getItem('listitem').split(',');
// //console.log(itemList);
// ///checking if its the first load of teh page then update the weather value and older values
// if (counter === 0) {
//   console.log(itemList);
//   for (i = 1; i < itemList.length; i++) {
//     $('#listitem').append(`<li id=${i}>`+ itemList[i] + '</li>');
//   }
//     itemList=[];
//     itemList.push(list[0]);
//     $('#listitem').append('<li id=0>' + itemList[0] + '</li>');
// } else {
//   let temp=itemList.length-1;
//   console.log(temp);
//   $('#listitem').append(`<li id=${temp} >` + itemList[itemList.length - 1] + '</li>');



//localStorage.getItem('listitem'));
//'<li>' + list[list.length - 1] + '</li>');

//list.push(inputValue);
//counter++;
//localStorage.setItem('listitem', list);

//let idOfClicked=$(event1.target).parent().attr('id');
//console.log($(event1.target).parent().attr('id'));
// function filterData() {
//     var data = JSON.parse(localStorage.listitem);
//     //console.log(data);
//     var newData = data.filter(function(val){
//         return (val.length !== idOfClicked && val.YourPropertyName !== listitem);
//     });
//     localStorage.listitem = JSON.stringify(newData);
// }
// filterData();
//localStorage.listitem.removeItem($(event1.target).parent().attr('id'));
//console.log(localStorage);
