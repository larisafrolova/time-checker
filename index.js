
function getInputValue() {

    const hostCity = document.getElementById("hcity").value;
const hostCountry = document.getElementById("hcountry").value;
const hostDate = document.getElementById("hdate").value;
const hostTime = document.getElementById("htime").value;

const locatCity = document.getElementById("lcity").value;
const locatCountry = document.getElementById("lcountry").value;

    document.getElementById("block-result").style.visibility = "visible";

    var url = "https://timezone.abstractapi.com/v1/current_time/?api_key=f0b51a94ee7e42b7ab5db8d1bade8045&location=Oxford, United Kingdom"
    
    httpGetAsync(url);
  }


  function resetBtn () {
    document.getElementById("hostForm").reset();
    document.getElementById("localForm").reset();
    document.getElementById("block-result").style.visibility = "hidden";
  }

  function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}


