var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.post("/add", async (req, res) => {
  try {
    res.status(200).json(req.body)
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
