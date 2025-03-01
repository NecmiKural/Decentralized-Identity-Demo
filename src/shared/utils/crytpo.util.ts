import * as crypto from 'crypto';

export class CryptoUtil {
  static generateKeyPair() {
    // Generate my key for signature
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    return { publicKey, privateKey };
  }

  static signData(data: any, privateKey: string): string {
    const sign = crypto.createSign('SHA256');
    sign.update(JSON.stringify(data));
    return sign.sign(privateKey, 'base64');
  }

  static verifySignature(
    data: any,
    signature: string,
    publicKey: string,
  ): boolean {
    const verify = crypto.createVerify('SHA256');
    verify.update(JSON.stringify(data));
    return verify.verify(publicKey, signature, 'base64');
  }
}
