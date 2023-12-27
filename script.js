document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');

    // List of RSS feeds
    const feeds = [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.wired.com/artificial-intelligence/feed/rss/'
        // Add more RSS feed URLs here
    ];

    feeds.forEach(feedUrl => {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
            .then(response => response.json())
            .then(data => {
                displayNews(data, newsContainer);
            })
            .catch(error => console.error('Error fetching RSS feed:', error));
    });
});

function displayNews(data, container) {
    if (data.status !== 'ok') {
        console.error('Error loading news:', data.error);
        return;
    }

    data.items.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const title = document.createElement('div');
        title.className = 'news-title';
        title.textContent = item.title;

        const description = document.createElement('div');
        description.className = 'news-description';
        description.textContent = item.description;

        newsItem.appendChild(title);
        newsItem.appendChild(description);
        container.appendChild(newsItem);
    });
}
