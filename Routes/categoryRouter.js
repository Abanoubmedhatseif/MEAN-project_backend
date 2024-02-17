const router = require('express').Router()
const categoryService = require('../Services/CategoryService')

router.get('/', async(req, res, next)=>{
    await categoryService.getAllCategories()
        .then((categories) => res.status(200).json(categories))
        .catch((err) => next(err))
})

router.post('/', async(req, res, next)=>{
    await categoryService.createCategory(req.body)
        .then(() => res.status(200).json({"Message" : "Done", "Data": req.body}))
        .catch((err) => next(err))
})

module.exports = router
