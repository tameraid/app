const profileRouter = require('express').Router()
const profileController = require('../controllers/profile.controller')
const { check } = require('express-validator')


profileRouter.get('/' , profileController.allProfiles )

profileRouter.get('/me' , profileController.me )

profileRouter.get( '/:id' , profileController.getProfile )

profileRouter.post('/add' ,[
    check('professional' , 'You must enter your profession').not().isEmpty()
], profileController.add )

profileRouter.post('/add_exp',[
    check('jobTitle', 'You must enter your job title').not().isEmpty(),
    check('company', 'You must enter your company name').not().isEmpty()
] , profileController.addExp )

profileRouter.delete('/delete_exp/:expId', profileController.deleteExp )

profileRouter.delete('/delete_educ/:educId', profileController.deleteEduc )

profileRouter.post('/add_educ',[
    check('school', 'You must enter your school name').not().isEmpty(),
    check('degree', 'You must enter your degree').not().isEmpty()
]  , profileController.addEduc)


module.exports = profileRouter