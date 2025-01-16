const express = require('express');
const router = express.Router();

const { HandleGetReviews,HandlePostReviews } = require("../controllers/reviews");

router.get("/:id",HandleGetReviews);
router.post("/",HandlePostReviews);

module.exports=router;