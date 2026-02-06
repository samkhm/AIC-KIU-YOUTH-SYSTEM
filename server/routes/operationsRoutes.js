const { createProject, getProjects, completeProject, deleteProject, updateProject, getProjectRemainingAmount } = require("../controllers/projectController")
const { createEvent, getEvents, deleteEvent, updateEvent } = require("../controllers/eventsController")
const { createAnnouncement, getAnnouncements, deleteAnnouncement, updateAnnouncement } = require("../controllers/annoncementsController")
// const {} = require("../controllers/reportsController")
const { getUsers, updateUserInfo, deleteUser, userLogedOut, getProfile, updateProfile } = require("../controllers/authUserController")
const { createContributions, getContributions, callBack, getPaymentStatus, getPayments } = require("../controllers/payment")
const {  createLibrary,
  getLibraries,
  getLibrary,
  updateLibrary,
  deleteLibrary, } = require("../controllers/libraryController");
const upload = require('../middleware/uploads')
const {
  createGallery,
  getGalleries,
  getGalleryById,
  getImageById,
  deleteImage,
  deleteGallery
} = require("../controllers/galleryController.js");

const uploadDocument = require("../middleware/documentupload");
const { generateToken } = require("../middleware/pay_auth")
const { protect, authorize } = require("../middleware/auth")
const multer = require("multer")
const uploadMany = multer({ dest: "uploads/" }); // temp storage before upload to cloud
const express = require("express");
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
router.get(
    "/getProjectRemAmount/:projectId", protect,
    getProjectRemainingAmount
  );
  

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


router.post('/createLibrary', uploadDocument.single('file'), protect, authorize("admin", "moderator"), createLibrary)
/* READ DOCUMENTS */
router.get("/getLibraries", protect, getLibraries);            // all
router.get("/getLibrary/:id", protect, getLibrary);           // single

/* UPDATE DOCUMENT */
router.put("/updateLibrary/:id", uploadDocument.single("file"), protect, authorize("admin", "moderator"), updateLibrary);

/* DELETE DOCUMENT */
router.delete("/deleteLibrary/:id", protect, authorize("admin", "moderator"), deleteLibrary);


router.post("/createGallery", uploadMany.array("images"), protect, authorize("admin", "moderator"), createGallery);
router.get("/getGalleries", getGalleries);
router.get("/getGalleryById/:id", protect, authorize("admin", "moderator"), getGalleryById);
router.get("/getImageById/:galleryId/image/:imageId", getImageById);

// Delete routes
router.delete("/deleteImage/:galleryId/image/:imageId", protect, authorize("admin", "moderator"), deleteImage);
router.delete("/deleteGallery/:galleryId", protect, authorize("admin", "moderator"), deleteGallery);

module.exports = router;