const express = require('express');
const router = express.Router();

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');


//get all actions for 1 project
router.get('/:project_id', (req, res) => {
	Projects.getProjectActions(req.params.project_id)
		.then(actions => {
			if (actions.length > 0) {
				res.status(200).json({ Results: actions })
			} else {
				res.status(400).json({ Error: "The project with this ID does not exist!", NoId: req.params.project_id })
			}
		}).catch(error => res.status(500).json({ Error: "There was a problem that occured in the server.", error: error }))
})


//get all actions for all of the projects using project_id
router.get('/', (req, res) => {
	Actions.get(req.project_id)
		.then(actions => {
			res.status(200).json({ Results: actions })
		}).catch(error => res.status(500).json({ Error: "There was a problem that occured in the server.", error: error }))
})


// Delete .delete
router.delete("/", (req, res) => {
	// perform a check for this delete request to determine that you have both a project id an an action to delete in the request
	if (!req.body.id || !req.body.project_id) {
		res.status(400).json({ message: "Please provide both a project ID and an action ID with your delete request!" })
	}
	// Perform a check to confirm that there is a project matching this ID to do the delete on.
	Projects.get(req.body.project_id)
		.then(project => {
			if (project) {
				//Peform a check to match the action ID located
				project.actions.forEach(actObj => {
					if (actObj.id === req.body.id) {
						Actions.remove(actObj.id)
							.catch(err => res.status(500).json({ Error: "There was a problem with the server" }))
						res.status(200).json({ Success: actObj, Message: "Action deleted!" })
					}
				});
				// If there is no action with that ID return a 400 error 
				res.status(400).json({ Message: "An action with that ID does not exist!" })
			} else {//if no project is found that matches return a 400
				res.status(400).json({ Message: "A project with this ID does not exist" })
			}

		})
		.catch(error => res.status(500).json({ Error: "There was a problem that occured in the server.", error: error }))
})


module.exports = router