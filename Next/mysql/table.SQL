CREATE TABLE Profile(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) ,
    email VARCHAR(100) UNIQUE,
    photo VARCHAR(100),
    phone VARCHAR(100) UNIQUE NOT NULL,
    isAdmin TINYINT(1) DEFAULT 0,
    password VARCHAR(100) NOT NULL
)

CREATE TABLE Address(
    country VARCHAR(100) DEFAULT 'Bangladesh',
    state VARCHAR(100) DEFAULT 0,
    city VARCHAR(100) ,
    postalcode INT(15) DEFAULT 0,
    house VARCHAR(100) DEFAULT 0,

)

CREATE TABLE Products(
    productid INT AUTO_INCREMENT PRIMARY KEY,
    productname VARCHAR(100) ,
    category VARCHAR(100) ,
    description VARCHAR(300),
    brand VARCHAR(100),
    size VARCHAR(100) ,
    stock INT,
    price INT NOT NULL,
    discount INT,
    couponcode VARCHAR(100),
    sold INT,
    location VARCHAR(100) NOT NULL,
    createdat DATETIME DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE productimage(
id INT AUTO_INCREMENT PRIMARY KEY,
productid INT ,
image LONGTEXT,
FOREIGN KEY (productid) REFERENCES Products(productid) ON DELETE CASCADE
)

CREATE TABLE Orders(
orderid INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
user INT,
deliveryLocation VARCHAR(100) NOT NULL,
FOREIGN KEY (user) REFERENCES Profile(id)
)

CREATE TABLE orderedproducts(
    orderid INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
productid  NOT NULL,
product_name VARCHAR(100) NOT NULL,
charge INT ,
quantity INT ,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (productid) REFERENCES Products(productid)
FOREIGN KEY (orderid) REFERENCES Orders(orderid)
)

CREATE TABLE Payment(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
userid INT NOT NULL,
orderid INT NOT NULL,
payment_charge INT NOT NULL,
currency INT NOT NULL,
payment_method VARCHAR(100) NOT NULL,
status VARCHAR ,
paidat DATETIME DEFAULT CURRENT_TIMESTAMP,
transactionid VARCHAR(100) NOT NULL,
deliverytime DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (userid) REFERENCES Profile(id),
FOREIGN KEY (orderid) REFERENCES Orders(orderid)
)