const router = require('express').Router()
const bookService = require('../Services/BookService')

router.get('/', async(req, res, next)=>{
    await bookService.getAllBooks()
        .then((books) => res.status(200).json(books))
        .catch((err) => next(err))
})

router.get('/:id', async(req, res, next)=>{
    await bookService.getOneBook(req.params.id)
        .then((book) => (book.length >= 1) ? res.status(200).json(book) : res.status(404).send({"Message": "No data"}))
        .catch((err) => next(err))
})

router.post('/', async(req, res, next)=>{
    await bookService.createBook(req.body)
        .then(() => res.status(200).json({"Message" : "Done", "Data": req.body}))
        .catch((err) => next(err))
})

router.put('/:id', async(req, res, next)=>{
    await bookService.updateBook({id: req.params.id, data: req.body})
        .then((book) => (book) ? res.status(200).json({"Message" : "Done", "Data": book}) :  res.status(404).send({"Message": "No data"}))
        .catch((err) => next(err))
})


router.delete('/:id', async(req, res, next)=>{
    await bookService.deleteBook(req.params.id)
        .then((isDeleted) => isDeleted ? res.status(200).json({"Message" : "Done | Deleted"}) : res.status(404).send({"Message": "No data"}) )
        // .then((book) => (book) ? res.status(200).json({"Message" : "Done | Deleted"}) :  res.status(404).send({"Message": "No data"}))
        .catch((err) => next(err))
})


module.exports = router
