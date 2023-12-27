document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const loadMoreButton = document.getElementById('load-more');
    let currentPage = 0;

    const feeds = [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.wired.com/artificial-intelligence/feed/rss/'
        // Add more RSS feed URLs here
    ];

    function loadFeeds() {
        feeds.forEach(feedUrl => {
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&page=${currentPage}`)
                .then(response => response.json())
                .then(data => {
                    displayNews(data, newsContainer);
                })
                .catch(error => console.error('Error fetching RSS feed:', error));
        });
    }

    loadMoreButton.addEventListener('click', () => {
        currentPage++;
        loadFeeds();
    });

    loadFeeds();
});

function displayNews(data, container) {
    if (data.status !== 'ok') {
        console.error('Error loading news:', data.error);
        return;
    }

    data.items.forEach(item => {
        const newsItem = document.createElement('a');
        newsItem.className = 'news-item';
        newsItem.href = item.link;
        newsItem.target = '_blank';

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = item.title;

        const date = document.createElement('div');
        date.className = 'news-date';
        date.textContent = new Date(item.pubDate).toLocaleDateString();

        newsItem.appendChild(title);
        newsItem.appendChild(date);
        container.appendChild(newsItem);
    });
}
