import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddMemory from "./AddMemory";
import customAxios from "../../axios/axios-config";

const navigateMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
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
    post: vi.fn(),
  },
}));

describe("AddMemory page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve enviar formulário e redirecionar em caso de sucesso", async () => {
    customAxios.post.mockResolvedValueOnce({
      status: 201,
      data: { msg: "Memória criada com sucesso!" },
    });

    render(<AddMemory />);

    fireEvent.change(screen.getByPlaceholderText("Defina um título"), {
      target: { value: "Minha memória", name: "title" },
    });

    fireEvent.change(screen.getByPlaceholderText("Explique o que aconteceu..."), {
      target: { value: "Descrição da memória", name: "description" },
    });

    const fileInput = screen.getByLabelText("Foto:");
    const file = new File(["conteudo"], "foto.png", { type: "image/png" });

    fireEvent.change(fileInput, {
      target: { files: [file], name: "image" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(customAxios.post).toHaveBeenCalledTimes(1);
    });

    expect(toastSuccessMock).toHaveBeenCalledWith("Memória criada com sucesso!");
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("deve exibir erro ao falhar requisição", async () => {
    customAxios.post.mockRejectedValueOnce({
      response: { data: { msg: "Erro ao criar memória." } },
    });

    render(<AddMemory />);

    fireEvent.submit(screen.getByRole("button", { name: "Enviar" }));

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Erro ao criar memória.");
    });
  });
});
