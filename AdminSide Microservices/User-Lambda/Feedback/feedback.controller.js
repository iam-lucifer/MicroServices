const FeedbackModel = require('./feedback.model');


// get all Feedbacks
exports.getFeedbackList = async (req, res) => {
    try {
      const feedback = await FeedbackModel.getAllFeedbacks();
      console.log(feedback);
      res.status(200).json({ feedback });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
      console.log(error);
    }
  };

  // get Feedback with mark 1
  exports.getFeedbackByMark = async (req, res) => {
    try {
      const feedbackbymark = await FeedbackModel.getFeedbackbyMark();
      console.log(feedbackbymark);
      res.status(200).json({ feedbackbymark });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
      console.log(error);
    }
  };

  exports.updateFeedback = async(req , res)=>{
    const feedbackData = new FeedbackModel(req.body);
    try{
        const upFeedback = await FeedbackModel.updateFeedback(req.params.id , feedbackData);
        res.status(200).json({upFeedback});
    }catch(error){
        res.status(400).json({message: `${error}`});
    }
};

  exports.createNewFeedback = async (req, res) => {

    console.log( 'feedback request data', req.body);
    const feedbackReqData = new FeedbackModel(req.body);
  
    try {
  
      const feedbackData = await FeedbackModel.createComments(feedbackReqData);
  
      res.status(200).json({ feedbackData });
    } catch (error) {
      res.status(400).json({ message: `${error}` });
    }
  
  };