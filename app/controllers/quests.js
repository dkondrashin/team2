'use strict';

const path = require('path');

const Quest = require('../models/quest');
const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

const notNumberPattern = /[\D]+/g;
const forbiddenSearch = /[^\w\dА-Яа-яЁё-]+/g;
const underline = /_/g;

/**
 * Страница добавления квеста
 * @param req
 * @param res
 */
exports.createQuest = (req, res) => {
    res.render('../views/quests/create.hbs');
};

/**
 * Добавление нового квеста
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    Quest.create({
        name: req.body.name,
        description: req.body.description
        // authorId: получить текущего пользователя
    });
    res.redirect(302, '/quests');
};

/**
 * Получает список квестов
 * @param req
 * @param res
 */
exports.list = (req, res) => {
    Quest.findAll()
        .then(quests => {
            res.render('../views/quests/list.hbs', {quests});
        });
};

/**
 * Получить квест по id
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    if (req.params.id.match(notNumberPattern)) {
        res.render('../views/pages/notExists.hbs');
    } else {
        Quest.findById(req.params.id).then(quest => {
            if (quest) {
                res.render('../views/quests/get.hbs', quest.dataValues);
            } else {
                res.render('../views/pages/notExists.hbs');
            }
        });
    }
};

/**
 * Получает квесты текущего пользователя
 * @param req
 * @param res
 */
exports.usersQuests = (req, res) => { // eslint-disable-line no-unused-vars
    // Рендерит ../views/quests/list.hbs после соответствующей выборки
};

/**
 * Поиск по названию квеста
 * @param req
 * @param res
 */
exports.search = (req, res) => {
    const pattern = req.params.pattern.replace(forbiddenSearch, '');
    Quest.findAll({
        where: {
            name: {
                $iLike: '%' + pattern + '%'
            }
        }
    }).then(quests => {
        res.render('../views/quests/search.hbs', {
            quests,
            pattern: pattern.replace(underline, ' ')
        });
    });
};

/**
 * Изменение квеста
 * @param req
 * @param res
 */
exports.update = (req, res) => { // eslint-disable-line no-unused-vars
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Удаление квеста
 * @param req
 * @param res
 */
exports.delete = (req, res) => { // eslint-disable-line no-unused-vars
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Увеличение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.like = (req, res) => { // eslint-disable-line no-unused-vars

};

/**
 * Уменьшение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.unlike = (req, res) => { // eslint-disable-line no-unused-vars

};
