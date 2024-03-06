CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255),
    UserName VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    PhoneNo VARCHAR(15),
    Email VARCHAR(255),
    Address VARCHAR(100),
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

-- For postgres the following 
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Name VARCHAR(255),
    UserName VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    PhoneNo VARCHAR(15),
    Email VARCHAR(255),
    Address VARCHAR(100),
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);
