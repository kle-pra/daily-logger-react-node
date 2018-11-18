const express = require('express');
const router = express.Router();
const logService = require('../services/log.service');
const Log = require('../models/log.model');

router.get('/', async (req, res) => {

  try {
    let logs;
    if (req.query.date) {
      const date = new Date(req.query.date);
      logs = await logService.getLogsForDate(date, req.user);
    } else {
      logs = await logService.getLogs(req.user);
    }
    return res.json(logs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }

});

router.post('/', async (req, res) => {
  try {
    const log = {
      title: req.body.title
    };
    const newLog = await logService.saveLog(log, req.user);
    return res.json(newLog);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }

});

router.delete('/:id', async (req, res) => {
  try {
    await logService.deleteLog(req.params.id, req.user);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }

});

router.put('/:id', async (req, res) => {
  const updateLogData = {
    title: req.body.title,
  }
  try {
    const updatedLog = await logService.updateLog(req.params.id, updateLogData, req.user);
    return res.json(updatedLog);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error
    });
  }

});

module.exports = router;