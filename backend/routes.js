import express from "express";
const router = express.Router();

import upload from "./helpers/upload.js";

import { 
    createMemory, 
    getMemories, 
    getMemory,
    deleteMemory,
    updateMemory,
    toggleFavorite,
    addComment,
} from "./Controllers/MemoryController.js";

router.post("/", upload.single("image"), 
(req, res, next) => {
    const image = req.file;
    if(!image) {
        return res.status(400).json({ msg: "Por favor, envie um arquivo." });
    }
    next();
}, 
(req, res) => createMemory(req, res));

router.get("/", (req, res) => getMemories(req, res));

router.get("/:id", (req, res) => getMemory(req, res));

router.delete("/:id", (req, res) => deleteMemory(req, res));

router.patch("/:id", upload.single("image"), (req, res) => updateMemory(req, res));

router.patch("/favorite/:id", (req, res) => toggleFavorite(req, res));

router.patch("/:id/comment", (req, res) => addComment(req, res));

export default router;