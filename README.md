# Battle Blog
A microblogging site, except its all fantasy characters

## Features
- Users can create and manage several characters, through which they post.
- Posts automatically generate relevancy links based on frequently used words. These links are generated
  every time the post is opened, so its always linking to the most closely associated.

## Frontend:
- In app authorization, after logging in, is 100% based on the characters, rather than just being logged in. Currently forces users to select a character before being able to view the feed page.
- Fully hand-done CSS using flexbox and CSS grid. Designed around the idea of the deconstruction of a book with a spine, pages, and a cover.

## Backend:
- On post submission, if valid, the post content parsed out for the most used words after removing the stopwords.
- When loading a post, the most relevant posts are queried from the database using those key words, where the found posts most used word becomes the first link(s), second link(s) are based on second most used word, so on and so forth. This ensures the most recent and relevant posts are always linked first everyt time the post is loaded. This is done with iterative querying (always 5 queries) that create a list of relevant posts that are then sorted for duplicates after all relevant posts are found.

 ## Database Schema
 https://dbdiagram.io/d/5fa06b563a78976d7b7a32cb
