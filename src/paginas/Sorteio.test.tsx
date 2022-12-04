import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hooks/useResultadoSorteio";
import Sorteio from "./Sorteio";

jest.mock("../state/hooks/useListaDeParticipantes", () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock("../state/hooks/useResultadoSorteio", () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe("na página de sorteio", () => {
  const participantes = ["arthur", "artur", "arthuro"];
  const resultado = new Map([
    ["arthur", "arthuro"],
    ["artur", "arthur"],
    ["arthuro", "artur"],
  ]);
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
  });
  test("todos os participantes podem exibir o seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole("option");
    //tamanho do arra + 1 pois vem mais uma option por padrão "selecione o seu nome" 
    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test("o amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText("Selecione o seu nome");
    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });
    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole("alert");
    expect(amigoSecreto).toBeInTheDocument();
  });
});
