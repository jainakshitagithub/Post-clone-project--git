console.log('Welcome to Post Master');
//Initially displaying the parameters box

let json = document.getElementById('json');
let custom = document.getElementById('customParam');
let customParameter = document.getElementById('customParameter')
let jsonParam = document.getElementById('jsonParam')

if (json.checked) {
  jsonParam.style.display = 'block';
  customParameter.style.display = 'none';
}

json.addEventListener('click', () => {
  jsonParam.style.display = 'block';
  customParameter.style.display = 'none';
})

custom.addEventListener('click', () => {
  jsonParam.style.display = 'none';
  customParameter.style.display = 'block';
})
function getElement(string) {
  let divelem = document.createElement('div');
  divelem.className = 'divelem';
  divelem.id = 'divelem';
  divelem.innerHTML += string;
  // console.log(divelem);
  let paramElement = document.getElementById('paramElement');
  paramElement.appendChild(divelem);

}
addParam = 0;
let append = document.getElementById('append');
append.addEventListener('click', () => {
  console.log('clicked');
  let string = '';
  string += ` <div id="appendElem">
    <div id="customParameter${addParam + 2}">
    <div class="mb-3 row my-3">
    <label for="jsonParam" class="col-sm-2 col-form-label">Parameter${addParam + 2}</label>
    <div class="col-sm-10 ">
        <div class="input-group">
    
          <input type="text" aria-label="First name" class="form-control firstText" id="parameterkey${addParam + 2}" placeholder="Parameter ${addParam + 2}">
          <input type="text" aria-label="Last name" class="form-control secondText" id="parametervalue${addParam + 2}" placeholder="Parameter ${addParam + 2}">
          <button type="button" class="btn btn-primary delBtn" id="${addParam}" onclick="deleteButton(this.id)">-</button>
        </div>
        </div>
    </div>
    </div>
    </div>`
  addParam = addParam + 1;
  getElement(string);
})

function deleteButton(index) {
  let delBtn = document.getElementById(index);
  console.log(delBtn);
  delBtn.parentElement.parentElement.parentElement.remove();
}

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
  let response = document.getElementById('responseJsonText');
  response.innerHTML = "Please Wait...Fetching response..."
  // console.log(submit);
  let urlVal = document.getElementById('url').value;
  let requestType = document.querySelector(`input[name='requestType']:checked`).value;
  let contentType = document.querySelector(`input[name='contentType']:checked`).value;
  if (contentType == 'Custom Parameters')
  {
     data = {};

    for (i = 0; i < addParam + 1; i++) {
      if (document.getElementById('parameterkey'+(i + 1)) != undefined) {
        let key = document.getElementById('parameterkey'+(i + 1)).value;
        let value = document.getElementById('parametervalue'+(i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  }
else if(contentType == 'Json') {
  data = document.getElementById('jsonParamText').value;
  }


 //Used for debuging
  console.log(`Url = ${urlVal}
  Reguest type = ${requestType}
  Content type = ${contentType}
  Parameter = ${data}
  `
  )
if(requestType=='Get')
{
  fetch(urlVal,{
    method:"GET",
  }).then(response=>response.text())
  .then((result)=>
  {
     document.getElementById('responseJsonText').value=result;
})
}
else{
  fetch(urlVal,{method : 'POST',
  body :data,
headers:
{
  'Content-type':'application/json; charset=UTF-8'}
})
  .then(response=>response.text())
  .then((result)=>
  { 
     document.getElementById('responseJsonText').value=result;
  })
}
})

