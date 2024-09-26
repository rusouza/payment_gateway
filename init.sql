-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS pedido_compra;

-- Usar o banco de dados
USE pedido_compra;

CREATE TABLE IF NOT EXISTS checkouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_cliente varchar(255),
  status VARCHAR(50),
  valorTotal DECIMAL(10, 2),
);

CREATE TABLE IF NOT EXISTS checkout_itens (
  checkout_id INT,
  itens varchar(255),
  FOREIGN KEY (checkout_id) REFERENCES checkouts(id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    checkoutId INT,
    valorTotal DECIMAL(10, 2),
    status VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (checkoutId) REFERENCES checkouts(id)
);