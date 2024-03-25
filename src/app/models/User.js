// Criando nosso model de Usuario

import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'             // Biblioteca de criptografar 

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,    // Esse campo por ser virtual, não vai pro banco de dados
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        }, {
            sequelize,
        })

        // Antes de salvar o dado no banco, cria pra mim uma criptgrafia
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 10)
            }
        })
        return this
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}

export default User