import { atom } from 'recoil';

export  default authTokenState = atom({
    key: 'authTokenState',
    default: null, // Initial value of the authentication token
});
