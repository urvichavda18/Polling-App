const { message } = require("statuses");

exports.createPoll = async (req, res) => {
    const { question, type, options, creatorId } = req.body;
    if (!question || !type || !creatorId) {
        return res
            .status(400)
            .json({ message: "Question, type and creatorId are required" });
    }
    try {

        let processedOptions = [];
        switch (type) {
            case "single-choice":
                if (!options || !options.length < 2) {
                    return res.status(400).json({
                        message: "Single-choice poll must have as least two options.",
                    });
                }
                processedOptions = options.map((options) => ({ optionText: options }));
                break;
                processedOptions = []; //no options needed for open-ended
                break;
            default:
                return res.status(400).json({ message: "Invalid poll type." });
        }

        const newPoll = await Poll.create({
            question,
            type,
            options: processedOptions,
            creator: creatorId,
        });
        res.status(201).json(newPoll);
    } catch (err) {
        res
            .status(500)
            .json({ message: "________", error: err.message });
    }
}

// 3:12:49