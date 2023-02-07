# Basic Calculator
## Gramtica libre de contexto
E ->  E %
	| E + E
	| E - E
	| E * E
	| E / E
	| (E)
	| int
## Gramatica LL(1)
- E -> TE'
- E' -> %TE' | +TE' | -TE' | ε
- T -> FT'
- T' -> *FT' | /FT' | ε
- F -> (E) | int

## Tabla de analisis sintactico

|   | int | ( 	| ) | +   | -  | *   | /   | %   |$|
|---|-----|-----|---|-----|----|-----|-----|-----|-|
| E | TE' | TE'	|   | TE' | TE'| TE' | TE' | TE' | |
| E'|     |   	| ε | +TE'|-TE'|     |     | %TE'|ε|
| T | FT' | FT'	|   |     |    |     |     |     | |
| T'|     |   	| ε |     |    | *FT'| /FT'|     |ε|
| F | int | (E)	|   |     |    |     |     |     | |