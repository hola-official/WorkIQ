import Fingerprint2 from 'fingerprintjs2';

console.log("first")
export const getFingerprint = () => {
  return new Promise((resolve) => {
    Fingerprint2.get((components) => {
      const values = components.map(component => component.value);
      const fingerprint = Fingerprint2.x64hash128(values.join(''), 31);
      console.log(values)
      console.log(fingerprint)
      resolve(fingerprint);
    });
  });
};