import express from 'express';
import * as user from '../domain/services/user-services.js';

const router = express.Router();

router.post('/users/register', user.Create);
export default router;
