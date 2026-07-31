import Memory from "../model/Memory.js";
import fs from "fs";

const removeOldImage = (memory) => {
    fs.unlink(`public/${memory.src}`, (error) => {
        if(error) {
            console.log(error);
        } else {
            console.log("Imagem excluída do servidor!");
        }
    });
};

const createMemory = async (req, res) => {
    try {
        const {title, description} = req.body;

        const src = `images/${req.file.filename}`;

        if(!title || !description){
            return res.status(400).json({msg: "Por favor, preencha todos os campos."});
        }

        const newMemory = new Memory({
            title, src, description
        });

        await newMemory.save();

        res.json({ msg: "Memória criada com sucesso!", newMemory });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Ocorreu um erro!");
    }
};

const getMemories = async (req, res) => {
    try {
        const memories = await Memory.find();
        if(memories && Array.isArray(memories) && memories.length > 0) {
            res.json({msg: "Encontradas as memórias.", memories});
        } else {
            res.json({msg: "Memórias não encontradas. Cadastre-as."});
        }
    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
};


const getMemory = async(req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"});
        }
        res.json(memory);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocorreu um erro!");
    }
};

const deleteMemory = async(req, res) => {
    try {
        const memory = await Memory.findByIdAndDelete(req.params.id);
        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"});
        }
        removeOldImage(memory);
        res.json({msg: "Memória excluída."});
    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
};

const updateMemory = async (req, res) => {
    try {
        const { title, description } = req.body;

        let src = null;

        if(req.file) {
            src = `images/${req.file.filename}`;
        }

        const memory = await Memory.findById(req.params.id);
        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"});
        }
        if(src) {
            removeOldImage(memory);
        }
        const updateData = {};

        if(title) updateData.title = title;
        if(description) updateData.description = description;
        if(src) updateData.src = src;

        const updatedMemory = await Memory.findByIdAndUpdate(req.params.id,
            updateData,
            {new: true}
        );

        res.json({msg: "Memória atualizada com sucesso!", updatedMemory});
    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
};

const toggleFavorite = async(req, res) => {
    try {
        const memory = await Memory.findById(req.params.id);
        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"});
        }
     
        memory.favorite = !memory.favorite;

        await memory.save();

        res.json({ msg: "Adicionada aos favoritos.", memory });
    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
};

const addComment = async(req, res) => {
    try {

        const {name, text} = req.body;

        if(!name || !text) {
            return res
            .status(400)
            .json({ mag: "Por favor, preencha todos os campos." });
        };

        const comment = {name, text};

        const memory = await Memory.findById(req.params.id);
        if(!memory) {
            return res.status(404).json({msg: "Memória não encontrada!"});
        }
     
        memory.comments.push(comment);

        await memory.save();

        res.json({ msg: "Comentário adicionado!", memory });
    } catch (error) {
        res.status(500).send("Ocorreu um erro!");
    }
};

export { 
    createMemory, 
    getMemories, 
    getMemory, 
    deleteMemory, 
    updateMemory,
    toggleFavorite,
    addComment,
};