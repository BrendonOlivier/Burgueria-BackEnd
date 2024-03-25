import { v4 } from 'uuid'
import * as Yup from 'yup'          // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import User from '../models/User'

class UserController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),          // required() = OBRIGATÓRIO o campo
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6), // Alem de obrigatório, tem um minimo de 6 digitos obritorios pra senha
            admin: Yup.boolean(),
        })

        // Aqui iremos mandar um erro, caso tenha algo incorreto no cadastro
        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name, email, password, admin } = request.body

        // Encontrando no banco de dados se tem algum email duplicado
        const userExists = await User.findOne({
            where: { email },
        })

        if(userExists){
            return response.status(400).json({error: 'User already exists'})
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin
        })
        return response.status(201).json({ id: user.id, name, email, admin })
    }
}

export default new UserController()