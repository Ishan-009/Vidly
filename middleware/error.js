
function (err, req, res, next) {
  res.status(500).send("Something Failed");
  console.log(ex.message);
}
module.exports= error;