
const loaderContainer = document.querySelector('.loader-container');

const displayLoading = () => {
    loaderContainer.style.display = 'block';
  };

const hideLoading = () => {
    loaderContainer.style.display = 'none';
  };

const getFindOutBtn = document.querySelector('.block-form__btn');

function httpGetAsync() {
  const hostCity = document.querySelector("#hcity").value;
  const hostCountry = document.querySelector("#hcountry").value;
  const hostDate = document.querySelector("#hdate").value;
  const hostTime = document.querySelector("#htime").value;

  const localCity = document.querySelector("#lcity").value;
  const localCountry = document.querySelector("#lcountry").value;
  var url = `https://timezone.abstractapi.com/v1/convert_time/?api_key=f0b51a94ee7e42b7ab5db8d1bade8045&base_location=${hostCity}, ${hostCountry}&base_datetime=${hostDate} ${hostTime}&target_location=${localCity}, ${localCountry}`

  const postResult = document.querySelector('#text-result');
  const textTemplate = document.querySelector('#result-template');
  var xmlHttp = new XMLHttpRequest();
  // xmlHttp.onreadystatechange = function() {
  //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
  //     callback(xmlHttp.responseText);
  // }
  xmlHttp.open("GET", url, true); // true for asynchronous

  xmlHttp.responseType = 'json';

  xmlHttp.onload = function() {
    if (xmlHttp.status >= 200 && xmlHttp.status < 300){
      hideLoading();
      document.getElementById("block-result").style.visibility = "visible";
      const userInput = xmlHttp.response;
      var resultText = `On ${userInput.base_location.datetime} in ${userInput.base_location.requested_location} it will be ${userInput.target_location.datetime} in ${userInput.target_location.requested_location}.`;
      const textEl = document.importNode(textTemplate.content, true);
      textEl.querySelector('p').textContent = resultText;
      //postResult.innerHTML = textEl.html;
      postResult.replaceChildren(textEl);
    }
    else {
      alert('400 Bad request!!!!');
    }
  };

  xmlHttp.onerror = function() {
    reject (new Error('Failed to send request!!!'))
  };
  
  xmlHttp.send(null);
}


getFindOutBtn.addEventListener('click', () => {
  document.querySelector('.block-form__submit').style.visibility = 'hidden';
  displayLoading();
  httpGetAsync();
  document.getElementById("form").reset();
});


function resetBtn () {
  document.querySelector('.block-form__submit').style.visibility = 'visible';
  // document.getElementById("form").reset();

  // document.getElementById("localForm").reset();
  // document.getElementById("result-template").innerHTML = "";
  document.querySelector("#text-result").innerHTML = "";
  // document.getElementById("text-result").value = '';
  // document.getElementById('text-result').remove();
  document.getElementById("block-result").style.visibility = "hidden";
}