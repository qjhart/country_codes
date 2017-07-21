# Country Codes

The ISO_3166 country codes will be used to 

## Sources

Three tables were extracted from Wikipedia,

 - [ISO_3166-1_alpha-2.csv](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
 - [ISO_3166-1.csv](https://en.wikipedia.org/wiki/ISO_3166-1)
 - [ISO_3166-3.csv](https://en.wikipedia.org/wiki/ISO_3166-3)

## Standard Tabular Form

The standard form for static representation is a single table;

 | name | value | description |
 | --- | --- | --- |
 country_code_id | char(4) | identifier
 alpha-2 | char(2) | alpha-2 version
 alpha-3 | char(3) | alpha-3 version
 numeric | integer | numeric version
 start   | intger  | Year that this became valid
 end     | integer | Year this became inactive
 