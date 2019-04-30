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
    res.status(500).json({message: 'Error adding posts'})
  }
})

//GET /api/posts

router.get('/', async (req, res) =>{
  try{
    const posts = await Commands.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Could not get posts'})
  }
})



//GET /api/posts/:id
router.get('/:id', async (req, res) =>{
  try{
    const posts = await Commands.findById(req.params.id);

    if(posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({message: 'Posts not found'})
    }
  } catch (error){
    console.log(error);
    res.status(500).json({
      message: 'Error getting posts'
    })
  }
})

// DELETE /api/posts/:id



// PUT /api/posts/:id






module.exports = router;
