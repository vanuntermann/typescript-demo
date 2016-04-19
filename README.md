# typescript-demo

* Por qué usar TS / Sistemas de tipado 101:
    - Cada vez más cosas importantes implementadas en JavaScript
        + Hola, mi nombre es "[object Object]" y mi edad es "NaN"
        + Infinitos problemas vs. Menos infinitos problemas
    - Desactivar type checking a gusto
    - Pros/Cons de escribir en JavaScript vs. compilar a JavaScript
    - "Rapid prototyping": El primer día vs. Durante el proyecto
	- 3rd party libs. TSD / Typings	
* El type system:
	- Aliases
    - Tuplas
    - Uniones e intersecciones  
    - Generics:
        + Parametricidad light
        + Pro/Cons de subtyping
    - Construcción segura (ejemplo con Validación de algo):
		+ Class vs interface vs alias
        + Con excepciones (a.k.a Just Fail)
        + Sin excepciones (explotando el type system)
* Functions
	- Arrow Function (igual que ES6, pero aclarar la diferencia con function)
* Módulos y namespaces
    - Basados en ES6 (post)
* OO (overview de OO en general. por ej. classical OO, self's prototypal OO, etc. Smalltalk no. [Cook](http://wcook.blogspot.com.ar/2012/07/proposal-for-simplified-modern.html)): 
    - Clases
    - Decorators
    - Subclassing / Subtyping
* Práctica
    - El compilador. Opciones:
        + `--noImplicitAny`
    - Ejemplo configuración webpack
    - Ejemplo debugging, y source maps

* Comentarios:
    - Límites del type system:
        + Inferencia: funciona bien con código trivial (por ej. código que no usa generics ni unions)
        + Efectos
        + Higher ranks (ejemplo de ramda? lodash?)

	