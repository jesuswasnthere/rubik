# Cubo Rubik 3D

Cubo de Rubik 3×3 interactivo en el navegador, renderizado en 3D con React Three Fiber. Se puede girar la cámara, aplicar movimientos con botones o teclado, mezclar el cubo y medir el tiempo de resolución.

## Funcionalidades

- **Cubo 3D** con 27 piezas, iluminación y entorno (`Environment` de drei).
- **Cámara orbital:** arrastrar para rotar la vista (`OrbitControls`).
- **Movimientos** U, D, L, R, F, B y sus inversos (prima), con botones en pantalla y teclado.
- **Mezclar:** 20 giros aleatorios; el cronómetro arranca al mezclar.
- **Reiniciar** al estado resuelto.
- **Contador de movimientos** y **cronómetro**.
- **Detección de cubo resuelto:** el cronómetro se detiene al resolverlo.
- Colores estándar: amarillo arriba, blanco abajo, verde al frente, azul atrás, naranja a la derecha y rojo a la izquierda.

## Controles de teclado

| Tecla | Movimiento | Tecla | Movimiento |
|---|---|---|---|
| `Q` | U | `A` | U' |
| `W` | D | `S` | D' |
| `E` | L | `D` | L' |
| `R` | R | `F` | R' |
| `T` | F | `G` | F' |
| `Y` | B | `H` | B' |

## Stack

React · Vite · Three.js · @react-three/fiber · @react-three/drei · React Router.

## Estructura

```
src/
├── main.jsx                 # Entrada (Vite + BrowserRouter)
├── App.jsx                  # Navegación y rutas: /, /about, /me
├── components/
│   ├── CuboRubik.jsx        # Escena 3D, HUD, botones y atajos de teclado
│   └── Cubito.jsx           # Una pieza del cubo
├── hooks/useCubeLogic.js    # Estado del cubo, giros, mezcla, cronómetro, detección de resuelto
└── utils/cubeMath.js        # Rotación de posiciones y caras
```

## Instalación

```bash
npm install
npm run dev        # servidor de desarrollo (Vite)
npm run build      # build de producción en ./dist
npm run preview    # previsualizar el build
```

## Pendiente técnico

- [ ] Quitar restos de Create React App (`App.test.js`, `setupTests.js`, `reportWebVitals.js`, `logo.svg`, dependencias de `@testing-library`, `GENERATE_SOURCEMAP` en `.env`).
- [ ] Completar o quitar las páginas `/about` y `/me` (hoy están vacías).
- [ ] Actualizar `public/manifest.json` y el título de `index.html`.
- [ ] Animar los giros de cara (hoy son instantáneos).

## Hoja de ruta (monetización)

- Solver y tutorial paso a paso (método para principiantes y CFOP).
- Historial de tiempos con estadísticas (mejor tiempo, promedio de 5 y de 12).
- Ranking online y retos diarios con la misma mezcla para todos.
- PWA instalable y versión móvil con gestos táctiles.
- Modelo freemium: funciones avanzadas o temas de cubo de pago, o anuncios.

---

Desarrollado por **Jesús Mariño** · [Stackvro](https://github.com/jesuswasnthere/stackvro)
