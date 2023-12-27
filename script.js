document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more');
    let currentPage = 1;

    const loadNews = () => {
        const rssFeeds = ['https://techcrunch.com/category/artificial-intelligence/feed/', 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', 'https://www.wired.com/feed/tag/ai/latest/rss']; // Replace with actual RSS feed URLs
        const apiKey = 'p81zpao52cbqjkkfvubaqcx0rv0kbdscv2rpjfgq'; // Replace with your RSS2JSON API key
        const requestURL = `https://api.rss2json.com/v1/api.json?rss_url=${rssFeeds[currentPage - 1]}&api_key=${apiKey}`;

        fetch(requestURL)
            .then(response => response.json())
            .then(data => {
                data.items.forEach(item => {
                    const newsItem = document.createElement('div');
                    newsItem.innerHTML = `<a href="${item.link}" target="_blank">${item.title} - ${new Date(item.pubDate).toLocaleDateString()}</a>`;
                    newsContainer.appendChild(newsItem);
                });
            })
            .catch(error => console.error('Error:', error));
    };

    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        loadNews();
    });

    loadNews();
});
