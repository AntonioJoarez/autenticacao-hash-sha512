// Botão de visualizar a senha quando clica no botão de "olho"
let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

// Função para realizar o login
function entrar(){ 
 

  let usuario = document.querySelector('#usuario')
  let userLabel = document.querySelector('#userLabel')
  
  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')
  // Criptograda a senha para poder compara-la com a senha cadastrada e criptografada no localstorage.
  let senhaCriptografada = CryptoJS.SHA512(senha.value).toString();
  
  let msgError = document.querySelector('#msgError')
  let listaUser = []
  
  let userValid = {
    nome: '',
    user: '',
    senha: ''
  }
  // Verifica se os dados conferem com os que estão no localstorage
  listaUser = JSON.parse(localStorage.getItem('listaUser'))

  listaUser.forEach((item) => {
    if(usuario.value == item.userCad && senhaCriptografada == item.senhaCad){
       
      userValid = {
         nome: item.nomeCad,
         user: item.userCad,
         senha: item.senhaCad
       }
      
    }
})

   // Encaminha o usuário para a tela principal caso o login obter sucesso.
  if(usuario.value == userValid.user && senhaCriptografada == userValid.senha){
    window.location.href = '../HTML/index.html'
    
    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom
    
    localStorage.setItem('token', token)
    localStorage.setItem('userLogado', JSON.stringify(userValid))
  } else {
    userLabel.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    usuario.focus()
  } 
}
