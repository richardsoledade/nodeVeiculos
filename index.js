const express = require("express");
const server = express();
server.use(express.json());

//array de veiculos
const baseDeAutomoveis = [];

//mostrar dados
server.get("/veiculo", (req, res) => {
  return res.json(baseDeAutomoveis);
});

//mostrar objetos por posição
server.get("/baseDeAutomoveis/:index", (req, res) => {
  const { index } = req.params;
  return res.json(baseDeAutomoveis[index]);
});

//Pegar dado especifico (placa)
server.get("/veiculo/:pesquisa", (req, res) => {
  const { pesquisa } = req.params;
  let listaPesquisada = [];
  baseDeAutomoveis.forEach((carro) => {
    if (
      carro.placa == pesquisa ||
      carro.modelo == pesquisa ||
      carro.marca == pesquisa
    ) {
      listaPesquisada.push(carro);
    }
});
if (listaPesquisada.length > 0) {
    return res.json(listaPesquisada)
} else { 
    return res.json("veiculo não encontrado");
}
  
});

//incremento de veiculo com condição
server.post("/veiculo", (req, res) => {
  const veiculo = req.body;
  let placaDuplicada = false;

  baseDeAutomoveis.forEach((carro) => {
    if (carro.placa === veiculo.placa) {
      placaDuplicada = true;
      return res.status(500).json("Veículo já cadastrado");
    }
  });

  if (!placaDuplicada) baseDeAutomoveis.push(veiculo);
  return res.json(baseDeAutomoveis);
});

// atualizar registro
server.put("/veiculo/:placa", (req, res) => {
  const { placa } = req.params;
  const { modelo, marca } = req.body;

  baseDeAutomoveis.forEach((carro) => {
    if (carro.placa == placa) {
      carro.modelo = modelo;
      carro.marca = marca;
      return res.json(carro);
    }
  });
  return res.json("Veiculo não encontrado");
});

server.delete("/veiculo/:placa", (req, res) => {
  const { placa } = req.params;
    let encontrarPlaca = ""
  baseDeAutomoveis.forEach((carro, index) => {
      if (carro.placa == placa) {
        encontrarPlaca = carro.placa;
      baseDeAutomoveis.splice(index, 1);
    }
});
    
    if (encontrarPlaca != "") {
        return res.json(baseDeAutomoveis)
    } else { 
        return res.json("veiculo não encontrado");
    }
   
});

server.listen(3000, () => {
  console.log("Server ON!");
});
