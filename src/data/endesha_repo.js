const {
  Category,
  Answer,
  UserAnswer,
  Question,
  Image,
  Sequelize,
  Op,
} = require("../models");

exports.fileExists = async function (id, name) {
  //validate request
  try {
    let image;
    if (id && id.length > 0) {
      image = await Image.findByPk(id);
    } else {
      image = await Image.findOne({
        where: { name },
      });
    }
    if (image == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

exports.addImage = async function (name, path) {
  try {
    const f = await Image.create({ name, path });
    return f;
  } catch (e) {
    throw e;
  }
};
exports.updateFile = async function (id, name, path) {
  where = {};
  if (name && name.length > 0) {
    where.name = name;
  } else if (id && id.length > 0) {
    where.id = id;
  }

  try {
    await Image.update({ path }, { where });
    let image = await Image.findOne({ where });
    return image;
  } catch (e) {
    throw e;
  }
};

exports.getImages = async function (id, name) {
  let image;
  if (id && id.length > 0) {
    image = await Image.findByPk(id);
  } else if (name && name.length > 0) {
    image = await Image.findOne({
      where: { name },
    });
  } else {
    image = await Image.findAll({
      order: [["createdAt", "DESC"]],
      logging: console.log,
    });
  }
  return image;
};

//Categories
exports.categoryExists = async function (id, name) {
  //validate request
  try {
    let cat;

    if (id && id.length > 0 && name && name.length > 0) {
      cat = await Category.findOne({
        where: { name, [Op.not]: [{ id }] },
      });
    }
    //find by id if id field is supplied
    else if (id && id.length > 0) {
      cat = await Category.findByPk(id);
    } else {
      cat = await Category.findOne({
        where: { name },
      });
    }
    if (cat == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

//add permission with path and verb
exports.addCategory = async function (name, description) {
  try {
    const cat = await Category.create({ name, description });
    return cat;
  } catch (e) {
    throw e;
  }
};

exports.updateCategory = async function (id, name, description) {
  //build update values
  updateValues = {};
  if (name && name.length > 0) {
    updateValues.name = name;
  }
  if (description && description.length > 0) {
    updateValues.description = description;
  }
  try {
    await Category.update({ ...updateValues }, { where: { id } });
    let cat = await Category.findByPk(id);
    return cat;
  } catch (e) {
    throw e;
  }
};

exports.deleteCategory = async function (id) {
  try {
    await Category.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

exports.deletePicture = async function (id) {
  try {
    await Image.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

exports.getCategories = async function (id, name) {
  var cats;
  try {
    if (id && id.length > 0) {
      cats = Category.findByPk(id);
    } else if (name && name.length > 0) {
      name = "%" + name + "%";
      cats = await Category.findAll({
        where: { name: { [Op.like]: name } },
        order: [["createdAt", "DESC"]],
      });
    } else {
      cats = await Category.findAll({
        order: [["createdAt", "DESC"]],
        logging: console.log,
      });
    }
  } catch (error) {
    throw error;
  }
  return cats;
};

exports.answerExists = async function (id, description) {
  //validate request
  try {
    let ans;

    //make sure no duplicate description
    if (id && id.length > 0 && description && description.length > 0) {
      ans = await Answer.findOne({
        where: { short_description: description, [Op.not]: [{ id }] },
      });
    }
    //find by id if id field is supplied
    else if (id && id.length > 0) {
      ans = await Answer.findByPk(id);
    } else {
      ans = await Answer.findOne({
        where: { short_description: description },
      });
    }
    if (ans == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

exports.updateAnswer = async function (id, description, answer) {
  //build update values
  updateValues = {};
  if (description && description.length > 0) {
    updateValues.short_description = description;
  }
  if (answer && answer.length > 0) {
    updateValues.answer = answer;
  }
  try {
    await Answer.update({ ...updateValues }, { where: { id } });
    let ans = await Answer.findByPk(id);
    console.log(ans);
    return ans;
  } catch (e) {
    throw e;
  }
};

//add answer with description and answer
exports.addAnswer = async function (description, answer) {
  try {
    const ans = await Answer.create({
      short_description: description,
      answer: answer,
    });
    return ans;
  } catch (e) {
    throw e;
  }
};

exports.getAnswers = async function (id, description, answer) {
  var ans;
  try {
    if (id && id.length > 0) {
      ans = Answer.findByPk(id);
    } else if (description && description.length > 0) {
      description = "%" + description + "%";
      ans = await Answer.findAll({
        where: { short_description: { [Op.like]: description } },
        order: [["createdAt", "DESC"]],
      });
    } else if (answer && answer.length > 0) {
      answer = "%" + answer + "%";
      ans = await Answer.findAll({
        where: { answer: { [Op.like]: answer } },
        order: [["createdAt", "DESC"]],
      });
    } else {
      ans = await Answer.findAll({
        order: [["createdAt", "DESC"]],
      });
    }
  } catch (error) {
    throw error;
  }
  return ans;
};

exports.userAnswerExists = async function (id, user_id, question_id) {
  //validate request
  try {
    let ans;
    if (id && id.length > 0) {
      ans = await UserAnswer.findByPk(id);
    } else {
      ans = await UserAnswer.findOne({
        where: { user_id, question_id },
      });
    }
    if (ans == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

exports.deleteAnswer = async function (id) {
  try {
    await Answer.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

//add user answer with description and answer
exports.addUserAnswer = async function (user_id, question_id, answer) {
  try {
    await UserAnswer.create({
      user_id,
      question_id,
      answer,
    });

    let ans = await UserAnswer.findOne({
      where: { user_id, question_id },
    });
    return ans;
  } catch (e) {
    throw e;
  }
};

//add user answer with description and answer
exports.updateUserAnswer = async function (id, user_id, question_id, answer) {
  try {
    let ans;
    if (id && id.length > 0) {
      await UserAnswer.update({ answer }, { where: { id } });
      ans = await UserAnswer.findByPk(id);
    } else {
      await UserAnswer.update({ answer }, { where: { user_id, question_id } });
      ans = await UserAnswer.findOne({
        where: { user_id, question_id },
      });
    }
    return ans;
  } catch (e) {
    throw e;
  }
};

exports.getUserAnswers = async function (id, user_id, question_id) {
  var ans;
  try {
    if (id && id.length > 0) {
      ans = UserAnswer.findByPk(id);
    } else if (
      user_id &&
      user_id.length > 0 &&
      question_id &&
      question_id.length > 0
    ) {
      ans = await UserAnswer.findOne({
        where: { user_id, question_id },
      });
    } else if (user_id && user_id.length > 0) {
      ans = await UserAnswer.findAll({
        where: { user_id },
        order: [["createdAt", "DESC"]],
      });
    } else {
      ans = await UserAnswer.findAll({
        order: [["createdAt", "DESC"]],
      });
    }
  } catch (error) {
    throw error;
  }
  return ans;
};

exports.deleteUserAnswer = async function (id) {
  try {
    await UserAnswer.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};

exports.questionExists = async function (id, question) {
  //validate request
  try {
    let quest;

    if (id && id.length > 0 && question && question.length > 0) {
      ans = await Question.findOne({
        where: { question, [Op.not]: [{ id }] },
      });
    }
    //find by id if id field is supplied
    else if (id && id.length > 0) {
      quest = await Question.findByPk(id);
    } else {
      quest = await Question.findOne({
        where: { question },
      });
    }
    if (quest == null) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

//add question
exports.addQuestion = async function (question, category_id, answer_id) {
  try {
    const q = await Question.create({
      question,
      category_id,
      answer_id,
    });
    const savedQuestion = await Question.findByPk(q.id, {
      include: [
        {
          model: Answer,
          as: "correct_answer",
          attributes: ["id", "short_description", "answer"],
        },
      ],
    });
    return savedQuestion;
  } catch (e) {
    throw e;
  }
};

exports.updateQuestion = async function (id, question, category_id, answer_id) {
  //build update values
  updateValues = {};
  if (question && question.length > 0) {
    updateValues.question = question;
  }
  if (category_id && category_id.length > 0) {
    updateValues.category_id = category_id;
  }
  if (answer_id && answer_id.length > 0) {
    updateValues.answer_id = answer_id;
  }
  try {
    await Question.update({ ...updateValues }, { where: { id } });
    let quest = await Question.findByPk(id);
    return quest;
  } catch (e) {
    throw e;
  }
};

exports.deleteQuestion = async function (id) {
  try {
    await Question.destroy({ where: { id } });
    return id;
  } catch (e) {
    throw e;
  }
};
exports.getQuestions = async function (id, category_id, answer_id, question) {
  var quests;
  try {
    if (id && id.length > 0) {
      quests = Question.findByPk(id, {
        include: [
          {
            model: Answer,
            as: "correct_answer",
            attributes: ["id", "short_description", "answer"],
          },
        ],
      });
    } else if (category_id && category_id.length > 0) {
      quests = await Question.findAll({
        where: { category_id },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Answer,
            as: "correct_answer",
            attributes: ["id", "short_description", "answer"],
          },
        ],
      });
    } else if (question && question.length > 0) {
      question = "%" + question + "%";
      quests = await Question.findAll({
        where: { question: { [Op.like]: question } },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Answer,
            as: "correct_answer",
            attributes: ["id", "short_description", "answer"],
          },
        ],
      });
    } else {
      quests = await Question.findAll({
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Answer,
            as: "correct_answer",
            attributes: ["id", "short_description", "answer"],
          },
        ],
      });
    }
  } catch (error) {
    throw error;
  }
  return quests;
};
