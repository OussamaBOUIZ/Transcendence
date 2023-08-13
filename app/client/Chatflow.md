# Routing to Chat Init pages:
Both `<ChatDmInit />` and `<ChatRooomsInit />` will be 
routed through /chat/init /chat/rooms/init
or /chat/dminit /chat/roomsinit
the routes just above should be rendering `<ChatDmMain />` and 
`<ChatRoomsMain />` 
Based on the userflow the Init components are render either
when the user has no activity yet or when he wants to initiate 
a new activity; by activity i mean both conversation on dm and 
rooms.
So the first scenario will surely happen at the first time the user
creates an account in the application. Therefore we will
be examining this state for the logged user and if it's the case
will be redirecting them to init components using the `<Navigate />` 
element. For the second scenario we will provide the user with
a call to action at the top left corner from which we could access
those init components.
