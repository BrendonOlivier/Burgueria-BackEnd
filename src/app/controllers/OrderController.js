
import * as Yup from 'yup'          // Estou pegando tudo ( * ) que da biblioteca yup e chamando de ' Yup '
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'

class OrderController {
    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array().required().of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required()
                })
            ),          // required() = OBRIGATÓRIO o campo
        })

        console.log(request)
        // Aqui iremos mandar um erro, caso tenha algo incorreto no cadastro
        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const productsId = request.body.products.map(product => product.id)

        const orderProducts = await Product.findAll({
            where: {
                id: productsId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ]
        })

        const editedProduct = orderProducts.map(product => {

            const productIndex = request.body.products.findIndex(requestProduct => requestProduct.id === product.id)

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: request.body.products[productIndex].quantity,
            }
            return newProduct
        })

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: editedProduct,
            status: 'Pedido realizado'
        }

        const orderResponse = await Order.create(order)

        return response.status(201).json(orderResponse)
    }
}

export default new OrderController()