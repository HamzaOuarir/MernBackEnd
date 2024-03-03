const CertDep = require("../Models/CertDep");

const fs = require('fs/promises');
addDep = async(req, res) => {
    try {
        const { NameDp, titleDp, dateDp } = req.body;
        const imgDep = req.file.filename
            // Save the answers to the database
        const certDep = new CertDep({
            name: NameDp,
            title: titleDp,
            image: imgDep,
            date: dateDp
        });
        await certDep.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

getDeps = async(req, res) => {
    try {
        const certDep = await CertDep.find();
        res.json({ certDep });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

delDep = async(req, res) => {
    const id = req.params.id;
    try {
        const dp = await CertDep.findById(id);
        if (!dp) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        // Delete the image file
        const imagePath = `public/${dp.image}`;
        if (fs.existsSync(imagePath)) {
            await fs.unlink(imagePath);
        }




        await CertDep.findByIdAndDelete(id);
        res.json({ msg: "Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete skill' });
    }

}

module.exports = { addDep, getDeps, delDep };
