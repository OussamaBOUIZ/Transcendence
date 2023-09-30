# Pong Game Web Application

![Header Image](app/client/src/Assets/game1.png)



This project comes in as the final big project of the 42 network common core, that consists of a complete web single page application. It serves real-time multiplayer online game, a chat, a dashboard and many more other cool stuff.

The application, in general is developed with typescript, more precisely the backend with NestJS, the client with React Typescript and PostgreSQL for the database. The real-time connection weither on chat or game, was implemented through socket.io. 
Everything is launched through a simple `docker-compose up --build`. 

In the following paragraphs we lay out what both the game and chat are about:

## The Game:
Through the game users are able to play a live Pong game versus another player directly on the website.
The user can join a queue until they get automatically matched with someone else, this is based on a matchmaking system.
The game offers some customization options such as specials like **Hiding the ball, deviating its path and increasing its velocity** and different maps.


## The Chat:
 The user is be able to create channels (chat rooms) that can be either public, or private, or protected by a password. He's able to send direct messages to other users as well.
The chat gives also the possibility to block other users, this way they will see no more messages from the account they blocked.
Someone who has created a new channel is automatically set as the channel owner until they leave it. The channel owner can set a password required to access the channel, change it, and also remove it. He is also a channel administrator, he can set other users as administrators. A user who is an administrator of a channel can kick, ban or mute (for a limited time) other users, but not the channel owners.
Through the chat interface the user is able to invite other users to play a Pong Game. besides accessing other players profiles.


![Header Image](app/client/src/Assets/game0.png)

![Header Image](app/client/src/Assets/game2.png)
