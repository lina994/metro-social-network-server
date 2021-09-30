import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/');
  },
  filename: function (req, file, cb) {
    let fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

const MB = 1024 * 1024;


/* The function should call `cb` with a boolean
to indicate if the file should be accepted
To reject this file pass `false`: cb(null, false)
To accept the file pass `true`: cb(null, true)
pass an error if something goes wrong: cb(new Error('Some text')) */

function fileFilter (req, file, cb) {
  const extension = path.extname(file.originalname).toLowerCase();
  if ((file.mimetype === 'image/jpg' && extension === '.jpg')
  || (file.mimetype === 'image/jpg' && extension === '.jpeg')
  || (file.mimetype === 'image/jpeg' && extension === '.jpg')
  || (file.mimetype === 'image/jpeg' && extension === '.jpeg')
  || (file.mimetype === 'image/png' && extension === '.png')) {
    cb(null, true); // accept the file
  } else {
    cb(new Error('File upload only supports the following filetypes - jpg, jpeg, png'));
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * MB
  },
  fileFilter: fileFilter
 });


export default upload;

