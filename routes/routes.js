const express=require('express')
const multer  = require('multer')

// ===================================================Multer =========================================================


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, Date.now() + '_' + file.fieldname + '.' + fileExtension);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, and PNG files are allowed.'));
    }
  }
});

const upload = multer({ storage: storage })

const router=express.Router()
const {
        register,
        login,
        addLogo,
        editLogo,
        deleteLogo,
        getLogo
      
  } = require('../controllers/user');

  const {
    addHolidayEvent,
    updateHolidayEvent,
    deleteHolidayEvent,
    getHomePageHeroContent
  } = require('../controllers/holiday&events');


  const {
    addSocialMediaLink,
    getSocialMediaLinks,
    updateSocialMediaLink,
    deleteSocialMediaLink
  } = require('../controllers/socialmedia');


  const {
    addService,
    updateService,
    deleteService,
    getServices,
    getServiceWithStrategicExecutions
  } = require('../controllers/servicess');

  const {
    addStrategicExecution,
    updateStrategicExecution,
    deleteStrategicExecution,
    getStrategicExecution
  } = require('../controllers/strategicExecution');

  // Add a Login
  router.post('/register', register);
  router.post('/login', login);


  // Add a Logo 
  router.post('/logo', upload.single('logopic'), addLogo);
  router.put('/logo/:logoId', upload.single('logopic'), editLogo);
  router.delete('/logo/:logoId', deleteLogo);
  router.get('/logo', getLogo);


  // Add a Holiday & Events 
  router.post('/holiday-event',upload.single('event_Picture'), addHolidayEvent);
  router.put('/holiday-event/:holidayEventId',upload.single('event_Picture'), updateHolidayEvent);
  router.delete('/holiday-event/:holidayEventId', deleteHolidayEvent);
  router.get('/holiday-event',getHomePageHeroContent);


  // Add a social media link
    router.post('/social-media',upload.single('image'),addSocialMediaLink);
    router.put('/social-media/:socialMediaLinkId',upload.single('image'), updateSocialMediaLink);
    router.delete('/social-media/:socialMediaLinkId',deleteSocialMediaLink);
    router.get('/social-media', getSocialMediaLinks);


  //Services Routes
  router.post('/services', upload.single('image'), addService);
  router.put('/services/:serviceId',upload.single('image'), updateService);
  router.delete('/services/:serviceId', deleteService);
  router.get('/services', getServices);
  router.get('/services/:serviceId', getServiceWithStrategicExecutions);



  // Strategic Executions Routes
  router.post('/strategic-executions', upload.single('image'), addStrategicExecution);
  router.put('/strategic-executions/:strategicExecutionId', upload.single('image'), updateStrategicExecution);
  router.delete('/strategic-executions/:strategicExecutionId', deleteStrategicExecution);
  router.get('/strategic-executions', getStrategicExecution);

  module.exports = router;