/* eslint-disable no-console */
const Mongoose = require('mongoose')
//Mongoose.set('debug', true);
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}
class MongoDB {
    constructor(connection, schema) {
        // 4o
        this._connection = connection;
        this._schema = schema;
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        //await new Promise(resolve => setTimeout(resolve, 4999))

        return STATUS[this._connection.readyState]
    }
    // 1o 
    static async connect() {
        await Mongoose.connect('mongodb://localhost:27017/petshop', {
            family: 4,//ou remove isso e troca localhost por 127.0.0.1 ou adiciona isso no hosts
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })
        const connection = Mongoose.connection
        connection.on('error', console.error.bind(console, 'Error connecting to DB'));

        connection.once('open', () => console.log('connection open!'))

        return connection;
    }

    async checkFistUsage() {
        const _defaults = this._schema.GetDefaultValues()
        if (_defaults.length > 0) {
            const result = await this._schema.insertMany(_defaults)
            let ad = result ? result.length : 1
            return ad
        }
        return 0
    }
    /*
        static ObjectId(id){
            return Mongoose.Types.ObjectId(id)
        }*/
    static ObjectId() {
        return new Mongoose.mongo.ObjectID()
    }

    async lastId() {
        return this._schema.findOne({}, { _id: 1 }).sort({ _id: -1 }).limit(1)

    }

    async count() {
        return this._schema.countDocuments()
    }

    async distinct(collumn) {
        return this._schema.distinct(collumn)
    }


    async aggregate(query) {
        return this._schema.aggregate(query)
    }

    async create(item) {
        try {

            const gotId = await this.lastId();
            let nextId = 0
            if (gotId) {
                nextId = gotId._id;
            }
            else nextId = await this.checkFistUsage();
            nextId++
            item._id = nextId;

            return this._schema.create(item);
        }
        catch (error) {
            console.log('Error: ', error)
        }
    }

    async read(item, skip = 0, limit = 100) {
        const result = this._schema.find(item, this._schema.collumns
            // {_id:1, nome: 1, cpf: 1,autenticacao:1,sexo:1,email:1, rg:1,nascimento:1,obs:1,por:1,fones:1,endereco: 1}
        ).skip(skip).limit(limit)
        return result
    }


    async update(id, item) {
        try {

            return this._schema.updateOne({
                _id: id
            }
                , {
                    $set: item
                })
        } catch(error){
            console.log(error.message)
        }
    }

    async delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}
module.exports = MongoDB