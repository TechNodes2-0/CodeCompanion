// import bot from './assets/bot.svg'
// import user from './assets/user.svg'
const form=document.querySelector('form');
// var chatContainer=document.querySelector('#chat_container');
var chatContainer=document.getElementById('chat_container');
let loadinterval;
var salt=" ";
// const canvas = document.getElementById('myCanvas');
//     const ctx = canvas.getContext('2d');
 
//     const image = new Image();
const commentbtn = document.getElementById('commiter');
if(commentbtn)
{
commentbtn.addEventListener('click', function (e) {
    salt = " Please rewrite the following code by adding meaningful comments to it";
    
    handleSubmit(e, salt);
  });
}
const timebtn = document.getElementById('time');
if(timebtn)
{
  time.addEventListener('click', function (e) {
    salt = "        find space and time  complexity";
    
    handleSubmit(e, salt);
  });
}
const explainbtn = document.getElementById('explain');
if(explainbtn)
{
  explainbtn.addEventListener('click', function (e) {
    salt = "Can you explain the following code and its behavior, including any important details or edge cases /n";
    
    handleSubmit(e, salt);
  });
}
const checkbtn = document.getElementById('check');
if(checkbtn)
{
  checkbtn.addEventListener('click', function (e) {
    salt ="Can you help me find and fix the error(s) in the following code? If possible, can you also explain why the error is occurring? and please rewrite code for me ";
    
    handleSubmit(e, salt);
  });
}

// const timeBtn = document.getElementById('button2');

// timeBtn.addEventListener('click', function (e) {
//   salt ="   add comments for this code";
  
//   handleSubmit(e, salt);
// });

function loader(element)
{
  element.textContent='';
  loadinterval=setInterval(()=>
  {
    element.textContent+='.';
    if(element.textContent==='....')
    {
      element.textContent='';
    }
  },300);
}
function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
      if (index < text.length) {
          element.innerHTML += text.charAt(index)
          index++
      } else {
          clearInterval(interval)
      }
  }, 20)
}
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
function chatStripe(isAi, value, uniqueId) {
  return (
      `
      <div class="wrapper ${isAi && 'ai'}">
          <div class="chat">
              <div class="profile">
                  <img 
                    src=${isAi ? bot : user} 
                    alt="${isAi ? 'bot' : 'user'}" 
                  />
              </div>
              <div class="message" id=${uniqueId}>${value}</div>
          </div>
      </div>
  `
  )
}

// salt='Please rewrite the following code by adding meaningful comments to it';
const handleSubmit = async (e,salt) => {
  e.preventDefault()

  const data = new FormData(form)
  data.append('extra',salt);

  console.log(data);


  // user's chatstripe
  //chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  // chatContainer.innerHTML += "space complexity";

  // to clear the textarea input 
  form.reset()

  // bot's chatstripe
  const uniqueId = generateUniqueId()
  //chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // to focus scroll to the bottom 
  //chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 
  //const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  //loader(messageDiv)

  const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          prompt: data.get('prompt'),
          extra: data.get('extra')
      })
  })

  clearInterval(loadinterval)
  //messageDiv.innerHTML = " "

  function drawer(data)
  {
    const imageUrl = data;
    image.src = imageUrl;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    image.onload = function() {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }
  const op=document.getElementById('message');
  if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 
     // chatContainer=parsedData;
      // ctx.font = "32px serif";
     // ctx.fillText(parsedData, 20, 50);
     op.innerHTML=parsedData;
    // typeText(messageDiv, parsedData)
      // drawer(parsedData);
  } else {
      const err = await response.text()

     // messageDiv.innerHTML = "Something went wrong"
      alert(err)
  }
}

form.addEventListener('submit',  handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    salt='Please rewrite the following code by adding meaningful comments to it';
       handleSubmit(e,salt)


      // handleSubmit(e,salt)
  }
})

