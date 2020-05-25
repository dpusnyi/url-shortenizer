# test-url-shorteners

1. in root directory run

- `npm install`
- `cp .env.example .env`

2. in your `.env` file (if necessary, example.env has default options) configure

- MONGO_URL - connection to your mongoDB in .env
- APP_PREFIX - your server address to create valid short URLs to redirect
- URL_EXPIRY - link expiry time in seconds
- APP_PORT - app port

3. `npm start` or `sudo npm start` if running on port 80

### Endpoints:

- `POST` `/mappings` - create new short URL - JSON with valid long URL i.e. `{"longURL": "http://google.com/abcdefg"}`

- `GET` `/:shortURL` - redirects user to long URL if link is not expired
