const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors())

// const mongoose = require('mongoose');
// const mongoString = "mongodb+srv://aicds2022:2zyQxaHf@cluster0.dbp476t.mongodb.net/database"
const mongoose = require('mongoose');
const mongoString = "mongodb+srv://aicds2022:2zyQxaHf@cluster0.dbp476t.mongodb.net/database"
// const mongoString = "mongodb+srv://othmannsk:oSIMDTo46huabHB1@cluster0.efb5zro.mongodb.net/BookStoreDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('open', () => console.log('Database connected'))

// Lab 3 Required Schemas
const User = require('./models/Users');
const Project = require('./models/Projects');
const Team = require('./models/TeamName');
const TeamRoster = require('./models/TeamRoster');
const UserStory = require('./models/UserStory');
const Assigned = require('./models/Assigned');
const TaskList = require('./models/TaskList');

// ------------------
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {

    try {
        const user = await User.find();
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
app.get('/getUser/:username', async (req, res) => {

    try {
        const username = req.params.username;
        // console.log(username)
        const user = await User.find({ username: username });
        // console.log(user)
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createTeams', async (req, res) => {
    try {
        const team = new Team(req.body);
        await team.save();
        res.send(team);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getTeams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.send(teams)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/createProjects', async (req, res) => {
    try {
        const { projectName, projectDescription, productOwner, manager, team } = req.body;
        const productOwnerExists = await User.exists({ _id: productOwner });
        const managerExists = await User.exists({ _id: manager });
        const teamExists = await Team.exists({ _id: team });

        if (!productOwnerExists || !managerExists || !teamExists) {
            return res.status(400).send(error);;
        }

        const project = new Project({ projectName, projectDescription, productOwner, manager, team });
        await project.save();
        res.send(project)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('productOwner', 'firstName lastName')
            .populate('manager', 'firstName lastName')
            .populate('team', 'teamName');

        res.send(projects)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/addTeamMember', async (req, res) => {
    try {
        const { teamName, members } = req.body;

        if (!teamName || !members || !Array.isArray(members)) {
            return res.status(400).json({ success: false, message: 'Invalid request data.' });
        }

        let teamMember = await TeamRoster.findOne({ teamName: teamName });

        if (!teamMember) {
            teamMember = new TeamRoster({ teamName: teamName, members: [] });
        }

        teamMember.members = [...new Set([...teamMember.members, ...members])];

        await teamMember.save();

        res.status(200).json({ success: true, message: 'Members added/updated in the team successfully.' });
    } catch (error) {
        console.error('Error updating team members:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.get('/getTeamMember', async (req, res) => {
    try {
        const teams = await TeamRoster.find()
            .populate('teamName', 'teamName')
            .populate('members', 'firstName lastName');

        res.send(teams)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/removeTeamMember', async (req, res) => {
    try {
        const { teamName, members } = req.body;

        if (!teamName || !members || !Array.isArray(members)) {
            return res.status(400).json({ success: false, message: 'Invalid request data.' });
        }

        const teamMember = await TeamRoster.findById(teamName);

        if (!teamMember) {
            return res.status(404).json({ success: false, message: 'TeamMember not found.' });
        }

        teamMember.members = teamMember.members.filter(member => !members.includes(member.toString()));


        await teamMember.save();

        res.status(200).json({ success: true, message: 'Members removed from the team successfully.' });
    } catch (error) {
        console.error('Error removing members from the team:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});




app.get('/getUserStory/:projectId', async (req, res) => {
    try {
        const projectId = req.params.projectId;


        const userStories = await UserStory.find({ projects: projectId })
            .populate('projects', 'projectName');


        if (!userStories) {
            return res.status(404).json({ success: false, message: 'No user stories found for the project.' });
        }

        res.status(200).json({ success: true, userStories });
    } catch (error) {
        console.error('Error fetching user stories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.delete('/removeUserStory/:storyId', async (req, res) => {
    try {
        const storyId = req.params.storyId;

        const userStory = await UserStory.findByIdAndRemove(storyId).exec();

        if (!userStory) {
            return res.status(404).json({ success: false, message: 'User story not found.' });
        }

        res.status(200).json({ success: true, message: 'User story deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user story:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.post('/createUserStory', async (req, res) => {
    try {
        const { userStory, projects, priority } = req.body;
        const projectExists = await Project.exists({ _id: projects });

        if (!projectExists) {
            return res.status(400).send(error);;
        }

        const project = new UserStory({ userStory, projects, priority, assignedTo: null });
        await project.save();
        res.send(project)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/unassignedUserStories', async (req, res) => {
    try {
        const unassignedUserStories = await UserStory.find({ assignedTo: null });

        res.status(200).json(unassignedUserStories);
    } catch (error) {
        console.error('Error fetching unassigned user stories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.post('/assignUserStories', async (req, res) => {
    try {
        const { userStoryId, assignedTo } = req.body.teamData;

        const userStory = await UserStory.findById(userStoryId);

        if (!userStory) {
            return res.status(404).json({ success: false, message: 'User story not found.' });
        }
        userStory.assignedTo = assignedTo;

        await userStory.save();

        const assigned = new Assigned({ userStory: userStoryId, assignedTo: assignedTo });

        await assigned.save();

        res.status(200).json({ success: true, message: 'User story assigned successfully.' });
    } catch (error) {
        console.error('Error assigning user story:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.get('/assignedUserStories', async (req, res) => {
    try {
        const assignedUserStories = await Assigned.find()
            .populate('userStory', 'userStory')
            .populate('assignedTo', 'firstName lastName');;

        res.status(200).json(assignedUserStories);
    } catch (error) {
        console.error('Error fetching unassigned user stories:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.post('/createtask', async (req, res) => {
    const project = new TaskList(req.body);
    await project.save();
    res.send(project)
});

app.get('/viewtasks', async (req, res) => {
    try {
        const teams = await TaskList.find();
        res.send(teams)
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/updatetask', async (req, res) => {
    try {
        const { taskId, newStatus } = req.body;
        const task = await TaskList.findById(taskId);

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found.' });
        }
        task.status = newStatus;

        await task.save();

        res.status(200).json({ success: true, message: 'Task status updated successfully.' });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


app.get('/userProjects/:userId', async (req, res) => {
    const userId = req.params.userId;

    const userprojects = await Project.find({ productOwner: userId })
        .populate('productOwner', 'firstName lastName');

    res.send(userprojects)
});


app.listen(5000, () => {
    console.log(`server started at ${5000}`)
})

