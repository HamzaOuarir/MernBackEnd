const Project = require("../Models/Project");

const fs = require('fs/promises');

const addPro = async(req, res) => {
    try {
        const { NameP, Desc, link } = req.body;

        const Image = req.file.filename;
        // Save the project data to the database
        const project = new Project({
            name: NameP,
            Description: Desc,
            image: Image,
            link: link
        });

        await project.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding project:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const addTool = async(req, res) => {
    try {
        const { NameTol, idPro } = req.body;
        const ImageTol = req.file.filename;;

        // Check if NameTol and ImageTol are not empty
        if (!NameTol || !ImageTol) {
            return res.status(400).json({ success: false, error: 'NameTol and ImageTol are required fields' });
        }

        // Find the project by ID
        const project = await Project.findById(idPro);

        // Add the new tool object to the tools array
        project.tools.push({ name: NameTol, image: ImageTol });

        // Save the updated project document
        await project.save();

        // Respond with success message
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding tool:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const getProjects = async(req, res) => {
    try {
        const projects = await Project.find();
        res.json({ projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};





delPro = async(req, res) => {
    const id = req.params.id;
    try {
        const pro = await Project.findById(id);
        if (!pro) {
            return res.status(404).json({ error: 'Skill not found' });
        }


        const imageFiles = pro.tools.map(tool => tool.image);

        for (const imageFile of imageFiles) {
            if (fs.existsSync(`public/${imageFile}`)) {
                await fs.unlink(`public/${imageFile}`);
            }

        }

        // Delete the image file
        const imagePath = `public/${pro.image}`;
        if (fs.existsSync(imagePath)) {
            await fs.unlink(imagePath);
        }
        await Project.findByIdAndDelete(id);
        res.json({ msg: "Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
}




module.exports = { addPro, getProjects, addTool, delPro };
