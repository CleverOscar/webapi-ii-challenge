const express = require('express');
const router = express.Router();
const Commands = require('./db.js');



//POST /api/posts
router.post('/',async (req, res)=>{
  try{
    const posts = await Commands.insert(req.body);
    res.status(201).json(posts)
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Please provide title and contents for the post." })
  }
})

//GET /api/posts

router.get('/', async (req, res) =>{
  try{
    const posts = await Commands.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "There was an error while saving the post to the database" })
  }
})



//GET /api/posts/:id
router.get('/:id', async (req, res) =>{
  try{
    const posts = await Commands.findById(req.params.id);

    if(posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."})
    }
  } catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error getting posts'
    })
  }
})

// DELETE /api/posts/:id

router.delete('/:id',async(req,res)=>{
  try{
    const posts = await Commands.remove(req.params.id);
    if(posts){
      res.status(200).json({message: "Posts has has been removed"})
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."})
    }
  } catch(error){
      console.log(error);
      res.status(500).json({
        message: 'Error removing the posts'
      })
  }
})

// PUT /api/posts/:id

router.put('/:id', async(req, res)=>{
  try{
    const posts = await Commands.update(req.params.id, req.body);
    if(posts){
      res.status(200).json(posts);
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    }
  } catch(error){
    console.log(error);
    res.status(500).json({message: "The post information could not be modified."})
  }
})





module.exports = router;
