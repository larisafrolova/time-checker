require('datejs');

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


formBtn.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.block-form__submit').style.visibility = 'hidden';
  displayLoading();
  fetchResultData();
});



const displayError = (message) => {
  const errorResult = document.querySelector('#error-result');
  const errorTemplate = document.querySelector('#error-template');
  document.querySelector(".block-result").style.visibility = "visible";
  document.querySelector('#text-result').style.display = 'none';
  document.querySelector('#error-result').style.display = 'block';
  const errorEl = document.importNode(errorTemplate.content, true);
  errorEl.querySelector('p:first-of-type').textContent = message;
  errorResult.replaceChildren(errorEl);
};

function convertDate (input) {
  const newDateTimeArray = [];
  const transformedTimeDate = input.split(' ');
  console.log("transformedTimeDate is "+transformedTimeDate);
  const newDate = Date.parse(transformedTimeDate[0]);
  // const newDate = Date.parse(transformedTimeDate[0]);
  console.log("newDate is "+newDate);
  newDateTimeArray.push(newDate);
  const newTime = transformedTimeDate[1];
  newDateTimeArray.push(newTime);
  return newDateTimeArray;
}



async function fetchResultData (){
  const hostCity = document.querySelector("#hcity").value;
  const hostCountry = document.querySelector("#hcountry").value;
  const hostDate = document.querySelector("#hdate").value;
  const hostTime = document.querySelector("#htime").value;

  const localCity = document.querySelector("#lcity").value;
  const localCountry = document.querySelector("#lcountry").value;
  var url = `https://timezone.abstractapi.com/v1/convert_time/?api_key=f0b51a94ee7e42b7ab5db8d1bade8045&base_location=${hostCity}, ${hostCountry}&base_datetime=${hostDate} ${hostTime}&target_location=${localCity}, ${localCountry}`

  const responseData = await getHttpRequest("GET", url);

  const postResult = document.querySelector('#text-result');
  const textTemplate = document.querySelector('#result-template');
  hideLoading();
  document.querySelector(".block-result").style.visibility = "visible";
  document.querySelector('#text-result').style.display = 'block';
  const userInput = responseData;
  const baseDateTime = convertDate (userInput.base_location.datetime);
  const targetDateTime = convertDate(userInput.target_location.datetime);
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


function getHttpRequest (method, url) {
  const promise = new Promise((resolve, reject) => {
    var xmlHttp = new XMLHttpRequest();
  xmlHttp.open(method, url, true); // true for asynchronous

  xmlHttp.responseType = 'json';

  xmlHttp.onload = function() {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300){
      resolve (xmlHttp.response);
    }
    else {
      reject (new Error ('Something went wrong!!!'));
      hideLoading();
      var errorMsg = JSON.stringify(xmlHttp.response.error.message);
      displayError(errorMsg.slice(1,(errorMsg.length - 1)));
    }
  };

  xmlHttp.onerror = function() {
    reject (new Error('Failed to send request!!!'))
  };
  
  xmlHttp.send(null);
  });
  return promise;
}



function resetBtn () {
  document.querySelector('.block-form__submit').style.visibility = 'visible';
  document.getElementById("form").reset();

  if (document.querySelector("#text-result").innerHTML === ""){
    console.log("i am in the table innerHTML");
    document.querySelector('#error-result').innerHTML = "";
  }
  else {
    console.log("i am in the error inner html");
    document.querySelector("#text-result").innerHTML = "";
  }
  document.querySelector(".block-result").style.visibility = "hidden";
}