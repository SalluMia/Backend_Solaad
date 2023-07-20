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
const { register, login, addLogo, editLogo, deleteLogo, getLogo, updatePost } = require('../controllers/user');
const { addHolidayEvent, updateHolidayEvent, deleteHolidayEvent, getHomePageHeroContent } = require('../controllers/holiday&events');
const { addSocialMediaLink, getSocialMediaLinks, updateSocialMediaLink, deleteSocialMediaLink } = require('../controllers/socialmedia');
const { addService, updateService, deleteService, getServices, getServiceWithStrategicExecutions  } = require('../controllers/servicess');
const { addStrategicExecution, updateStrategicExecution, deleteStrategicExecution, getStrategicExecution } = require('../controllers/strategicExecution');
const { addTechnology, updateTechnology, deleteTechnology, getTechnologies} = require('../controllers/technologies');
const { addTestimonial, updateTestimonial, deleteTestimonial, getTestimonials, updateTestimonialByid} = require('../controllers/testimonials');
const { addContact, updateContact, deleteContact, getContact} = require('../controllers/contact');
const { addPortfolioProject, updatePortfolioProject, deletePortfolioProject, getPortfolioProjects, getSinglePortfolioProject, getRelatedProjects} = require('../controllers/portprojects');


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
  // router.put('/holiday-event/:holidayEventId',upload.single('event_Picture'), updateHolidayEvent);
  router.put('/holiday-event/',upload.single('event_Picture'), updateHolidayEvent);
  router.delete('/holiday-event/:holidayEventId', deleteHolidayEvent);
  router.get('/holiday-event',getHomePageHeroContent);


  // Add a social media link
  router.post('/social-media',upload.single('image'),addSocialMediaLink);
  // router.put('/social-media/:socialMediaLinkId',upload.single('image'), updateSocialMediaLink);
  router.put('/social-media/',upload.single('image'), updateSocialMediaLink);
  router.delete('/social-media/:socialMediaLinkId',deleteSocialMediaLink);
  router.get('/social-media', getSocialMediaLinks);


  //Services Routes
  router.post('/services', upload.single('image'), addService);
  // router.put('/services/:serviceId',upload.single('image'), updateService);
  router.put('/services/',upload.single('image'), updateService);
  router.delete('/services/:serviceId', deleteService);
  router.get('/services', getServices);
  router.get('/services/:serviceId', getServiceWithStrategicExecutions);

  // Strategic Executions Routes
  router.post('/strategic-executions', upload.single('stratImage'), addStrategicExecution);
  // router.put('/strategic-executions/:strategicExecutionId', upload.single('stratImage'), updateStrategicExecution);
  router.put('/strategic-executions/', upload.single('stratImage'), updateStrategicExecution);
  router.delete('/strategic-executions/:strategicExecutionId', deleteStrategicExecution);
  router.get('/strategic-executions', getStrategicExecution);

  // Add a new technology
  router.post('/technology', upload.single('image'), addTechnology);
  // router.put('/technology/:technologyId', upload.single('image'), updateTechnology);
  router.put('/technology/', upload.single('image'), updateTechnology);
  router.delete('/technology/:technologyId', deleteTechnology);
  router.get('/technologies', getTechnologies);

  // Add a new portfolio project
  router.post('/portfolio', upload.single('projImage'), addPortfolioProject);
  // router.put('/portfolio/:projectId', upload.single('projImage'), updatePortfolioProject);
  router.put('/portfolio/', upload.single('projImage'), updatePortfolioProject);
  router.delete('/portfolio/:projectId', deletePortfolioProject);
  router.get('/portfolio', getPortfolioProjects);
  router.get('/portfolio/:projectId', getSinglePortfolioProject);
  router.get('/getRecomended/:projectId',getRelatedProjects)

  // Routes for testimonials
  router.post('/testimonial', upload.single('customerImage'), addTestimonial);
  router.post('/testimonial/:testimonialId',updateTestimonialByid);
  router.post('/updation/:id',updatePost);
  router.put('/testimonialupdate/', upload.single('customerImage'), updateTestimonial);
  router.delete('/testimonial/:testimonialId', deleteTestimonial);
  router.get('/testimonials', getTestimonials);

// Contact details
  router.post("/contact", addContact);
  // router.put("/contact/:contactId", updateContact);
  router.put("/contact/", updateContact);
  router.delete("/contact/:contactId", deleteContact);
  router.get("/contact", getContact);

  module.exports = router;