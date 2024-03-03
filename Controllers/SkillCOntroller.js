const Skill = require("../Models/Skill");

const fs = require('fs/promises');

addSkill = async(req, res) => {
    try {
        const { name } = req.body;

        const image = req.file.filename;

        // Save the answers to the database
        const skill = new Skill({
            name: name,
            image: image,
        });

        await skill.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

getSkills = async(req, res) => {
    try {
        const skills = await Skill.find();
        res.json({ skills });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

delSK = async(req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findById(id);
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }

    
const imagePath = `public/${skill.image}`;
        if(fs.existsSync(imagePath)){
        await fs.unlink(imagePath);
}

        await Skill.findByIdAndDelete(id);
        res.json({ msg: "Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete skill' });
    }

}

module.exports = { addSkill, getSkills, delSK };
