
// Selecionando elementos do DOM (buscando as entradas que o usuário digitou no HTML)
let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

// Variável para validar nome
let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

// Variável para validar usuário
let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

// Variável para validar senha
let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

// Variável para validar confirmação de senha
let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false


let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

// Event listener para validar nome
nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){ // Se o nome for menor ou igual a 2 caracteres mudar a cor pra vermelho e pedir um nome válido.
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira um nome válido'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

// Event listener para validar usuário
usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 4){ // Se o usuário for menor ou igual a 4 caracteres mudar a cor pra vermelho e pedir um usuário válido. 
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})


// Event listener para validar senha
senha.addEventListener('keyup', () => {
  if(senha.value.length <= 7){ // Se a senha for menor ou igual a 7 caracteres mudar a cor pra vermelho e pedir uma senha maior.
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no mínimo 8 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else if (!/[A-Z]/.test(senha.value)) { // Se a senha não conter 1 caracter maíusculo mudar a cor pra vermelho e pedir pelo menos um caractere maiúsculo.
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira pelo menos um caractere maiúsculo'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else if (!/[\W_]/.test(senha.value)) {  // Exige que a senha contenha pelo menos um símbolo, se não tiver  mudar a cor pra vermelho e pedir pelo menos um símbolo.
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira pelo menos um símbolo'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

// Event listener para confirmar a senha
confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){ // Verifica se as senhas digitas são iguais, se não forem avisa que são diferentes.
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

// Função para cadastrar o usuário no localstorage do navegador
function cadastrar(){
  if(validNome && validUsuario && validSenha && validConfirmSenha){ // Se os dados forem válidos
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')  // Cria uma lista de usuários no localstorage.
    
    let senhaCriptografada = CryptoJS.SHA512(senha.value).toString(); // criptografa a senha usando a biblioteca CryptoJS
    
    listaUser.push(
    {
      nomeCad: nome.value,
      userCad: usuario.value,
      senhaCad: senhaCriptografada // armazena a senha criptografada 
    }
    )
    
    localStorage.setItem('listaUser', JSON.stringify(listaUser))
    
    // Mostra uma mensagem cadastrando o usuário se houver sucesso
    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''
    
    // Envia o usuário para a tela de login se o cadastro obter sucesso
    setTimeout(()=>{
        window.location.href = '../HTML/login.html'
    }, 3000)
  
    
  } else { // Senão obter sucesso, pede que os campso sejam cadastrador corretamente
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
}
btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

btnConfirm.addEventListener('click', ()=>{
  let inputConfirmSenha = document.querySelector('#confirmSenha')
  
  if(inputConfirmSenha.getAttribute('type') == 'password'){
    inputConfirmSenha.setAttribute('type', 'text')
  } else {
    inputConfirmSenha.setAttribute('type', 'password')
  }
})



  
  
