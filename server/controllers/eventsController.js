const Event = require("../models/events");

exports.createEvent = async (req, res) => {
    try {
        
        const { title, date, content } = req.body;

        const titleExists = await Event.findOne({ title });
        if(titleExists) {
            return res.status(400).json({ message: "Title already exists" });
        }

        const event = await Event.create({ title, date, content });
     return  res.status(201).json({ message: "Created!", event });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getEvents = async (req, res) =>{
    try{

        const events = await Event.find()
        if(!events) return res.json({ message : "No events!"})
      return res.json({ events })
    } catch(error){
        console.error(error)

    }

}

exports.deleteEvent = async (req, res) =>{
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if(!event) {
            return res.status(404).json({ message: "Event not found" });
        }        

        await Event.findByIdAndDelete(id);
        
        return res.json({ message: "Deleted!", deletedEventId: event._id })
       
    } catch (error) {
        console.error(error)
    }
}

    exports.updateEvent = async (req, res) =>{
    try {
        const { id } = req.params;
        const { title, content, date } = req.body;
        const event = await Event.findByIdAndUpdate(id, { title, content, date }, { new: true, runValidators: true });
      return res.json({ message : "updated!", event });
    } catch (error) {
        return res.json({message : "Server error"})
    }
}
