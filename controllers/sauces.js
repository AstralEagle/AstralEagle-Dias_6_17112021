const fs = require('fs');

const Sauce = require('../object/Sauce');


exports.getSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
exports.getSaucesById = (req, res) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        console.log(req.body);
        res.status(200).json(sauce)
    })
    .catch(error => res.status(404).json({ error }));
};
exports.creatSauce = (req, res) => {
    const values = JSON.parse(req.body.sauce);
    delete values._id;
    console.log(values);
    if( !values.name ||
        !values.manufacturer ||
        !values.mainPepper ||
        !values.heat ||
        !values.userId){
            console.log('error manip')
            return res.status(400).json({ error: 'Invalid Input'})
    }
    const sauce = new Sauce({
        ...values,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked:[''],
        userDisliked:['']
    })
    sauce.save()
    .then(() => res.status(200).json({message : 'Success'}))
    .catch(err => res.status(500).json({ err}))
};
exports.editSauceById= (req, res) => {

    const valueSauce = req.file?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.updateOne({ _id: req.params.id}, {...valueSauce, _id: req.params.id})
    .then(() => res.status(200).json({message : 'Success'}))
    .catch(err => res.status(400).json(err))
};
exports.deleteSauceById= (req, res) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        const fileName = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${fileName}`,() => {
            Sauce.deleteOne({_id:req.params.id})
            .then(() => res.status(200).send({message : 'Success'}))
            .catch(error => res.status(400).json({ error }));
        })
    })
    .catch(error => res.status(404).json({ error }));
};
exports.deleteSauce = (req,res) => {
    Sauce.find()
    .then(sauces => {
        for(let sauce of sauces){
            Sauce.deleteOne({_id:sauce._id})
            .then(() => {

            })
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch(error => res.status(400).json({ error }));
    res.status(200).send({message:"success"});
}
exports.likeSauce = (req,res) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        console.log(req.body);

        if(sauce.userLiked.indexOf(req.body.userId) !== -1) {
            sauce.userLiked = sauce.userLiked.filter((f) => {return f !== req.body.userId});
            sauce.likes --;
        }
        if(sauce.userDisliked.indexOf(req.body.userId) !== -1) {
            console.log("");
            sauce.userDisliked = sauce.userDisliked.filter((f) => {return f !== req.body.userId});
            sauce.dislikes --;
        }


        
        if (req.body.like == 1) {
            sauce.likes ++;
            sauce.userLiked.push(req.body.userId);
        }else if (req.body.like == -1){
            sauce.dislikes ++;
            sauce.userDisliked.push(req.body.userId);
        }
        Sauce.updateOne({ _id: req.params.id}, sauce)
        .then(() => res.status(200).json({message : 'Success'}))
        .catch(err => res.status(500).json({ err}));
        })
    .catch(error => res.status(404).json({ error }));
}