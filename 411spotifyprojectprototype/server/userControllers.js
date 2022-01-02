const  createMood = async (req, res) => {
    const{userId, Mood} = req.body

    res.json({
      userId,
      Mood
    })
}

module.exports = {createMood}