import { getNewsData } from '../../../lib/news';

export default async (req, res) => {
    const {
        query: {id}
    } = req;
    console.log(id)
    const news = await getNewsData();
    res.statusCode = 200;
    res.json({ news });
}