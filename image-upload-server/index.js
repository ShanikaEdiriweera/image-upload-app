import logger from 'morgan';
import bodyParser, { urlencoded } from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import express from 'express'
import AWS from 'aws-sdk';

import {uploadFile} from './s3Service';

const app = express() //application instance
AWS.config.loadFromPath('./s3_credentials.json');

const s3 = new AWS.S3();

app.use(logger('dev'))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

/**
 * Upload image to server
 */
app.post('/upload', (req, res, next) => {
  console.log("request: ", req.files);
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function(err) {
    if (err) {
      console.log("error:", err)
      return res.status(500).send(err);
    }
    console.log("no error: ")
    res.json({file: `public/${req.body.filename}.jpg`});
  });
})

/**
 * Upload image to s3 bucket
 */
app.post('/upload-s3', (req, res) => {
  console.log("upload-s3 request: ", req.files);
  s3.upload({
    Key: req.files.file.name,
    Body: req.files.file.data,
    Bucket: 'ideo-images',
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      console.log("s3 upload err: ", err);
      res.json({message:'err', err});
    }
    res.json({message:'Successfully uploaded ' + req.files.length + ' files!', data});
  });
})


app.get('/test', (req, res) => {
    res.send("Server Running!")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log("Server listening on port 8000.")
})