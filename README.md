**RF** => Requisitos Funcionais 

**RNF** => Requisitos não Funcionais

**RN** => Regras de Negócios

# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa ja existente.
Não deve ser possível alterar a placa de um carro ja cadastrado.
O Carro deve ser cadastrado com disponibilidade por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
O usuário não precisar estar autenticado no sistema.

# Cadastro de Especificação no Carro

**RF**

Deve ser possível cadastrar uma especificação para um carro

Deve ser possível listrar todas as especificações

Deve ser possível listar todos os carros

**RN**

Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.

O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**

Deve ser possível cadastrar a imagem do carro

Deve ser possível listar todos os carros

**RNF**

Utilizar o multer para upload dos arquivos

**RN**

O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro

**RF**

Deve ser possível cadastrar um Aluguel

**RN**
O aluguel deve ser duração minima de 24 horas.

Não deve ser possível cadastrar um novo aluguel caso ja existe um aberto para o mesmo usuário.

Não deve ser possível cadastrar um novo aluguel caso ja existe um aberto para o mesmo carro.

O Usuário deve estar logado na aplicação

Ao realizar um aluguel, o status do carro devera ser alterado para indisponível.

# Devolução de Carro

**RF**
Deve ser possível realizar a devolução de um carro

**RN**
Se o carro for devolvido com menos de 24 horas, devera ser cobrado a diaria completa.
Ao realizar a devolução, o carro devera ser liberado para outro aluguel.
Ao realizar a devolução, o usuário devera ser liberado para outro aluguel.
Ao realizar a devolução, devera ser calculado o total do aluguel.
Caso horário de devolução seja superior ao horário previsto de entrega, devera ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, devera  ser somado ao total do aluguel.

# Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
O usuário deve estar logado na aplicação
