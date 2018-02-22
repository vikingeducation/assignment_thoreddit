const express = require('express');
const router = express.Router();
const { Vote } = require('./../models');

// still not really right name?
const getNewStatus = (voteParams, currentStatus) => {
   // if vote exists
   if (currentStatus) {
      // if vote is currently up
      if (currentStatus === 1) {
         // if vote is currently up and user clicks down
         if (voteParams.status === 'down') {
            return voteParams.status = 0;
         } 
         // if vote is currently up user clicks up
         else if (voteParams.status === 'up') {
            return voteParams.status = 1;
         }
         else {
            console.log('Invalid input.');
         }
      }
      // if vote is currently down
      else if (currentStatus === -1) {
         // if user clicks up
         if (voteParams.status === 'up') {
            return voteParams.status = 0;
         }
         // if user clicks down
         else if (voteParams.status === 'down') {
            return voteParams.status = -1;
         }
      }
   
   // if vote does not exist
   } else {
      // if user clicks up
      if (voteParams.status === 'up') {
         return voteParams.status = 1;
      } 
      else if (voteParams.status === 'down') {
         return voteParams.status = -1;
      } else {
         console.log('Invalid input.');
      }
   }
};


router.get('/:type/:id/:status', (req, res) => {
   let voteParams = {
      type: req.params.type,
      // post or comment that vote refers to
      parentId: req.params.id,
      status: req.params.status,
      user: req.session.databaseId
   };
   // { post: voteParams.parentId }, { comment: voteParams.parentId }]
   Vote.find( { 
      $or: [ { post: voteParams.parentId }, 
             { comment: voteParams.parentId } ] } )
   .then(vote => {
      getNewStatus(voteParams, vote.status);

      // vote properties - status, user, post, comment
      if (voteParams.type === 'post') {
         voteParams.post = voteParams.parentId;
      } else if (voteParams.type === 'comment') {
         voteParams.comment = voteParams.parentId;
      }

      delete voteParams.parentId;
      delete voteParams.type;
      
      console.log(voteParams);
      // if (vote) {
      //    // res.redirect('/');
      // }

      // else {
      //    Vote.create({ voteParams })
      //    .then(vote => {
      //       console.log('New vote: ' + vote);
      //       res.redirect('/');        
      //    })
      //    .catch((e) => res.status(500).send(e.stack));
      // }
   })
   .catch((e) => res.status(500).send(e.stack));




   // let currentStatus = await Vote.returnStatus(voteParams);
   // console.log('Current status');
   // console.dir(currentStatus);
   // let newStatus;



   // voteParams.status = getNewStatus(voteParams, currentStatus);

   // // set type of post
   // if (voteParams.type === 'posts') {
   //    voteParams.post = voteParams.parentId;
   // } else if (voteParams.type === 'comments') {
   //    voteParams.comment = voteParams.parentId;
   // }

   // delete voteParams.type;


   // console.dir(voteParams);

   // Vote.findOrCreate(voteParams, (err, vote) => {
   //    console.dir(vote.status);
   //    res.redirect('/');
   // });
   
   
   
});

module.exports = router;


// const voteExists = voteParams => {
//    Vote.findById(voteParams.id)
//    .then((vote) => {
//       console.log(vote);
//    }, (err) => {
//       console.log(err);
//    });
//    res.redirect('/');
// };