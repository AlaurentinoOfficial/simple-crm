import { StoreSchema } from '../models/store'
import { Strings } from '../config/strings'
import { UserSchema } from '../models/user'

exports.getAll = (req, res) => {
    StoreSchema.find({solution: res.locals.user.solution}, (err, stores) => {
        if(err || !stores) {
            var r = Stringd.INTERNAL_ERROR
            r.products = []

            return res.json({status: true, value: r})
        }
        
        UserSchema.find({}, (err, users) => {
            if(err || !users)
                return res.json({status: true, value: stores})
            
            var ss = []
            
            users.forEach(u => {
                stores.forEach(s => {
                    s = s._doc

                    if(u.stores.indexOf(s._id) >= 0) {
                        if(s.employees === undefined) s["employees"] = []
                        s.employees.push(u._id)
                    }

                    ss.push(s)
                })
            })

            var r = Strings.SUCCEFULY
            r.products = ss

            res.json({status: true, value: r})
        })
    })
}

exports.getById = (req, res) => {
    StoreSchema.findOne({solution: res.locals.user.solution, _id: req.params}, (err, store) => {
        if(err || !store)
            return res.json({status: true, value: Strings.INVALID_STORE})
        
        var r = Strings.SUCCEFULY
        r.product = store

        res.json({status: true, value: r})
    })
}

exports.addNew = (req, res) => {
    var body = {name: req.body.name, address: req.body.address, solution: res.locals.user.solution}
        
    StoreSchema.create(body, (err, stores) => {
        if(err || !stores)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.putById = (req, res) => {
    StoreSchema.findOneAndUpdate({_id: req.params.id, solution: res.locals.user.solution},req.body, {upsert: true}, (err, products) => {
        if(err || !products)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
        
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}

exports.deleteById = (req, res) => {
    StoreSchema.remove({_id: req.params.id, solution: res.locals.user.solution}, (err, docs) => {
        if(err)
            return res.json({status: false, value: Strings.INVALID_PARAMS})
    
        res.json({status: true, value: Strings.SUCCEFULY})
    })
}