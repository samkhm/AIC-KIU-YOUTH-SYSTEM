const express = require("express")
const { protect, authorize } = require("../middleware/auth")
const { generateToken } = require("../middleware/pay_auth")
const { createProject, getProjects, completeProject, deleteProject, updateProject, permanentDelete } = require("../controllers/projectController")
const { createEvent, getEvents, deleteEvent, updateEvent } = require("../controllers/eventsController")
const { createAnnouncement, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controllers/annoncementsController")
// const {} = require("../controllers/reportsController")
const { getUsers, updateUserInfo, deleteUser, userLogedOut, getProfile, updateProfile } = require("../controllers/authUserController")
const { createContributions, getContributions, callBack, getPaymentStatus, getPayments } = require("../controllers/payment")
const upload = require('../middleware/uploads')
const router = express.Router();

router.get('/getUsers', protect, authorize("admin", "moderator"), getUsers)
router.put('/updateUserInfo/:id', protect, authorize("admin", "moderator"), updateUserInfo)
router.delete('/deleteUser/:id', protect, authorize("admin", "moderator"), deleteUser)
router.put('/userLogedOut/:id', userLogedOut)

router.post('/createProject', protect, upload.single("image"), authorize("admin", "moderator"), createProject)
router.get('/getProjects', protect, getProjects)
router.delete('/deleteProject/:id', protect, authorize("admin", "moderator"), deleteProject)
router.put('/updateProject/:id', protect, upload.single("image"), authorize("admin", "moderator"), updateProject)
router.put('/completeProject/:id', protect, authorize("admin", "moderator"), completeProject)

router.post('/createAnnouncement', protect, authorize("admin", "moderator"), createAnnouncement)
router.get('/getAnnouncements', protect, getAnnouncements)
router.delete('/deleteAnnouncement/:id', protect, authorize("admin", "moderator"), deleteAnnouncement)
router.put('/updateAnnouncement/:id', protect, authorize("admin", "moderator"), updateAnnouncement)

router.post('/createEvent', protect, authorize("admin", "moderator"), createEvent)
router.get('/getEvents', protect, getEvents)
router.delete('/deleteEvent/:id', protect, authorize("admin", "moderator"), deleteEvent)
router.put('/updateEvent/:id', protect, authorize("admin", "moderator"), updateEvent)

//payments
router.post('/userContributions', generateToken, protect, createContributions)
router.get('/getContributions/:userId', protect, getContributions)
router.get('/getPayments', protect, authorize("admin", "moderator"), getPayments)
router.post('/callback', callBack)
router.get('/paymentStatus/:checkoutRequestID', getPaymentStatus)
// router.put()
// router.put()

//payment

router.get('/getProfile/:id', protect, getProfile)
router.put('/updateProfile/:id', protect, updateProfile)




module.exports = router;