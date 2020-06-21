class NewsLoader{
    constructor(){
        if(new.target === NewsLoader){
            throw new TypeError('Cannot create abstract class');
        }
        if(this.loadNews === undefined){
            throw new TypeError('loadNews must be overridden');
        }
        if(this.getAllNews === undefined){
            throw new TypeError('getAllNews must be overridden')
        }
        if(this.getNewsById === undefined){
            throw new TypeError('getNewsById must be overridden')
        }
        if(this.getCategoryNews === undefined){
            throw new TypeError('getCategoryNews must be overridden')
        }
        if(this.getSpecialNews === undefined){
            throw new TypeError('getSpecialNews must be overridden')
        }
    }

}

module.exports.NewsLoader = NewsLoader;