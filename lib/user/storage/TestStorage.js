const Storage = require('./Storage');
const path = require('path');
const fs = require('fs');
const util = require('util');
const crypto = require('crypto');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class TestStorage extends Storage{
    constructor(){
        super();
        //this._store = path.join(process.cwd(), 'storage', 'user_store');
        this._store = path.join(process.cwd(), 'lib', 'user', 'storage', 'user_store');
    }

    getStore(){
        return this._store;
    }

    async findUser(mail){
        if(!this.isExistsUser(mail)){
            throw Error('User doesn\'t exists');
        }
        const id = this.getMailHash(mail);
        const filePath = path.join(this.getStore(), id+'.json');
        const json = await readFile(filePath, 'utf8');
        const userData = JSON.parse(json);
        return {
            id,
            ...userData
        };
    }

    async addUser(data){
        const {name, surname, mail, password, salt, phone} = data;
        const id = this.getMailHash(mail);
        const fileName = id+'.json';
        const filePath = path.join(this.getStore(), fileName);
        const jsonData = JSON.stringify({
            name,
            surname,
            mail,
            password,
            salt,
            phone
        });
        if(this.isExistsUser(mail)){
            throw new Error('User exists already');
        }
        await writeFile(filePath, jsonData);

        return true;
    }

    isExistsUser(mail){
        const id = this.getMailHash(mail);
        const fileName = id+'.json';
        const filePath = path.join(this.getStore(), fileName);
        return fs.existsSync(filePath);
    }

    getMailHash(mail){
        const hash = crypto.createHash('sha256');
        const hashedMail = hash.update(mail);
        return hashedMail.digest('hex');
    }
}

module.exports = TestStorage;