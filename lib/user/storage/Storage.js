
class Storage{
    constructor(){
        if(new.target === Storage){
            throw new TypeError('Storage can\'t be constructed');
        }
        if(this.findUser === undefined){
            throw new TypeError('Method "findUser" must be implemented');
        }
        if(this.addUser === undefined){
            throw new TypeError('Method "addUser" must be implemented')
        }
    }
}

module.exports = Storage;