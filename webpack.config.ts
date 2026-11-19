import path from"path"
import webpack from "webpack"
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPaths } from "./config/build/types/config";



export default (env:BuildEnv)=>{
  const paths:BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  build: path.resolve(__dirname, "build") ,
  html:path.resolve(__dirname, "public", "index.html")  ,
}


const mode = env.mode ||  "development"
const isDev = mode === "development"
const PORT = env.port || 3000

const config: webpack.Configuration  = buildWebpackConfig({
  mode,
  paths, 
  isDev,
  port:PORT
})
  return config
}

//** npm start
//    ↓
//**webpack CLI читает webpack.config.ts
//    ↓
// webpack.config.ts вызывает buildWebpackConfig(...)
//    ├── buildWebpackConfig.ts собирает общую конфигурацию
//    ├── buildLoaders.ts возвращает правила обработки файлов
//    ├── buildResolvers.ts возвращает правила поиска модулей
//    └── buildPlugins.ts подключает плагины
//    ↓
// Webpack начинает с src/index.ts
//    ↓
// src/index.ts импортирует src/test.ts
//    ↓
// Webpack собирает связанные файлы в бандл
// webpack.config.ts — входная точка сборки. А src/index.ts — входная точка приложения. Это разные роли: первый файл настраивает инструмент, второй содержит код приложения.