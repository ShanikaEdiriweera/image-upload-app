import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

AWS.config.loadFromPath('./s3_credentials.json');
const s3 = new AWS.S3();

//List all buckets owned by the authenticate sender of the request. Note: bucket name must be unique.
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listBuckets-property for more info
exports.listBuckets = function (req, res) {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//Retrieves objects from Amazon s3
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property to configure params properties
//eg var params = {Bucket: 'bucketname', Key:'keyname'}
exports.getObjects = function (req, res) {
    var item = req.body;
    var params = { Bucket: req.params.bucketName };
    s3.getObject(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//Delete qn object
//check http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property for more info
exports.deleteObject = function (req, res) {
    var item = req.body;
    var params = { Bucket: item.bucketName, Key: item.key };
    s3.deleteObjects(params, function (err, data) {
        if (err) {
            return res.send({ "error": err });
        }
        res.send({ data });
    });
}

//cloud image uploader using multer-s3 
//Pass the bucket name to the bucketName param to upload the file to the bucket 
exports.uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ideo-thumbnails', //item.bucketName,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})