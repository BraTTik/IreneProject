// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {getNewsById} from '../../lib/news';

export default (req, res) => {
  const news = getNewsById('beautifull_fly_over_mars');
  console.log(news)
  res.statusCode = 200;
  res.json({ news });
}
