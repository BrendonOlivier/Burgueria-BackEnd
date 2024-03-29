// Criando nosso model de Produtos

import Sequelize, { Model } from 'sequelize'


class Product extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            path: Sequelize.STRING,
            offer: Sequelize.BOOLEAN,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3001/product-file/${this.path}`
                }
            }
        },
            {
                sequelize,
            })
        return this
    }

 // Criando uma referência no nosso model, nosso campo category_id é uma chave estrangeira e estamos dando um apelido a ela
    static associate(models) {
        this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category', })
    }
}

export default Product