const WorkExp = require("../Models/WorkExp");


addWX = async(req, res) => {
    try {

        const { CmpName, PostName, Period } = req.body;

        // Save the answers to the database
        const wx = new WorkExp({
            CmpName: CmpName,
            PostName: PostName,
            period: Period,

        });

        await wx.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting answers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

getWXS = async(req, res) => {
    try {
        const wx = await WorkExp.find();
        res.json({ wx });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

delWX = async(req, res) => {
    const id = req.params.id;
    console.log(id)
    try {

        // Delete the image file

        await WorkExp.findByIdAndDelete(id);
        res.json({ msg: "Successfully...!" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete wx' });
    }
    console.log(id)
}


module.exports = { addWX, getWXS, delWX };