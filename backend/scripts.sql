CREATE TABLE hosts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    project VARCHAR(100),
    ip1 VARCHAR(20),
    ssh_type VARCHAR(20),
    ssh_key TEXT,
    login VARCHAR(100),
    password VARCHAR(100)
);