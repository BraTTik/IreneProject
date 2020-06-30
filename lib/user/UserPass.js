const crypto = require('crypto');

class UserPass{
    constructor(){
        if(new.target === UserPass){
            throw new TypeError('Cannot get an instance of UserPass');
        }
    }

    static generate(password){
        const salt = this._getSalt();
        const pass = this._getPassHash(password);
        const hash = this._getHash(pass, salt);
        return {
            password: hash,
            salt
        }
    }   

    static checkPass(pass, salt, hash){
        const passHash = this._getPassHash(pass);
        const checkHash = this._getHash(passHash, salt);
        return checkHash === hash;
    }

    static _getHash(pass, salt){
        const hash = crypto.createHash('sha256');
        const hashed = hash.update(salt+pass+salt+pass);

        return hashed.digest('hex');
    }

    static _getPassHash(password){
        const hash = crypto.createHash('sha256');
        const hashed = hash.update(password);
        return  hashed.digest('hex');
    }

    static _getSalt(){
        const hash = crypto.createHash('sha256');
        let salt = Math.random()+'';
        const hashed = hash.update(salt);
        return hashed.digest('hex');
    }
}

module.exports = UserPass;