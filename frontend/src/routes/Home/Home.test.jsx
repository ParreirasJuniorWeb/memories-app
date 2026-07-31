import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import customAxios from "../../axios/axios-config";

const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("react-toastify", () => ({
  toast: {
    success: (...args) => toastSuccessMock(...args),
    error: (...args) => toastErrorMock(...args),
  },
}));

vi.mock("../../axios/axios-config", () => ({
  default: {
    get: vi.fn(),
    defaults: { baseURL: "http://localhost:3000/" },
  },
}));

describe("Home page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve renderizar memórias retornadas pela API", async () => {
    customAxios.get.mockResolvedValueOnce({
      status: 200,
      data: [
        {
          _id: "1",
          title: "Viagem de férias",
          src: "images/memory.jpg",
        },
      ],
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(customAxios.get).toHaveBeenCalledWith("/memories");
    });

    expect(await screen.findByText("Viagem de férias")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Comentar" })).toHaveAttribute(
      "href",
      "/memories/1"
    );
    expect(toastSuccessMock).toHaveBeenCalled();
  });

  it("deve lidar com erro da API", async () => {
    customAxios.get.mockRejectedValueOnce({
      response: { data: { msg: "Falha ao carregar memórias." } },
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(toastErrorMock).toHaveBeenCalledWith("Falha ao carregar memórias.");
    });
  });
});
