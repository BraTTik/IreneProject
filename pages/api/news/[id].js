import {getNewsById} from '../../../lib/news';

export default async (req, res) => {
    const {
        query: {id}
    } = req;
    const news = await getNewsById(id);
    res.statusCode = 200;
    res.json({ news });
}
