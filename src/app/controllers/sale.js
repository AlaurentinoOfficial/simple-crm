import {SolutionSchema} from '../models/solution';
import {StoreSchema} from '../models/store';
import {SaleSchema} from '../models/sale';
import {ProductSchema} from '../models/product';
import { GetCode } from '../config/Codes';

exports.get = (req, res) => {
    StoreSchema.findOne({_id: req.params.store}, (err, store) => {
        if(err) return res.json(GetCode('INVALID_PARAMS'))

        SaleSchema.find({store: store}, (err, sales) => {
            if(err)
                return res.json([])
            
            res.json(sales)
        })
    })
}

exports.post = (req, res) => {
    if(!req.body.client || !req.body.products)
        return res.json(GetCode('INVALID_PARAMS'))

    StoreSchema.findOne({_id: req.params.store}, (err, store) => {
        if(err || !store) return res.json(GetCode('INVALID_PARAMS'))

        req.body.store = store
        SaleSchema.new(req.body, (er, sale) => {
            if(er || !sale)
                return res.json(err)
            
            res.json(GetCode('SUCCEFULY'))
        })
    })
}