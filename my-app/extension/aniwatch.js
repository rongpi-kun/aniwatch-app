const cheerio = require('react-native-cheerio')

const url = "https://hianime.to/tv"

async function fetchFlwItem() {
   const resp = await fetch(url);
   const webpage = await resp.text()

   const $ = cheerio.load(webpage);
   let flw_item = []

   $(`.flw-item`).each((index, element) => {
      const filmName = $(element).find('.film-name a').text();
      const imgSrc = $(element).find('.film-poster img').attr('data-src');
      const href = $(element).find('.film-name a').attr('href');

      flw_item.push({
         url: imgSrc,
         name: filmName,
         link: href
      })
   });

   // console.log('animelist: ', top_anime)
   return flw_item;
}

async function fetchTopWatch(day) {
   const resp = await fetch(url);
   const webpage = await resp.text()

   let id = 'day'
   if (day == 1) {
      id = 'week'
   } else if (day == 2) {
      id = 'month'
   }
   
   const $ = cheerio.load(webpage);
   let top_anime = []

   $(`#top-viewed-${id} li`).each((index, element) => {
      const filmNumber = $(element).find('.film-number span').text();
      const filmName = $(element).find('.film-name a').text();
      const imgSrc = $(element).find('.film-poster img').attr('data-src');
      const href = $(element).find('.film-name a').attr('href');

      top_anime.push({
         url: imgSrc,
         rank: filmNumber,
         name: filmName,
         link: href
      })
   });

   // console.log('animelist: ', top_anime)
   return top_anime;
}

module.exports = {
   fetchTopWatch,
   fetchFlwItem,
}

