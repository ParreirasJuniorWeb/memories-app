import request from "supertest";
import { jest } from "@jest/globals";
import fs from "fs";

const mockMemoryModel = {
  save: jest.fn(),
};

const mockMemoryConstructor = jest.fn(() => mockMemoryModel);
mockMemoryConstructor.find = jest.fn();
mockMemoryConstructor.findById = jest.fn();
mockMemoryConstructor.findByIdAndDelete = jest.fn();
mockMemoryConstructor.findByIdAndUpdate = jest.fn();

await jest.unstable_mockModule("../db/conn.js", () => ({
  connect: jest.fn(),
}));

await jest.unstable_mockModule("../model/Memory.js", () => ({
  __esModule: true,
  default: mockMemoryConstructor,
}));

await jest.unstable_mockModule("../helpers/upload.js", () => ({
  __esModule: true,
  default: {
    single: () => (req, _res, next) => {
      if (!req.file && req.headers["x-test-file"]) {
        req.file = { filename: req.headers["x-test-file"] };
      }
      next();
    },
  },
}));

const { app } = await import("../app.js");
const { default: Memory } = await import("../model/Memory.js");

describe("Memory routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(fs, "unlink")
      .mockImplementation((_path, callback) => callback(null));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /memories", () => {
    it("deve retornar lista de memórias", async () => {
      Memory.find.mockResolvedValueOnce([
        {
          _id: "1",
          title: "Viagem",
          src: "images/a.jpg",
          description: "Praia",
        },
      ]);

      const res = await request(app).get("/memories");

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Encontradas as memórias.");
      expect(res.body.memories).toHaveLength(1);
      expect(Memory.find).toHaveBeenCalledTimes(1);
    });

    it("deve retornar mensagem quando não houver memórias", async () => {
      Memory.find.mockResolvedValueOnce([]);

      const res = await request(app).get("/memories");

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Memórias não encontradas. Cadastre-as.");
    });
  });

  describe("GET /memories/:id", () => {
    it("deve retornar memória quando existir", async () => {
      Memory.findById.mockResolvedValueOnce({
        _id: "abc123",
        title: "Memória existente",
        src: "images/existente.jpg",
        description: "Descrição existente",
      });

      const res = await request(app).get("/memories/abc123");

      expect(res.status).toBe(200);
      expect(res.body._id).toBe("abc123");
      expect(res.body.title).toBe("Memória existente");
    });

    it("deve retornar 404 quando memória não existir", async () => {
      Memory.findById.mockResolvedValueOnce(null);

      const res = await request(app).get("/memories/abc123");

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Memória não encontrada!");
    });

    it("deve retornar 500 quando houver erro interno", async () => {
      Memory.findById.mockRejectedValueOnce(new Error("Falha no banco"));

      const res = await request(app).get("/memories/abc123");

      expect(res.status).toBe(500);
      expect(res.text).toBe("Ocorreu um erro!");
    });
  });

  describe("POST /memories", () => {
    it("deve validar ausência de arquivo", async () => {
      const res = await request(app)
        .post("/memories")
        .field("title", "Teste")
        .field("description", "Descrição");

      expect(res.status).toBe(400);
      expect(res.body.msg).toBe("Por favor, envie um arquivo.");
    });

    it("deve criar memória com sucesso", async () => {
      mockMemoryModel.save.mockResolvedValueOnce(undefined);

      const res = await request(app)
        .post("/memories")
        .set("x-test-file", "foto.jpg")
        .send({
          title: "Novo título",
          description: "Nova descrição",
        });

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Memória criada com sucesso!");
      expect(Memory).toHaveBeenCalledWith({
        title: "Novo título",
        src: "images/foto.jpg",
        description: "Nova descrição",
      });
      expect(mockMemoryModel.save).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /memories/:id", () => {
    it("deve excluir memória com sucesso", async () => {
      Memory.findByIdAndDelete.mockResolvedValueOnce({
        _id: "1",
        src: "images/foto-antiga.jpg",
      });

      const res = await request(app).delete("/memories/1");

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Memória excluída.");
      expect(Memory.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(fs.unlink).toHaveBeenCalled();
    });

    it("deve retornar 404 ao excluir memória inexistente", async () => {
      Memory.findByIdAndDelete.mockResolvedValueOnce(null);

      const res = await request(app).delete("/memories/inexistente");

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Memória não encontrada!");
    });

    it("deve retornar 500 em erro de exclusão", async () => {
      Memory.findByIdAndDelete.mockRejectedValueOnce(
        new Error("Erro de delete"),
      );

      const res = await request(app).delete("/memories/1");

      expect(res.status).toBe(500);
      expect(res.text).toBe("Ocorreu um erro!");
    });
  });

  describe("PATCH /memories/:id", () => {
    it("deve atualizar memória sem imagem", async () => {
      Memory.findById.mockResolvedValueOnce({
        _id: "1",
        src: "images/antiga.jpg",
      });

      Memory.findByIdAndUpdate.mockResolvedValueOnce({
        _id: "1",
        title: "Título editado",
        description: "Descrição editada",
        src: "images/antiga.jpg",
      });

      const res = await request(app)
        .patch("/memories/1")
        .send({ title: "Título editado", description: "Descrição editada" });

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Memória atualizada com sucesso!");
      expect(Memory.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        { title: "Título editado", description: "Descrição editada" },
        { new: true },
      );
    });

    it("deve atualizar memória com nova imagem", async () => {
      Memory.findById.mockResolvedValueOnce({
        _id: "1",
        src: "images/antiga.jpg",
      });

      Memory.findByIdAndUpdate.mockResolvedValueOnce({
        _id: "1",
        title: "Título com imagem",
        description: "Descrição com imagem",
        src: "images/nova.jpg",
      });

      const res = await request(app)
        .patch("/memories/1")
        .set("x-test-file", "nova.jpg")
        .send({
          title: "Título com imagem",
          description: "Descrição com imagem",
        });

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Memória atualizada com sucesso!");
      expect(Memory.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        {
          title: "Título com imagem",
          description: "Descrição com imagem",
          src: "images/nova.jpg",
        },
        { new: true },
      );
      expect(fs.unlink).toHaveBeenCalled();
    });

    it("deve retornar 404 ao atualizar memória inexistente", async () => {
      Memory.findById.mockResolvedValueOnce(null);

      const res = await request(app)
        .patch("/memories/inexistente")
        .send({ title: "Novo título" });

      expect(res.status).toBe(404);
      expect(res.body.msg).toBe("Memória não encontrada!");
    });

    it("deve retornar 500 em erro de atualização", async () => {
      Memory.findById.mockRejectedValueOnce(new Error("Erro de update"));

      const res = await request(app)
        .patch("/memories/1")
        .send({ title: "Novo título" });

      expect(res.status).toBe(500);
      expect(res.text).toBe("Ocorreu um erro!");
    });
  });

  describe("PATCH /memories/favorite/:id", () => {
    it("deve alternar favorito com sucesso", async () => {
      const save = jest.fn().mockResolvedValueOnce(undefined);
      Memory.findById.mockResolvedValueOnce({
        _id: "1",
        favorite: false,
        save,
      });

      const res = await request(app).patch("/memories/favorite/1");

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Adicionada aos favoritos.");
      expect(save).toHaveBeenCalledTimes(1);
    });
  });

  describe("PATCH /memories/:id/comment", () => {
    it("deve validar payload obrigatório", async () => {
      const res = await request(app)
        .patch("/memories/1/comment")
        .send({ name: "", text: "" });

      expect(res.status).toBe(400);
    });

    it("deve adicionar comentário", async () => {
      const save = jest.fn().mockResolvedValueOnce(undefined);
      const memoryDoc = {
        _id: "1",
        comments: [],
        save,
      };
      Memory.findById.mockResolvedValueOnce(memoryDoc);

      const res = await request(app)
        .patch("/memories/1/comment")
        .send({ name: "João", text: "Excelente memória!" });

      expect(res.status).toBe(200);
      expect(res.body.msg).toBe("Comentário adicionado!");
      expect(memoryDoc.comments).toHaveLength(1);
      expect(save).toHaveBeenCalledTimes(1);
    });
  });
});
