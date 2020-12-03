# News Explorer (Back End)

This repository contains a part of API of "News Explorer" project.

Link to the website that hosts API:
http://news-explorer.students.nomoreparties.site/api
https://news-explorer.students.nomoreparties.site/api

## Routes

* creates a user with the passed email, password, and name in the body
`POST /signup`

* checks the email and password passed in the body and returns a JWT
`POST /signin`

* returns information about the logged-in user (email and name)
`GET /users/me`

* returns all articles saved by the user
`GET /articles`

* creates an article with the passed keyword, title, text, date, source, link, and image in the body
`POST /articles`

* deletes the stored article by _id
`DELETE /articles/articleId`

