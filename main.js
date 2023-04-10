// APIキーを設定
const API_KEY = 'AIzaSyDfFr3mb1R0EhvZ8MfbvYH4jC7QWh8658A';

// エンドポイントURLを設定
const ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search';
const searchBox = document.getElementById('search-box');
const results = document.getElementById('results');

searchBox.addEventListener('change', (event) => {
    const query = event.target.value;

    // APIリクエストを作成
    const request = `${ENDPOINT_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`;

    // APIリクエストを送信
    fetch(request)
        .then(response => response.json())
        .then(data => {
            const items = data.items;
            renderResults(items);
        });
});
function renderResults(items) {
    results.innerHTML = '';

    items.forEach(item => {
        // 動画タイトルと説明を取得
        const title = item.snippet.title;
        const description = item.snippet.description;

        // 動画IDを取得
        const videoId = item.id.videoId;

        // 動画サムネイルのURLを取得
        const thumbnailUrl = item.snippet.thumbnails.medium.url;

        // 動画のダウンロードリンクを作成
        const downloadLink = `<a href="https://www.youtube.com/watch?v=${videoId}&feature=youtu.be" download>${title}</a>`;

        // HTMLを作成
        const html = `
      <div>
        <img src="${thumbnailUrl}">
        <div>
          <h2>${downloadLink}</h2>
          <p>${description}</p>
        </div>
      </div>
      <iframe width="642" height="361" src="https://www.youtube.com/embed/${videoId}" title="${title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    `;

        results.insertAdjacentHTML('beforeend', html);
    });
}
