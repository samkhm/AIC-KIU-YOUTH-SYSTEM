const Announcement = require("../models/announcements");

exports.createAnnouncement = async (req, res) => {
    try {

        const { data } = req.body;

        const titleExists = await Announcement.findOne({ data });
        if (titleExists) {
            return res.status(400).json({ message: "Announcement exists!" });
        }

        const announcement = await Announcement.create({ data });
        return res.status(201).json({ message: "Created data!", announcement });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAnnouncements = async (req, res) => {
    try {

        const announcements = await Announcement.find()
        return res.json({ announcements })
    } catch (error) {
        console.error(error)

    }

}


exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        const delAnn = await Announcement.findByIdAndDelete(id);

        return res.status(201).json({ delAnnId: delAnn._id })


    } catch (error) {
        console.error(error)
    }
}

exports.updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const announcement = await Announcement.findByIdAndUpdate(id, { data }, { new: true, runValidators: true });
        return res.json({ message: "Updated succssfully", announcement });
    } catch (error) {
        console.error(error)
    }
}
