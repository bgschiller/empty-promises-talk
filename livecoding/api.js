// this file pretends to talk to a server, but really
// just returns values after a fake delay
import { sleep } from './utils';

const user = {
  id: 12,
  username: 'jrrtolkien',
  fullName: 'Jolkien Rolkien Rolkien Tolkien',
};

const token = '12$2737b49252e2a4c0fe4c342e92b13285';

export function login(username, password) {
  return sleep(1000)
    .then(() => {
      if (username === 'jrrtolkien' && password === 'fellowship') {
        return { user, token };
      }
      throw new Error("uh oh, that login info doesn't look right...");
    });
}

export function userInfo(token) {
  return sleep(1000)
    .then(() => {
      if (token === '12$2737b49252e2a4c0fe4c342e92b13285') {
        return { user };
      }
      throw new Error("uh oh, that looks like an invalid token...");
    });
}