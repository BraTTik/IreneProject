const path = require('path');
const NewsLoader = require('./news_loader/NewsLoader');
const Loader = require('./news_loader/LoadNewsFromFolder');


const newsDirectory = path.join(process.cwd(), 'assets', 'news');

let newsLoader = Loader.Loader;
let loader = new newsLoader(newsDirectory);

class NewsDeliver{
    constructor(loader){
        this.abstractLoader = NewsLoader.NewsLoader;
        if(!(loader instanceof this.abstractLoader)){
            throw new TypeError(`loader must derive class NewsLoader`);
        }
        this.newsList = [];
        this.loader = loader;
    }

    async init(){
        await loader.loadNews();
        let newsList = await this.loader.getAllNews();
        newsList = newsList.sort( (a, b) => {
            if(a.date < b.date){
                return 1
            }
            return -1;
        })
        this.newsList = newsList;
    }
    async getAllNews(){
        const allNews = await this.loader.getAllNews();
        return allNews;
    }

    getCategoryNews(category){
        const filtered = this.newsList.filter( news => {
            return news.category.toLowerCase() === category.toLowerCase();
        })
        return filtered;
    }

    async getSpecialNews(special){
        const {folderPath, files} = this.loader.getSpecialNews(special);
        let specialNews = files.map( file => {
            return this.newsList.find( news =>`${news.id}.md` === file)
        });
        /* проверяем были ли загружены новости при инициализации,
            если нет загружаем и добавляем к this.newsList
        */
        if(specialNews.filter(a=>a).length === 0){
            specialNews = await Promise.all(
                files.map(async (file) => {
                    const filePath = path.join(folderPath, file)
                    const data = await this.loader.loadFile(filePath);
                    return data;
                })
            )

            this.newsList = [
                ...this.newsList,
                ...specialNews
            ]
        }
        /** */
        return specialNews;
    }

}

export async function callNewsDeliver(){
    const deliveryBoy = new NewsDeliver(loader);
    await deliveryBoy.init();
    return deliveryBoy;
}

