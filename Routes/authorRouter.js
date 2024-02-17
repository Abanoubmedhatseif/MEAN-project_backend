const router = require('express').Router()
const authorService = require('../Services/AuthorService')

router.get('/', async(req, res, next)=>{
    await authorService.getAllAuthors()
        .then((authors) => res.status(200).json(authors))
        .catch((err) => next(err))
})

router.post('/', async(req, res, next)=>{
    await authorService.createAuthor(req.body)
        .then(() => res.status(200).json({"Message" : "Done", "Data": req.body}))
        .catch((err) => next(err))
})

module.exports = router
