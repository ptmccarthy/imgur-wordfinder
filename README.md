# imgur URL Word Finder
This is a dumb script that takes 5 or 7 letter words and tries to find imgur images that have some upper/lower case permutation of that word as the ID of the image.

For example, to find images with URLs that contain the word `"useless"`, you would run `node imgur-wordfinder.js useless` and it will try to find images that exist at `imgur.com/useless`, `imgur.com/UseLESs`, `imgur.com/usElEss`, etc.

Use at your own risk! Don't blame me if imgur blocks your IP for making too many requests in a short period of time!
