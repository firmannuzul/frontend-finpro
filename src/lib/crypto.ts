import CryptoJS from "crypto-js";

export const encrypt = (value: string) => {
  return CryptoJS.AES.encrypt(
    value,
    process.env.CRYPTO_SECRET as string
  ).toString();
};