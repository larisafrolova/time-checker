
function getInputValue() {

    const hostCity = document.getElementById("hcity").value;
const hostCountry = document.getElementById("hcountry").value;
const hostDate = document.getElementById("hdate").value;
const hostTime = document.getElementById("htime").value;

const localCity = document.getElementById("lcity").value;
const localCountry = document.getElementById("lcountry").value;

    document.getElementById("block-result").style.visibility = "visible";

    var url = `https://timezone.abstractapi.com/v1/convert_time/?api_key=f0b51a94ee7e42b7ab5db8d1bade8045&&base_location=${hostCity}, ${hostCountry}&base_datetime=2022-12-08 07:00:00&target_location=${localCity}, ${localCountry}`
    
    httpGetAsync(url);
  }


  function resetBtn () {
    document.getElementById("hostForm").reset();
    document.getElementById("localForm").reset();
    document.getElementById("result-template").innerHTML = "";
    // document.getElementById('text-result').remove();
    document.getElementById("block-result").style.visibility = "hidden";
  }

  function httpGetAsync(url) {
    const postResult = document.getElementById('text-result');
    const textTemplate = document.getElementById('result-template');
    var xmlHttp = new XMLHttpRequest();
    // xmlHttp.onreadystatechange = function() {
    //     if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
    //     callback(xmlHttp.responseText);
    // }
    xmlHttp.open("GET", url, true); // true for asynchronous

    xmlHttp.responseType = 'json';

    xmlHttp.onload = function() {
      if (xmlHttp.status >= 200 && xmlHttp.status < 300){
        const userInput = xmlHttp.response;
        console.log("user input is "+userInput);
        var resultText = `On ${userInput.base_location.datetime} in ${userInput.base_location.requested_location} it will be ${userInput.target_location.datetime} in ${userInput.target_location.requested_location}.`;
        const textEl = document.importNode(textTemplate.content, true);
        textEl.querySelector('p').textContent = resultText;
        //postResult.innerHTML = textEl.html;
        postResult.replaceChildren(textEl);
        //console.log('text after .TEXT');
      }
      else {
        alert('something is wrong!!!!');
      }
    };

    xmlHttp.onerror = function() {
      reject (new Error('Failed to send request!!!'))
    };
    
    xmlHttp.send(null);
}


