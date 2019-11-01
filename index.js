/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, you might want to read it really slow, don't worry be happy
in every line there may be trouble, but if you worry you make it double, don't worry, be happy
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, be happy
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, be happy

Go code!
*/

//utilize express by using require
const express = require('express');
const server = express();

//import created routes
const ProjectRoutes = require('./routes/projectRoutes');
const ActionsRoutes = require('./routes/actionsRoutes');

//allow the server to parse out JSON
server.use(express.json());

//Specify which routes will utilize which set of predefined routing 
server.use('/api/actions', ActionsRoutes);
server.use('/api/projects', ProjectRoutes);

//set port to be listened on
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`This is your port of entry: ${port}`))