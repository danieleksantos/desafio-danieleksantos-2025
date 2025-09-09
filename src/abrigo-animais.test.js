import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'CAIXA,NOVELO', 'RATO,BOLA', 'Bola,Fofo');
    expect(resultado.lista[0]).toBe('Bola - pessoa 1');
    expect(resultado.lista[1]).toBe('Fofo - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

    expect(resultado.lista[0]).toBe('Bola - abrigo');
    expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
    expect(resultado.lista[2]).toBe('Mimi - abrigo');
    expect(resultado.lista[3]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve limitar a adoção a 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER',
      'SKATE,NOVELO,LASER',
      'Mimi,Bola,Zero,Fofo,Rex'
    );

    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.lista).toContain('Bola - pessoa 1');
    expect(resultado.lista).toContain('Zero - pessoa 1');
    expect(resultado.lista).toContain('Fofo - abrigo');
    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista.length).toBe(5);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER,BOLA', 'LASER,LASER,LASER', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo que não existe', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER', 'SKATE,NOVELO,PIPA', 'Rex,Fofo');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve retornar para o abrigo se ambas as pessoas forem aptas', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'RATO,LASER,BOLA',
      'Rex'
    );

    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve impedir adoção de animal que use o mesmo brinquedo de gato, pois gato não divide brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER,RATO',
      'LASER,SKATE,NOVELO',
      'Mimi,Rex'
    );

    expect(resultado.lista).toContain('Mimi - pessoa 1');
    expect(resultado.lista).toContain('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco deve ser adotado se tiver outro animal como companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE,CAIXA,NOVELO',
      'BOLA,NOVELO,CAIXA',
      'Bola,Loco'
    );
    expect(resultado.lista).toContain('Bola - pessoa 1');
    expect(resultado.lista).toContain('Loco - pessoa 1');
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test('Loco deve retornar para o abrigo se estiver sem companhia', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,SKATE',
      'BOLA,NOVELO',
      'Loco'
    );

    expect(resultado.lista).toContain('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
    expect(resultado.erro).toBeFalsy();
  });
});
