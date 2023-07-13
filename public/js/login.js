let username = document.querySelector('.username');
let password = document.querySelector('.password');
let button = document.querySelector('.button');

let name = '';
let pwd = '';
let form = {};

const goWorkPage = async () => {
	const result = await axios.get('/work');
  };

// відправка даних на сервер
const sendForm = async (req, res) =>  {
	  const result =  await axios.post('/login', form);
    console.log(result.data);
    if (result.data.status !=='ok'){
      alert(result.data.status);	
    }
    else {
      goWorkPage();
    }
         
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
    form = {};
    form.username = username.value;
    form.password = password.value;
	if (username.value && password.value) {
    username.value = '';
    password.value = '';
		sendForm();		
	}
  }
  );

  
