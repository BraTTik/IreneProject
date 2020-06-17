import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import util from 'util';
import {translateCategory} from './helpers';

/* const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const remark = require('remark');
const html = require('remark-html'); */

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);


/* const categories = [
    'popular',
    'tech',
    'hypothesis',
    'interview',
    'telescope',
    'news'
] */
 
const newsDirectory = path.join(process.cwd(), 'assets', 'news');
const digitsDirectory = path.join(process.cwd(), 'assets', 'digits');
//const newsDirectory = path.join(process.cwd(), '..', 'assets', 'news');

 export async function getNewsData(){
    const dirContent = fs.readdirSync(newsDirectory);
    const files = dirContent.filter( file => {
        const filePath = path.join(newsDirectory, file);
        if(fs.lstatSync(filePath).isFile()){
            return file;
        }
    })
    const filesData = await Promise.all(files.map( async (file) => {
        const filePath = path.join(newsDirectory, file);

        const fileData = await getFileData(filePath);
        const content = await getNewsContent(fileData.id);
        const result = {
            ...fileData,
            content
        }
        return{
            ...fileData,
            content
        }
    }))

     return filesData.sort( (a, b) => {
        if(a.date > b.date){
            return -1;
        }else{
            return 1;
        }
    }) 
}

export async function getNewsInDirectory(dir){
    const dirPath = path.join(newsDirectory, dir);
    const dirContents = await readdir(dirPath);

    const files = dirContents.filter( item => {
        const itemPath = path.join(dirPath, item);
        if(fs.existsSync(itemPath) && fs.lstatSync(itemPath).isFile()){
            return item;
        }
    })

    const result = Promise.all( 
        files.map( async (file) => {
            const filePath = path.join(dirPath, file);

            const fileData = await getFileData(filePath);

            return {
                ...fileData
            }
        })
    )

    return result;
}

export async function getCategoryNews(category){
    const allNews = await getNewsData();
    let translatedCategory = translateCategory(category);

    const categoryNews = allNews.filter( news => {
        return news.category === translatedCategory;
    })

    return categoryNews;
}

export async function getNewsById(id){
    const fileName = `${id}.md`;
    const filePath = path.join(newsDirectory, fileName);

    const fileData = await getFileData(filePath);
    const content = await getNewsContent(id);


    return {...fileData, ...content};
}


export async function getSpaceDigits(){
    //путь до папки с цифрами
    try{
        const files = await readdir(digitsDirectory);

        const filesContents = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(digitsDirectory, file);

                const fileData = await readFile(filePath, 'utf8');

                const matterData = matter(fileData);

                return{
                    ...matterData.data
                }
            })
        )

        return {
            spaceDigits: [...filesContents]
        }
    }catch(error){
        console.log(error);
    }

}

async function getFileData(filePath){
    const id = filePath.match(/([\w_-]+).md$/)[1];

    const fileContent = await readFile(filePath, 'utf8');

    const matterData = matter(fileContent);
    const result = {
        id,
        ...matterData.data,
    }

   return result;
}

export async function getNewsContent(file){
    const filePath = path.join(newsDirectory, `${file}.md`);
    const fileData = await readFile(filePath, 'utf8');

    const matterData = matter(fileData);

    const processData = await remark()
                        .use(html)
                        .process(matterData.content);
    const htmlContent = processData.toString();
    return {
        htmlContent
    }
}


