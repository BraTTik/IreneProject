'use strict';

const fs        = require('fs');
const path     = require('path');
const util      = require('util');
const matter    = require('gray-matter');
const remark    = require('remark');
const html      = require('remark-html');
const NewsLoader= require('./NewsLoader');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

class LoadNewsFromFolder extends NewsLoader.NewsLoader{
    constructor(folderPath){
        super();
        this.folder = folderPath;
        this.dirs = [];
    }

    async loadNews(){
        await this.readFolder(this.folder);
        return this.dirs;
    }

    
    async loadFile(filePath){
        const id = filePath.match(/([\w_-]+).md$/)[1];

        const fileContent = await readFile(filePath, 'utf8');
        const matterData = matter(fileContent);

        const processData = await remark()
                    .use(html)
                    .process(matterData.content);
        const htmlContent = processData.toString();

        return {
            id,
            ...matterData.data,
            htmlContent
        }
    }

    async readFolder(folderPath){
        /**
         *Async Reads Folder and sub folders
         * saves it in class prop dirs
         * 
         * this.dir = [
         *      {
         *          dir: 'folder_name',
         *          folderPath: '/path/till/folder/folder_name,
         *          files: [
         *              'file1.md',
         *              'file2.md',
         *              'file3.md'
    *                  ]
         *      },
         *      {
         *          dir: 'folder_name1',
         *          folderPath: '/path/till/folder/folder_name/folder_name1,
         *          files: [
         *              'file1.md',
         *              'file2.md',
         *              'file3.md'
    *                  ]
         *      },
         * ]
         * 
         */
        const folder = folderPath.match(/[\\\/](\w+)$/)[1];
        let folderContents = await readdir(folderPath);

        let files = await Promise.all(folderContents.map( async (item) => {
            const filePath = path.join(folderPath, item);
            if(fs.lstatSync(filePath).isDirectory()){
                await this.readFolder(filePath);
                return;
            }
            return item;
        }))

        files = files.filter( file => file);
 
        this.dirs = [...this.dirs, 
                    { 
                        folder, 
                        folderPath,
                        files
                    }
                ]
    }

    async getAllNews(){
        const {folderPath, files} = this.dirs.find( dir => dir.folder === 'news' );
        const newsContent = await Promise.all( 
            files.map( async (file) => {
                const filePath = path.join(folderPath, file);
                const data = await this.loadFile(filePath);
                return data;
            })
        )

        return newsContent;
    }

    async getNewsById(){

    }

    async getCategoryNews(){

    }

    getSpecialNews(folder){
        const folderFiles = this.dirs.find(dir => dir.folder === folder);
        return folderFiles;
    }
}

module.exports.Loader = LoadNewsFromFolder;