const express = require('express');
const router= express.Router();

const {ChatPage,Main, Login, Registration, PostRegistration,PostLogin,} = require('../api/api');

router.get("/chat",ChatPage);
router.get('/',Main);
router.get("/login",Login)
router.get("/registration",Registration);
router.post("/postregister",PostRegistration);
router.post("/validate",PostLogin);

module.exports= router;