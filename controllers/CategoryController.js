import Category from "../models/CategoriesModel.js";
import User from "../models/UserModel.js";
import { Op, where } from "sequelize";

export const getCategory = async(req, res) => {
    try {
        let response;
        if(req.role === "admin") {
            response = await Category.findAll({
                attributes:['uuid', 'name', 'image', 'description'],
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            })
        } else {
            response = await Category.findAll({
                attributes:['uuid', 'name', 'image', 'description'],
                where: {
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCategoryById = async(req, res) => {
    try {
        const category = await Category.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!category) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin") {
            response = await Category.findAll({
                attributes:['uuid', 'name', 'image', 'description'],
                where:{
                    id: category.id
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            })
        } else {
            response = await Category.findOne({
                attributes:['uuid', 'name', 'image', 'description'],
                where: {
                    [Op.and]:[{id: category.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name', 'email']
                }]
            })
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCategory = async(req, res) => {
    const { name, image, description } = req.body;
    try {
        await Category.create({
            name: name,
            image: image,
            description:description,
            userId: req.userId,
        });
        res.status(200).json({msg: "Category created successfully!"});
    } catch (error) {
        res.status(500).json({msg: "error.message"});
    }
}

export const updateCategory = async(req, res) => {
    try {
        const category = await Category.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!category) return res.status(404).json({msg: "Data tidak ditemukan"});
        const { name, image, description } = req.body;
        if(req.role === "admin") {
            await Category.update({name, image, description}, {
                where:{
                    id: category.id
                }
            })
        } else {
            if(req.userId !== category.id) return res.status(403).json({msg: "Akses terlarang"});
            await Category.update({name, image, description}, {
                where: {
                    [Op.and]:[{id: category.id}, {userId: req.userId}]
                },
            })
        }
        res.status(200).json({msg: "Category updated successfully!"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteCategory = (req, res) => {

}