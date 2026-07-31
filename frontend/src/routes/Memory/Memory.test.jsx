import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Memory from "./Memory";
import customAxios from "../../axios/axios-config";

const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

vi.mock("react-toastify", () => ({
  toast: {
    success: (...args) => toastSuccessMock(...args),
    error: (...args) => toastErrorMock(...args),
  },
}));

vi.mock("../../axios/axios-config", () => ({
  default: {
    get: vi.fn(),
    patch: vi.fn(),
    defaults: { baseURL: "http://localhost:3000/" },
  },
}));

describe("Memory page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar e renderizar memória com comentários", async () => {
    customAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        _id: "1",
        title: "Título teste",
        description: "Descrição teste",
        src: "images/item.jpg",
        comments: [{ _id: "c1", name: "Ana", text: "Muito legal!" }],
      },
    });

    render(<Memory />);

    expect(await screen.findByText("Título teste")).toBeInTheDocument();
    expect(screen.getByText("Descrição teste")).toBeInTheDocument();
    expect(screen.getByText("Comentários (1)")).toBeInTheDocument();
    expect(screen.getByText("Muito legal!")).toBeInTheDocument();
  });

  it("deve enviar novo comentário", async () => {
    customAxios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        _id: "1",
        title: "Título teste",
        description: "Descrição teste",
        src: "images/item.jpg",
        comments: [],
      },
    });

    customAxios.patch.mockResolvedValueOnce({
      status: 200,
      data: {
        msg: "Comentário adicionado!",
        memory: {
          comments: [{ _id: "c2", name: "João", text: "Parabéns!" }],
        },
      },
    });

    render(<Memory />);

    await screen.findByText("Título teste");

    fireEvent.change(screen.getByPlaceholderText("Seu nome"), {
      target: { value: "João" },
    });

    fireEvent.change(screen.getByPlaceholderText("Seu comentário"), {
      target: { value: "Parabéns!" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(customAxios.patch).toHaveBeenCalledWith("/memories/1/comment/", {
        name: "João",
        text: "Parabéns!",
      });
    });

    expect(toastSuccessMock).toHaveBeenCalledWith("Comentário adicionado!");
  });

  it("deve exibir erro ao falhar carregamento", async () => {
    customAxios.get.mockRejectedValueOnce({
      res: { data: { msg: "Erro ao carregar memória." } },
    });

    render(<Memory />);

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalled();
    });
  });
});
