const {
  Category,
  Answer,
  UserAnswer,
  Question,
  sequelize,
  Sequelize,
  Op,
} = require("../models");
//Check if category exists
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
    return ans;
  } catch (e) {
    throw e;
  }
};

const getAnswer = async function (id, description) {
  //validate request
  try {
    let ans;
    //find by id if id field is supplied
    if (id && id.length > 0) {
      ans = await Answer.findByPk(id);
    } else {
      ans = await Answer.findOne({
        where: { short_description: description },
      });
    }
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
    let savedQuestion = await Question.create({
      question,
      category_id,
      answer_id,
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
