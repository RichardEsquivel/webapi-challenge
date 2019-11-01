const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel.js')

//CRUD, Create, Read, Update, Delete functionality for endpoints to the database

//Read .get
router.get('/', (req, res) => {
	Projects.get()
		.then(projects => {
			res.status(200).json({ Results: projects })
		}).catch(error => res.status(500).json({ Error: "There was a problem that occured in the server.", error: error }))
})

//Create .post 
router.post('/', (req, res) => {
	Projects.insert(req.body)
		.then(newProject => {
			console.log(newProject)
			return res.status(201).json({ Response: newProject })
		}).catch(err => res.status(500).json({ Message: "Error creating Project!", err: err }))
});

//Update .put 
router.put('/', (req, res) => {

	Projects.update(req.body.id, req.body)
		.then((update) => {
			return res.status(200).json({ Success: "The project was updated correctly!", Created: update })
		})
		.catch(err => res.status(500).json({ Message: "The server was unable to update the project.", Error: err }))
});

//Delete .delete 
router.delete('/', (req, res) => {
	const projectID = req.body.id
	Projects.get(projectID)
		.then((project) => {
			if (project) {
				Project.remove(projectID)
				return res.status(200).json({ Success: "That project was successfully deleted!", Removed: project })
			} else {
				res.status(404).json({ message: "The project with that ID does not exist!" })
			}
		})
		.catch(err => res.status(500).json({ Error: "The database was unable to delete the project." }))
});


module.exports = router;