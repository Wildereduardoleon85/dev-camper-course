import express from 'express'

const bootcampsRouter = express.Router()

bootcampsRouter.get('/', (req, res)=> {
    res.status(200).json({success: true, msg: 'Show all bootcamps'})
})

bootcampsRouter.get('/:id', (req, res)=> {
    res.status(200).json({success: true, msg: `Get bootcamp ${req.params.id}`})
})

bootcampsRouter.post('/', (req, res)=> {
    res.status(200).json({success: true, msg: 'Create new bootcamp'})
})

bootcampsRouter.put('/:id', (req, res)=> {
    res.status(200).json({success: true, msg: `Update bootcamp ${req.params.id}`})
})

bootcampsRouter.delete('/:id', (req, res)=> {
    res.status(200).json({success: true, msg: `Delete bootcamp ${req.params.id}`})
})

export default bootcampsRouter