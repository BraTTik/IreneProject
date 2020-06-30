const UserPass = require('./UserPass');
const Storage  = require('./storage/TestStorage');

class User{
    constructor(storage){
        this.storage = new storage();
        this._sessionList = [];
    }

    updateSessionList(user){
        let founded = this._sessionList.find( element => {
            return element.id === user.id;
        })
        if(!founded){
            this._sessionList.push(user);
        }
    }
    
    async sighUp(data){
        const {mail, name, surname, phone} = data;
        const {password, salt} = UserPass.generate(data.password);
        try{
            await this.storage.addUser({mail, name, surname, password, salt, phone});
        }catch(e){
            console.log(e.message);
            throw new Error(e.message);
        } 

        return true;
    }

    async login(data){
        const {mail, password} = data;
        if(!this.storage.isExistsUser(mail)){
            throw Error('User doesn\'t exists');
        }
        const userData = await this.storage.findUser(mail);
        if(UserPass.checkPass(password, userData.salt, userData.password)){
            let authData = await this.authenticate(userData);
            return authData;
        }else{
            throw new Error('Wrong password');
        }
    }

    async authenticate(userData){
        const {id, name, surname, mail, phone} = userData;
        const token = UserPass._getSalt();
        this.updateSessionList({id, token});

        return {
            id,
            name,
            surname,
            mail,
            phone,
            token
        }
    }
}

export function getUserInterface(){
    let user = new User(Storage);

    return user;
}