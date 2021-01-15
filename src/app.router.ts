import { Router, Request, Response } from 'express';
const router = Router();

router.route('/').get((_req: Request, res: Response) => {
  res.json({
    title: 'Invetory RESTful API',
    description:
      'An API to store information about items stored around your house or your room. Information like name of the item, size, color, location, etc. ',
    contact: {
      name: 'Rafael Abuawad',
      url: 'https://github.com/rafael-abuawad',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/rafael-abuawad/inventory/blob/master/LICENSE',
    },
    version: '0.0.1',
  });
});

export default router;
