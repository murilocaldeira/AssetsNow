const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('#name')
const priceOpen= document.querySelector('#price_open')
const priceNow= document.querySelector('#price')
const dayHigh= document.querySelector('#day_high')
const dayLow= document.querySelector('#day_low')

const imageOpen= document.querySelector('#open_img')
const imageNow= document.querySelector('#price_img')
const imageDayHigh= document.querySelector('#high_img')
const imageDayLow= document.querySelector('#down_img')

RestartHtmlValues = () =>{
    mainMessage.innerText  = ""
    priceOpen.innerText  = ""
    priceNow.innerText   = "" 
    dayHigh.innerText     =  ""
    dayLow.innerText      =  ""

    imageOpen.style.display              = 'none'
    imageNow.style.display               = 'none'
    imageDayHigh.style.display        = 'none'
    imageDayLow.style.display         = 'none'
}

RestartHtmlValues()

cotacoesForm.addEventListener('submit', (event)=>{    
    
    mainMessage.innerText  = "Buscando..."
    event.preventDefault()
    const ativo = document.querySelector('input').value

    fetch(`./cotacoes?ativo=${ativo}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            RestartHtmlValues()
            mainMessage.innerText  = "Algo deu errado"
            priceOpen.innerText = `${data.error.mensage} | Código: ${data.error.code}`
            console.log(`Algo deu errado: ${data.error.mensage} | Código: ${data.error.code}`)
        }
        else{
            mainMessage.innerText  = `${data.name}`
            priceOpen.innerText = `OPEN: R$ ${data.price_open}`
            priceNow.innerText= `PRICE: R$ ${data.price}`
            dayHigh.innerText=  `DAY HIGH: R$ ${data.day_high}`
            dayLow.innerText=  `DAY LOW: R$ ${data.day_low}`

            imageOpen.style.display              = ''
            imageNow.style.display               = ''
            imageDayHigh.style.display        = ''
            imageDayLow.style.display         = ''
            console.log(data)
        }
    })
}) 
})



