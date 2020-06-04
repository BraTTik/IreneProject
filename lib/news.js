import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'


const categories = [
    'popular',
    'tech',
    'hypothesis',
    'interview',
    'telescope'
]
 
const newsDirectory = path.join(process.cwd(), 'assets', 'news');

export function getAllNews(){
    const newsAggregate = categories.reduce( (result, category) => {
        let files = readCategory(category);

        const filePaths = files.map( file => {
            return path.join(newsDirectory, category, file)
        })

        const fileData = getFilesData(filePaths);

        return {
            ...result,
            [category]: [...fileData]
        }
    },{});

    const json =  JSON.stringify({
        news : {
            ...newsAggregate
        }
    })

    return json;
}

export function getMainNews(){
    let mainNewsFile = fs.readdirSync(newsDirectory);
    mainNewsFile = mainNewsFile.filter( file => {
        const match = file.match(/\.md$/);
        if(match){
            return file;
        }
    })
    mainNewsFile = mainNewsFile.map( file => {
        return path.join(newsDirectory, file);
    })
    const fileData = getFilesData(mainNewsFile);
    return JSON.stringify({
        mainNews : {
            ...fileData
        }
    })
}


function readCategory(category){
    const categoryPath = path.join(newsDirectory, category);

    const files = fs.readdirSync(categoryPath);

    return files;
}

function getFilesData(filePaths){
    const files = [...filePaths];
    return files.map( file => {
            
            const id = file.match(/([\w_-]+).md$/)[1];

            const fileContent = fs.readFileSync(file, 'utf8');

            const matterData = matter(fileContent);
            return {
                id,
                ...matterData.data
            }
        });
}


