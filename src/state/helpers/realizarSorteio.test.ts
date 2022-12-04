import { realizarSorteio } from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {
    test('cada participante não sorteie o próprio nome', () => {
        const participantes = ['arthur', 'artu', 'arthuro', 'artur', 'arturo', 'arturis']
        const sorteio = realizarSorteio(participantes);
        participantes.forEach((participante) => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    });
});