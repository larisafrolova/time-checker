
function getInputValue() {

    const hostCity = document.getElementById("hcity").value;
const hostCountry = document.getElementById("hcountry").value;
const hostDate = document.getElementById("hdate").value;
const hostTime = document.getElementById("htime").value;

const localCity = document.getElementById("lcity").value;
const localCountry = document.getElementById("lcountry").value;

// validate(hostCity, hostCountry, hostDate, hostTime);
validateCity (hostCity);

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
        alert('400 Bad request!!!!');
      }
    };

    xmlHttp.onerror = function() {
      reject (new Error('Failed to send request!!!'))
    };
    
    xmlHttp.send(null);
}

// function validate() {
//   var formsCollection = document.forms;
//   const validText = document.getElementsByClassName("validation-text");
//   for(var i=0;i<formsCollection.length;i++) {
//     console.log('validText is '+validText);
//     console.log('I am in the for loop');
//     let city = formsCollection[i]["city"].value;
//     console.log('city is '+city);
//     if(city === "") {
//       console.log('i am in in the 1 if statement for loop');
//       validText.style['visibility'] = 'visible';
//       // formsCollection[i]["validation-text"].style.visibility = "visible";
//     // alert( "Please provide your city!" );
//     formsCollection[i]["city"].focus();
//     // validText.style.visibility = 'hidden';
//     return false;
//     }
//     validText.style['visibility'] = 'hidden';
//  let country = formsCollection[i]["country"].value;
//  console.log('country is '+country);
//  if( country === "") {
//   console.log('i am in in the 2 if statement for loop');
//     alert( "Please provide your country!");
//     formsCollection[i]["country"].focus();
//     return false;
//  }
//   }
  
// //  if( document.myForm.Zip.value == "" || isNaN( document.myForm.Zip.value ) ||
// //     document.myForm.Zip.value.length != 5 ) {
    
// //     alert( "Please provide a zip in the format #####." );
// //     document.myForm.Zip.focus() ;
// //     return false;
// //  }
// //  if( document.myForm.Country.value == "-1" ) {
// //     alert( "Please provide your country!" );
// //     return false;
// //  }
//  return( true );
// }


function validateCity (city) {
  //var formsCollection = document.forms;
  //let validText = document.getElementsByClassName("validation-text");
 // for(var i=0;i<formsCollection.length;i++) {
    city = document.forms['myForm'].city.value;
    //country = formsCollection[i]["country"].value;
    if(city === "" || city === null) {
      alert("returning false to the validate city!")
      return false;
      //alert ('validate is working good!');
      // for (let item of validText) {
      //   console.log("validText is "+validText);
      //   console.log('item is '+item);
      //   item.style.visibility = 'visible';
      //   alert( "Please provide your user data!" );
      //   formsCollection[i]["city"].focus();
      //   item.style.visibility = 'hidden';
      //   return false;
      // }
      //validText.style.visibility = 'hidden';
    }
    // }
  }


function validateCountry (country) {
  country = document.forms['myForm'].country.value;
  if(country === "" || country === null) {
    alert("returning false to the validate country!")
      return false;
  }
  //alert ("it is working! validate with no arguments");
}

function validateDate (date) {
  alert ("it is working! validate with no arguments");
}

function validateTime (time) {
  alert ("it is working! validate with no arguments");
}


