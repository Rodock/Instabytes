import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postscontroller.js";
import cors from "cors";

const corsOptions = { 
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage});
// linus ou mac necessitam somente do codigo abaixo
//const upload = multer({ dest: "./uploads"})
const routes = (app) => {
    app.use(express.json());
    // Habilita o middleware para analisar o corpo das requisições JSON, permitindo que a aplicação receba dados em formato JSON.
    app.use(cors(corsOptions))
    app.get("/posts", listarPosts);
    //Rota para buscar todos os posts
    app.post("/posts", postarNovoPost)
    //Rota para criar um Post
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;
