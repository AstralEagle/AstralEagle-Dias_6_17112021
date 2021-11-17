const express = require('express');
const router = express.Router();




router.get('/',(req,res)=>{
    
});
router.get('/:id',(req,res)=>{
    
});
router.post('/',(req,res)=>{
    console.log("Inscription : ");
    console.log(req.body);
    if( !req.body.sauce||
        !req.body.image){
            return res.status(400).send(new Error('Bad request!'));
    }
    res.status(201).send({message: 'Enregister'})
});
router.put('/:id',(req,res)=>{
    if( !req.body.sauce||
        !req.body.image){
            return res.status(400).send(new Error('Bad request!'));
    }
})
router.delete("/:id",(req,res)=>{

})
router.post('/:id/like',(req,res)=>{
    if( !req.body.userId||
        !req.body.like){
            return res.status(400).send(new Error('Bad request!'));
    }
})



module.exports = router;