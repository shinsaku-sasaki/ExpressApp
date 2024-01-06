CREATE TABLE drinks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT UNSIGNED NOT NULL,
    temperature TINYINT(1) NOT NULL -- 1:あったかい 0:つめたい
);

INSERT INTO drinks (name, price, temperature)
VALUES 
    ('コーヒー', 250, 1),
    ('アイスティー', 200, 0),
    ('ホットチョコレート', 300, 1),
    ('レモネード', 180, 0),
    ('紅茶', 220, 1),
    ('オレンジジュース', 150, 0),
    ('緑茶', 200, 1),
    ('アイスコーヒー', 230, 0),
    ('カフェラテ', 280, 1),
    ('アイスカフェラテ', 260, 0);
