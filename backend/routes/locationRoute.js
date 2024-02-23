import express from "express";
import { Location } from "../models/locationModel.js";

const router = express.Router();

//Route for add location
router.post('/',async(req,res)=>{
    try {
        if(
            !req.body.location||
            !req.body.coordinate
        ){
            return res.status(400).send({
                message: 'Send all required fields: Location and Coordinate'
            })
        }
        const newLoc ={
            location: req.body.location,
            coordinate: req.body.coordinate
        }
        const item = await Location.create(newLoc);
        return res.status(201).send(item);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

//Route to get all location
router.get('/',async(req,res)=>{
    try {
        const locations = await Location.find({});
        return res.status(200).json({
            count: locations.length,
            data: locations
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route to get location by id
router.get('/:id',async(req,res)=>{

    try {
        const {id} = req.params
        const loc = await Location.findById(id);
        return res.status(200).json(loc)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route to update a location
router.put('/:id',async(req,res)=>{

    try {
        if(
            !req.body.location||
            !req.body.coordinate
        ){
            return res.status(400).send({
                message: 'Send all required fields: Location and Coordinate'
            })
        }
        const {id} = req.params
        const result = await Location.findByIdAndUpdate(id,req.body);
        if(!result){
            return res.status(404).json({message: 'Location not found'});
        }
        return res.status(200).send({message: 'Location update successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

//Route to delete location by id
router.delete(' /:id',async(req,res)=>{

    try {
        const {id} = req.params
        const result = await Location.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: 'Location not found'});
        }
        return res.status(200).send({message: 'Location deleted successfully'})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message})
    }
})

export default router;