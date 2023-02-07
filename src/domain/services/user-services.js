import { LogDanger } from '../../utils/magic.js';
import { ResponseService } from '../../utils/magic.js';
import * as enum_ from '../../utils/enum.js';
import * as ormUser from '../orm/user-orm.js';

export const Create = async (req, res) => {
  let status = 'Success',
    errorcode = '',
    message = '',
    data = '',
    statuscode = 0,
    response = {};
  try {
    const { username, gmail, password } = req.body;

    if (username && gmail && password) {
      let resOrm = await ormUser.Create(req);
      if (resOrm.error) {
        (status = 'Failure'),
          (errorcode = resOrm.error.code),
          (message = resOrm.error.messsage),
          (statuscode = enum_.CODE_BAD_REQUEST);
      } else {
        (message = 'User created'),
          (data = resOrm),
          (statuscode = enum_.CODE_CREATED);
      }
    } else {
      (status = 'Failure'),
        (errorcode = enum_.ERROR_REQUIRED_FIELD),
        (message = 'Required fields incompleted'),
        (statuscode = enum_.CODE_BAD_REQUEST);
    }
    response = await ResponseService(status, errorcode, message, data);
    return res.status(statuscode).send(response);
  } catch (error) {
    console.log('error = ', error);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await ResponseService('Failure', enum_.CRASH_LOGIC, 'error', ''));
  }
};
