const path = require('path') 
const express = require('express') 
const hbs = require('hbs')
const cotacoes = require('../src/util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath)) 

app.get('',(req, res)=>{
  res.render('index',{
      title: 'Assets Now!',
      author: 'Caldeira'
  })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'Sobre o autor',
        author: 'Caldeira'
    })
  })

  app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Ajuda?!',
        author: 'Caldeira'
    })
  })

  app.get('/cotacoes',(req, res)=>{

    if(!req.query.ativo){
        return res.status(400).json({
        error : {
          mensage: "O ativo deve ser informado",
          code: 400
        }
      })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, data)=>{
      if(err){
        return res.status(404).json({
          error: {
            mensage: err.mensage,
            code: 404
          }
        })
      }

      return res.status(200).json(data)
      } )

  })

 app.get('/help/*', (req,res)=>{
 res.render('404', {errorMessage: 'Não existe pagina depois de help',
 title: '404',
 author: 'Caldeira'})
})

 app.get('*', (req,res)=>{
   res.render('404', {errorMessage: 'Página não encontrada',
   title: '404',
   author: 'Caldeira'})
 })

 const port =process.env.PORT || 3000

app.listen(3000, ()=>{
    console.log(`server is up on port ${port}`)
})