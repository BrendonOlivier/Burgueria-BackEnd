import { Router } from 'express' // Estamos pegando só o " Router " dentro do express
import multer from 'multer'
import multerConfig from './config/multer'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'

import authMiddleware from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store )

routes.post('/sessions', SessionController.store )

routes.use(authMiddleware) // Será chamado por todas as rotas ABAIXO

routes.post('/products', upload.single('file'), ProductController.store )
routes.get('/products',  ProductController.index )

routes.post('/categories', CategoryController.store )
routes.get('/categories',  CategoryController.index )

export default routes
