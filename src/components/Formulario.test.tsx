import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";

test("quando o input está vazio, novos participantes não podem ser adicionados", () => {
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  );
  const input = screen.getByPlaceholderText(
    "Insira os nomes dos participantes"
  );

  const botao = screen.getByRole("button");

  expect(input).toBeInTheDocument();
  expect(botao).toBeDisabled();
});

test("adicionar um participante caso exista um nome preenchido", () => {
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  );
  const input = screen.getByPlaceholderText(
    "Insira os nomes dos participantes"
  );

  const botao = screen.getByRole("button");
  //inserir valor no input
  fireEvent.change(input, {
    target: {
      value: "Arthur Silva",
    },
  });
  //clicar no botão para submeter
  fireEvent.click(botao);
  //garantir que o input esteja com o foco ativo
  expect(input).toHaveFocus();
  //garantir que o input não tenha um valor
  expect(input).toHaveValue("");
});

test("Nomes duplicados não podem ser adicionados na lista", () => {
  render(
    <RecoilRoot>
      <Formulario />
    </RecoilRoot>
  );
  const input = screen.getByPlaceholderText(
    "Insira os nomes dos participantes"
  );

  const botao = screen.getByRole("button");
  //inserir valor no input
  fireEvent.change(input, {
    target: {
      value: "Arthur Silva",
    },
  });
  //clicar no botão para submeter
  fireEvent.click(botao);
  const mensagemDeErro = screen.getByRole("alert");
  expect(mensagemDeErro.textContent).toBe(
    "Nomes duplicados não são permitidos!"
  );
});