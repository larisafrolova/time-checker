const loaderContainer = document.querySelector('.loader-container');

const displayLoading = () => {
    loaderContainer.style.display = 'block';
  };

const hideLoading = () => {
    loaderContainer.style.display = 'none';
  };

const getFindOutBtn = document.querySelector('.block-form__btn');

const formBtn = document.querySelector('form');

const resetButton = document.querySelector('.block-result__btn');

// const error  = document.querySelector("#error-result");


const displayError = (message) => {
  const errorResult = document.querySelector('#error-result');
  const errorTemplate = document.querySelector('#error-template');
  document.querySelector(".block-result").style.visibility = "visible";
  document.querySelector('#text-result').style.display = 'none';
  document.querySelector('#error-result').style.display = 'block';
  // errorResult.style.display = 'block';
  // resetButton.style.display = 'block';
  const errorEl = document.importNode(errorTemplate.content, true);
  errorEl.querySelector('p').textContent = message;
  errorResult.replaceChildren(errorEl);
};


function httpGetAsync() {
  // console.log("I am in the httpGetFiunction");
  const hostCity = document.querySelector("#hcity").value;
  const hostCountry = document.querySelector("#hcountry").value;
  const hostDate = document.querySelector("#hdate").value;
  const hostTime = document.querySelector("#htime").value;

  const localCity = document.querySelector("#lcity").value;
  const localCountry = document.querySelector("#lcountry").value;
  var url = `https://timezone.abstractapi.com/v1/convert_time/?api_key=f0b51a94ee7e42b7ab5db8d1bade8045&base_location=${hostCity}, ${hostCountry}&base_datetime=${hostDate} ${hostTime}&target_location=${localCity}, ${localCountry}`

  const postResult = document.querySelector('#text-result');
  const textTemplate = document.querySelector('#result-template');
  const promise = new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
  // xmlHttp.onreadystatechange = function() {
  //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
  //     callback(xmlHttp.responseText);
  // }
  xmlHttp.open("GET", url, true); // true for asynchronous

  xmlHttp.responseType = 'json';

  xmlHttp.onload = function() {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300){
      resolve (xmlHttp.response);
      // console.log("xmlHttp.response is "+JSON.stringify(xmlHttp.response));
      hideLoading();
      document.querySelector(".block-result").style.visibility = "visible";
      document.querySelector('#text-result').style.display = 'block';
      const userInput = xmlHttp.response;
      // console.log("user input is "+userInput);
      // console.log("userInput.base_location.datetime is "+userInput.base_location.datetime);
      // console.log(typeof userInput.base_location.datetime);
      // var resultText = `On ${userInput.base_location.datetime} in ${userInput.base_location.requested_location} it will be ${userInput.target_location.datetime} in ${userInput.target_location.requested_location}.`;
      const baseDateTime = convertDate (userInput.base_location.datetime);
      const targetDateTime = convertDate(userInput.target_location.datetime);
      // var testText = `When the time was ${baseDateTime[1]} on ${baseDateTime[0]} in ${userInput.base_location.requested_location}, it was ${targetDateTime[1]} ${targetDateTime[0]} in ${userInput.target_location.requested_location}.`;

      const textEl = document.importNode(textTemplate.content, true);

      textEl.querySelector('#hostPlace').textContent = userInput.base_location.requested_location;
      textEl.querySelector('#localPlace').textContent = userInput.target_location.requested_location;
      textEl.querySelector('#hostTime').textContent = 
      baseDateTime[1];
      textEl.querySelector('#localTime').textContent = 
      targetDateTime[1];
      textEl.querySelector('#hostDate').textContent = 
      baseDateTime[0];
      textEl.querySelector('#localDate').textContent = 
      targetDateTime[0];
      postResult.replaceChildren(textEl);
    }
    else {
      reject (new Error ('Something went wrong!!!'));
      // console.log("error is "+JSON.stringify(xmlHttp.response.error.message));
      hideLoading();
      displayError(JSON.stringify(xmlHttp.response.error.message));
    }
  };

  xmlHttp.onerror = function() {
    reject (new Error('Failed to send request!!!'))
  };
  
  xmlHttp.send(null);
  });
  return promise;
}

// function splitTimeAndDate (input) {
//   const transformedTimeDate = input.split(' ');
//   return transformedTimeDate;
// }

function convertDate (input) {
  const newDateTimeArray = [];
  const transformedTimeDate = input.split(' ');
  const newDate = Date.parse(transformedTimeDate[0]).toString("MMMM dS, yyyy");
  newDateTimeArray.push(newDate);
  const newTime = transformedTimeDate[1];
  newDateTimeArray.push(newTime);
  // console.log("Date after converting is "+newDate);
  // console.log("Date parse is "+Date.parse(transformedTimeDate[0]).toString("MMMM dS, yyyy"));
  return newDateTimeArray;
}

formBtn.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.block-form__submit').style.visibility = 'hidden';
  displayLoading();
  httpGetAsync();
});


// getFindOutBtn.addEventListener('click', () => {
//   document.querySelector('.block-form__submit').style.visibility = 'hidden';
//   displayLoading();
//   httpGetAsync();
//   // document.getElementById("form").reset();
// });


function resetBtn () {
  console.log("I am in the reset Btn");
  document.querySelector('.block-form__submit').style.visibility = 'visible';
  document.getElementById("form").reset();

  // document.getElementById("localForm").reset();
  // document.getElementById("result-template").innerHTML = "";
  // document.querySelector("#text-result").innerHTML = "";
  if (document.querySelector("result-template").innerHTML === ""){
    console.log("i am in the table innerHTML");
    document.querySelector('#error-result').innerHTML = "";
  }
  else {
    console.log("i am in the error inner html");
    document.querySelector("result-template").innerHTML = "";
  }
  // document.querySelector("table").innerHTML = "";
  // document.querySelector('#error-template').innerHTML = "";
  // document.getElementById("text-result").value = '';
  // document.getElementById('text-result').remove();
  document.querySelector(".block-result").style.visibility = "hidden";
}