// Criando a conexão do nosso Model com o Banco de Dados

import Sequelize from 'sequelize'

import Product from '../app/models/Product'
import User from '../app/models/User'
import Category from '../app/models/Category'

import configDataBase from '../config/database'


const models = [User, Product, Category]

class Database {
    constructor() {
        this.init()
    }

    // Quando a aplicação inicia, precisamos dizer que existe conexões e relacionamentos antes da aplicação iniciar

    init() {
        this.connection = new Sequelize(configDataBase)
        models.map(model => model.init(this.connection)).map(
            (model) => model.associate && model.associate(this.connection.models))
    }
}

export default new Database()