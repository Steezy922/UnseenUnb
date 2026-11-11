# Adding a game

1. Put the game's HTML file in this folder.
2. Put its thumbnail in `../img/thumbnails/`.
3. Add one entry to the `games` list near the top of `../../src/app.js`:

   ```js
   { title: "Game Name", file: "Game Name.html", thumbnail: "GameName.jpg" }
   ```

The `file` and `thumbnail` values must match the filenames exactly. Thumbnail formats supported by the browser include JPG and PNG. Games are shown automatically in the Games section.
