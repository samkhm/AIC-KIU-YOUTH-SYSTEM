const Project = require("../models/projects");
const path = require("path")
const fs = require("fs")
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose")

exports.createProject = async (req, res) => {
  try {
    const { title, content, amount, startDate, endDate } = req.body;

    if (!title || !content || !amount || !startDate || !endDate) {
      return res.status(400).json({ message: "All details required" });
    }

    const projectExists = await Project.findOne({ title });
    if (projectExists) {
      return res.status(400).json({ message: "Project already exists" });
    }

    // ✅ Only set image fields if a file is uploaded
    const projectData = {
      title,
      content,
      amount,
      startDate,
      endDate,
    };
    
    if (req.file) {
      projectData.image = req.file.path;           // Cloudinary URL or local path
      projectData.imagePublicId = req.file.filename; // Cloudinary public_id
    }

    const project = await Project.create(projectData);

    return res.status(201).json({ message: "Created!", project });
  } catch (error) {
    console.error("Create project error:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};


exports.completeProject = async (req, res) =>{
  
  try{

    const compProject = await Project.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed},
      { new: true}
    );
    
    return res.json({ message : "Completed!", project: compProject })

  } catch (error){
    return res.status(500).json({ message: "Internal server error!" })
    
  }
}



exports.getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
    return res.json({ projects })
  } catch (error) {

    return res.status(500).json({ message: "Server error!" })

  }

}


exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const { title, content, startDate, endDate } = req.body || {}

    if (!title || !content || !startDate || !endDate) {
      return res.status(400).json({ message: "All details required" })
    }

    const existingProject = await Project.findById(id)
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" })
    }

    const updateData = { title, content, startDate, endDate }

    // ✅ If a new image was uploaded, Multer already sent it to Cloudinary
    if (req.file) {
      // delete old image from cloudinary if you have public id
      if (existingProject.imagePublicId) {
        await cloudinary.uploader.destroy(existingProject.imagePublicId)
      }

      updateData.image = req.file.path
      updateData.imagePublicId = req.file.filename
    }

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })

    return res.json({ message: "Updated!", project })
  } catch (error) {
    console.error("Update project error:", error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}


exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params

    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ message: "Project not found" })
    }

    // ✅ Delete image from Cloudinary if it exists
    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId)
    }

    // ✅ Delete project from DB
    await Project.findByIdAndDelete(id)

    return res.status(200).json({ message: "Project deleted successfully", deleteProjectID: project._id })
  } catch (error) {
    console.error("Delete project error:", error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}


// GET /tasks/getProjectRemAmount/:projectId
exports.getProjectRemainingAmount = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project id" });
  }

  const project = await Project.findById(projectId).select("amount remainingAmount");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  // Ensure remainingAmount is never undefined
  const remainingAmount = project.remainingAmount ?? project.amount;

  return res.status(200).json({
    amount: project.amount,
    remainingAmount
  });
};


