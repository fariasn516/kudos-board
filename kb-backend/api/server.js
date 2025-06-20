const express = require('express')
const cors = require('cors')
const Board = require('./board-model.js')
const Card = require('./card-model.js')
const Comment = require('./comment-model.js')
const helmet = require('helmet')

const server = express()
server.use(helmet())
server.use(express.json())
server.use(cors())

// ---------- BOARD ENDPOINTS ----------

// [GET] /api/boards/:id
server.get('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const board = await Board.findById(id)
    board
      ? res.json(board)
      : next({ status: 404, message: `No board found with ID ${id}` })
  } catch (err) { next(err) }
})

// [GET] /api/boards  (query: ?title=Inspo&category=Celebration)
server.get('/api/boards', async (req, res, next) => {
  try {
    const boards = await Board.find(req.query)
    boards.length
      ? res.json(boards)
      : next({ status: 404, message: 'No boards match the search criteria' })
  } catch (err) { next(err) }
})

// [POST] /api/boards
server.post('/api/boards', async (req, res, next) => {
  const newBoard = req.body
  const valid = newBoard.title && newBoard.category
  if (!valid) return next({ status: 422, message: 'title and category are required' })

  try {
    const created = await Board.create(newBoard)
    res.status(201).json(created)
  } catch (err) { next(err) }
})

// [PUT] /api/boards/:id
server.put('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  const changes = req.body
  const hasMod = changes.title || changes.category || changes.author

  try {
    const board = await Board.findById(id)
    if (board && hasMod) {
      const updated = await Board.update(id, changes)
      res.json(updated)
    } else {
      next({ status: 422, message: 'Invalid ID or no valid changes' })
    }
  } catch (err) { next(err) }
})

// [DELETE] /api/boards/:id
server.delete('/api/boards/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const board = await Board.findById(id)
    if (board) {
      const deleted = await Board.delete(id)
      res.json(deleted)
    } else {
      next({ status: 404, message: 'Board not found' })
    }
  } catch (err) { next(err) }
})


// ---------- CARD ENDPOINTS ----------

// [GET] /api/boards/:id/cards
server.get('/api/boards/:id/cards', async (req, res, next) => {
  const boardId = Number(req.params.id)
  try {
    const cards = await Card.findByBoardId(boardId)
    res.json(cards)
  } catch (err) { next(err) }
})

// [POST] /api/boards/:id/cards
server.post('/api/boards/:id/cards', async (req, res, next) => {
  const boardId = Number(req.params.id)
  const card = { ...req.body, boardId }

  const valid = card.title && card.description && card.gif
  if (!valid) return next({ status: 422, message: 'title, description and gif are required' })

  try {
    const created = await Card.create(card)
    res.status(201).json(created)
  } catch (err) { next(err) }
})

// [PUT] /api/cards/:id
server.put('/api/cards/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  const changes = req.body;

  try {
    const updated = await Card.update(id, changes);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// [DELETE] /api/cards/:id
server.delete('/api/cards/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const card = await Card.findById(id)
    if (card) {
      const deleted = await Card.delete(id)
      res.json(deleted)
    } else {
      next({ status: 404, message: 'Card not found' })
    }
  } catch (err) { next(err) }
})

// GET /api/cards/:id/comments
server.get("/api/cards/:id/comments", async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const comments = await Comment.findByCard(id);
    res.json(comments);
  } catch (err) { next(err); }
});

// POST /api/cards/:id/comments   body: { body, author? }
server.post("/api/cards/:id/comments", async (req, res, next) => {
  const cardId = Number(req.params.id);
  const { body, author = null } = req.body;
  if (!body) return next({ status: 422, message: "comment body required" });

  try {
    const created = await Comment.create({ body, author, cardId });
    res.status(201).json(created);
  } catch (err) { next(err); }
});


// ---------- CATCH-ALL & ERROR HANDLER ----------

server.use('/*', (req, res, next) =>
  next({ status: 404, message: 'Not found' })
)

server.use((err, req, res, next) => {
  const { status = 500, message } = err
  console.error(message)
  res.status(status).json({ message })
})

module.exports = server
