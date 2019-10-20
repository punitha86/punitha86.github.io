//******************************************************************//
///////////////////////////HomePage////////////////////////////////////////
//******************************************************************//

const homepageFunction = () => {

  $('.container').empty();
  $('.container').append($('<p>').text('Everyone has a ritual that helps set the tone for the day ahead. Knowing exactly how the first few minutes of your day will look is a tool we can implement that will leave us feeling empowered as we face the rest of our day. It’s important to cultivate this sacred time for yourself and begin each day with intention.'));
    $('.container').append($('<p>').text('Designing a morning that aligns with what feels right for you is imperative, so be sure to create a space that resonates with you rather than simply following a routine that works for someone else. Remember, what works for one person may not work for you, and that’s okay. Some people have extremely detailed mornings and others simply take five minutes to express gratitude for the life they have been given. Whatever you choose is perfect for you and will create a snowball effect of intention and self-honoring choices the rest of your day.'));
  $('.container').append($('<p>').text('Looking to begin a morning ritual but still need a little inspiration? Here are some examples of morning rituals to help you get started.'));
  $('.container').append($('<p>').text('Barack Obama, President Taking care of physical fitness and family are two important elements of President Obama\’s daily ritual. He starts his day with a workout at 6:45 a.m., reads several newspapers, has breakfast with his family, and then starts his work day just before 9:00 a.m. in the morning. He may work as late as 10:00 p.m. some evenings, but always stops to have dinner with his family each day.'));
  $('.container').append($('<p>').text('Benjamin Franklin, a founding father of the United States. Franklin\’s much-lauded to-do list included some specific rules for how he started each morning. His three-hour block of morning routine stretched from 5:00 a.m. to 7:00 a.m. and included addressing “Powerful Goodness” and setting a plan for the rest of his day.Every morning Franklin asked himself, “What good shall I do today?”'));
}



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
  $('.container').append($('<div>').addClass('weatherContainer'))

  ///trying to validate the input from user
  $('.weatherContainer').append($('<input id="zip" name="zip" type="text" inputmode="numeric" pattern="[0-9]{5}" placeholder="Enter zipcode Please">'));


  $('.weatherContainer').append($('<button type="button">SUBMIT</button>'))
  event.preventDefault();
  $('.container').append($('<div>').addClass('weathercontent'));
  $('button').on('click', () => {

    let userInput = $('input[type="text"]').val();
    (userInput != "") ? userInput = $('input[type="text"]').val(): userInput = '94087';
    localStorage.setItem('zip', userInput);
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
  ///counter value to check if its the first render of the page;
  let counter = 0;
  /////local storage retrieval
  $('#list-items').html(localStorage.getItem('listItems'));

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
  $('.todoContent').append($('<ul>').attr('id', 'list-items'));

  const render = (value) => {
    $('#list-items').append($('<li>').text(value));
  }

  ////if teh weather is cold we are adding msg to get the jacket
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?zip=${localStorage.zip}&appid=c4a833b10b9fb7fdc0ba57f9b6a5e4a3`
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
    event.preventDefault();
    const inputValue = $('#input-box').val();
    if (inputValue) {
      $('#list-items').append($('<li>').text(inputValue));
      localStorage.setItem('listItems', $('#list-items').html());
      $(event.currentTarget).trigger('reset');

      $('li').on('click', (event) => {
        console.log(event.target);
        //console.log(event.currentTarget);
        $(event.target).css('text-decoration', 'line-through');
        //event.stopPropagation();
        $(event.target).append($('<button>').text("REMOVE").addClass("remove-btn").css('text-decoration', 'none'));

        $('.remove-btn').on('click', (event1) => {
          $(event1.target).parent().remove();
          localStorage.setItem('listItems', $('#list-items').html());
        });
      });

    }


  });


}
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
      let randomTopAttribute = Math.floor(Math.random() * 100) + 40;
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
      ('.gameContainer').prop('onclick', null);
      ('#difference').prop('onclick', null);
    }

  });
  generateFaces();
}

$(() => {
  let $navbar= $('#myTopnav');
  let sticky =$navbar.offset().top;
$(window).scroll(() => {
  if ($(window).scrollTop() >= sticky) {
    console.log("inside window");
    $navbar.addClass("sticky")
  } else {
    $navbar.removeClass("sticky");
  }
})
homepageFunction();
  $('#news').on('click', newsAjaxCall)
  $('#weather').on('click', weatherAjaxCall)
  $('#games').on('click', gameFunction)
  $('#todo').on('click', todoFunction)
  $('#home').on('click', homepageFunction)

})

//////////welcome to the graveyard


//console.log("App.js successfully connected");
//Calling weather api to check for its values
//c4a833b10b9fb7fdc0ba57f9b6a5e4a3
//api.openweathermap.org/data/2.5/weather?zip={zip code}
//news key: c9b28a91c2114ad2bb5aed577298b412
