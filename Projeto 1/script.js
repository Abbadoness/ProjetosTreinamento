let users = [
{id:1,first_name:"Lauren",last_name:"Shaxby",email:"lshaxby0@php.net",created_at:"16/10/2021"},
{id:2,first_name:"Ardenia",last_name:"Paddingdon",email:"apaddingdon1@nsw.gov.au",created_at:"27/07/2021"},{id:3,first_name:"Renaldo",last_name:"Alenichev",email:"ralenichev2@ftc.gov"
,created_at:"10/06/2021"},
{id:4,first_name:"Nichole",last_name:"OHeneghan",email:"noheneghan3@flavors.me",created_at:"28/06/2021"},
{id:5,first_name:"Haywood",last_name:"Daintry",email:"hdaintry4@nhs.uk",created_at:"18/03/2021"},
{id:6,first_name:"Leslie",last_name:"Daile",email:"ldaile5@vimeo.com",created_at:"23/05/2021"},
{id:7,first_name:"Byrann",last_name:"Slorance",email:"bslorance6@kickstarter.com",created_at:"15/05/2021"},
{id:8,first_name:"My",last_name:"Swendell",email:"mswendell7@moonfruit.com",created_at:"15/12/2021"},
{id:9,first_name:"Brier",last_name:"Esson",email:"besson8@usa.gov",created_at:"14/03/2021"},
{id:10,first_name:"Seth",last_name:"Piddle",email:"spiddle9@nationalgeographic.com",created_at:"20/10/2021"},
{id:11,first_name:"Fer",last_name:"Piddle",email:"ferspiddle9@nationalgeographic.com",created_at:"20/10/2022"}
]

const quant_users = 5

function getUsersElements(aux = 0){
  const start = aux * quant_users
  const end = (aux * quant_users) + quant_users

  return users.slice(start, end).map(user => {
    let elementos = document.createElement('tr')
    elementos.setAttribute('id', user.id)

    let user_name = document.createElement('td')
    user_name.appendChild(document.createTextNode(`${user.first_name} ${user.last_name}`))

    let user_email = document.createElement('td')
    user_email.appendChild(document.createTextNode(user.email))

    let x = document.createElement('td')
    x.appendChild(document.createTextNode(user.created_at))
    
    let y = document.createElement('td')
    y.classList.add('action_buttons')

    let botao_excluir = document.createElement('button')
    botao_excluir.classList.add('text_button', 'botao_excluir')
    botao_excluir.appendChild(document.createTextNode('excluir'))
    botao_excluir.setAttribute('type', 'button')
    botao_excluir.addEventListener('click', () => excluir_usuario(user.id, aux))

    let botao_editar = document.createElement('button')
    botao_editar.appendChild(document.createTextNode('editar'))
    botao_editar.classList.add('text_button', 'botao_editar')

    y.appendChild(botao_editar)
    y.appendChild(botao_excluir)

    elementos.appendChild(user_name)
    elementos.appendChild(user_email)
    elementos.appendChild(x)
    elementos.appendChild(y)

    return elementos
  })
}

function excluir_usuario(id, aux){
  users = users.filter(user => user.id !== id)
  document.getElementById(`${id}`).remove()
  setpaginacao(aux)
}

const tbody = document.querySelector('tbody')

function pagina_nova(aux = 0){
  while (tbody.hasChildNodes()){  
    tbody.removeChild(tbody.lastChild)
  }

  getUsersElements(aux).forEach(elementos => tbody.appendChild(elementos))
  setpaginacao(aux)
}

function setpaginacao(pagina_atual = 0){
  const paginacao = document.querySelector('.paginacao')
  while (paginacao.hasChildNodes()){  
    paginacao.removeChild(paginacao.lastChild)
  }

  let quant_pags = Math.ceil(users.length/quant_users)

  let backpaginacao = document.createElement('button')
  backpaginacao.appendChild(document.createTextNode('<<'))
  backpaginacao.setAttribute('type', 'button')
  backpaginacao.addEventListener('click', () => pagina_nova(mod(pagina_atual - 1, quant_pags)))
  paginacao.appendChild(backpaginacao)

  for (let page = 0; page < quant_pags; page++){
    let paginacaoButton = document.createElement('button')
    paginacaoButton.appendChild(document.createTextNode(`${page+1}`))
    paginacaoButton.setAttribute('type', 'button')

    if (page === pagina_atual) paginacaoButton.classList.add('active')
  
    paginacaoButton.addEventListener('click', () => pagina_nova(page))
    paginacao.appendChild(paginacaoButton)
  }

  let nextpaginacao = document.createElement('button')
  nextpaginacao.appendChild(document.createTextNode('>>'))
  nextpaginacao.setAttribute('type', 'button')
  nextpaginacao.addEventListener('click', () => pagina_nova(mod(pagina_atual + 1, quant_pags)))
  paginacao.appendChild(nextpaginacao)
}

function mod(x, y){
  return ((x % y) + y) % y;
}

getUsersElements(0).forEach(elementos => tbody.appendChild(elementos))
setpaginacao(0)