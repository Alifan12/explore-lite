import Home from "../models/HomeModel.js";

export const getHome = async(req, res) => {
    try {
        const response = await Home.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createHome = async(req, res) => {
    try {
        await Home.create(req.body);
        res.status(201).json({msg: "Home Created!"});
    } catch (error) {
        console.log(error.message);
    }
}