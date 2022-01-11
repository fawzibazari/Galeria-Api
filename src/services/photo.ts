import { Photo } from './../models/photo';
import { Request, Response } from 'express';
import multer from 'multer';
import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/user';
import passport from 'passport';
import path from 'path';
const baseUrl = 'http://localhost:4000/img/';

const ProductRoutes = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '../../../images');
  },
  filename: function (req: any, file: any, cb: any) {
    // const random = Math.random();
    // cb(null, random + file.originalname);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

ProductRoutes.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response) => {
    const photoRepository = getRepository(Photo);
    const fileName = req.file?.filename;
    console.log(fileName);
    if (!fileName) {
      res.status(404).send('Photo pas trouvé');
    } else {
      const { user, description, tags } = req.body;
      console.log(description), console.log(tags), console.log(fileName);
      const photo = new Photo();
      photo.url = baseUrl + fileName;
      photo.description = description;
      photo.tags = tags;
      photo.user = user;
      await photoRepository.save(photo);
      res.send(`your image is uploaded 😁 ${photo.url}
      id: ${photo.id}`);
    }
  },
);

ProductRoutes.delete('/:id([0-9]+)', async (req: Request, res: Response) => {
  const id = req.params.id;
  const photoRepository = getRepository(Photo);
  let photo: Photo;
  try {
    photo = await photoRepository.findOneOrFail(id);
    return photo;
  } catch (error) {
    res.status(404).send('Photo pas trouvé');
  }
  photoRepository.delete(id);
  res.status(200).send('photo deleted');
});

ProductRoutes.get(
  "/:id([0-9]+)",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const photoRepository = getRepository(Photo);
    const userRepository = getRepository(User);

    const photos = await photoRepository.find(
      {
        where: {
          user: { id: id},
      },
        relations: ["user"],

    }
    );
    res.send(photos);
  }
);

export default ProductRoutes;
