const express = require('express')
const path = require('path')
const multer  = require('multer')
const PDFMerger = require('pdf-merger-js');
const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 2002
var merger = new PDFMerger();

const mergepdf = async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2);
  let d = new Date().getTime()
  await merger.save('public/merged.pdf'); //save under given name and reset the internal document
  return d
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async(req, res, next)=>{
  // req.files is array of `pdfs` files
  // req.body will contain the text fields, if there were any
  console.log(req.files)
 await mergepdf(path.join(__dirname, req.files[0].path) , path.join(__dirname, req.files[1].path))
  res.redirect("http://localhost:2002/static/merged.pdf")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})