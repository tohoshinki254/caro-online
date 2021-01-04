const accountDAO = require('../models/account');
const roomDAO = require('../models/room');
const matchDAO = require('../models/match');

module.exports = {
  getPublicRooms: async (req, res, next) => {
    try {
      const rooms = await roomDAO.find({ isPublic: true });
      res.status(200).json({
        message: 'Successful',
        rooms: rooms
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }
  },

  joinRoom: async (req, res, next) => {
    try {
      const roomId = req.body.roomId;
      const playerId = req.user._id;

      const room = await roomDAO.findOne({ roomId: roomId });
      if (room === null) {
        res.status(401).json({
          message: 'The room is not existed'
        });
        return;
      }

      if (room.player !== null) {
        res.status(403).json({
          message: 'The room is full.'
        });
        return;
      }

      room.player = playerId;

      await room.save();
      res.status(200).json({
        message: 'Successful'
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  createRoom: async (req, res, next) => {
    try {
      let isPublic = req.body.isPublic;
      const name = req.body.name;
      if (isPublic === undefined) isPublic = true;
      if (name === undefined) {
        res.status(401).json({
          message: 'Name is not define.'
        });
        return;
      }
      const roomWithMaxId = await roomDAO.findOne().sort('-roomId');
      const newRoomId = roomWithMaxId === null ? 1 : roomWithMaxId.roomId + 1;
      const newRoom = new roomDAO({
        roomId: newRoomId,
        creator: req.user._id,
        player: null,
        isEnd: false,
        creatorWinner: 0,
        playerWinner: 0,
        draws: 0,
        createdTime: new Date(),
        isPublic: isPublic,
        name: name
      });
      await newRoom.save();
      res.status(200).json({
        message: 'OK',
        roomId: newRoom.roomId
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  getDetailRoom: async (req, res, next) => {
    try {
      const roomId = req.body.roomId;
      const userId = req.body.userId;
      if (roomId === undefined || userId === undefined) {
        res.status(401).json({
          message: 'Room ID or User ID not defined'
        });
        return;
      }

      const room = await roomDAO.findOne({ roomId: roomId });
      if (room === null) {
        res.status(404).json({
          message: 'Room not found'
        });
        return;
      }

      let creator = {
        name: 'N/A',
        mark: 0,
        draws: 0,
        cups: 0,
        wins: 0,
        loses: 0
      }
      let player = {
        name: 'N/A',
        mark: 0,
        draws: 0,
        cups: 0,
        wins: 0,
        loses: 0
      }
      if (room.creator !== null) {
        const _creator = await accountDAO.findById(room.creator);
        creator = {
          name: _creator.name,
          mark: room.creatorWinner,
          cups: _creator.cups,
          draws: _creator.draws,
          wins: _creator.wins,
          loses: _creator.loses,
        }
      }

      if (room.player !== null) {
        const _player = await accountDAO.findById(room.player);
        player = {
          name: _player.name,
          mark: room.playerWinner,
          cups: _player.cups,
          draws: _player.draws,
          wins: _player.wins,
          loses: _player.loses,
        }
      }

      res.status(200).json({
        creator: creator,
        player: player,
        isCreator: userId === room.creator
      })
    } catch (e) {
      res.status(500).json({
        message: e.message
      });
    }
  },

  // Cập nhật thông số của người chơi
  // Lưu chat, history
  // Dùng roomId lấy các thông tin có sẵn rồi update thêm history, chat, ...
  updateParamsAfterEnd: async (req, res, next) => {
    try {
      const { id, creatorWins, playerWins, draws, chat } = req.body;

      const room = await roomDAO.findOne({ roomId: id });
      if (room === null || room === undefined) {
        res.status(400).json({
          message: 'Room is not existed'
        });
        return;
      }

      const creator = await accountDAO.findById(room.creator);
      const player = await accountDAO.findById(room.player);
      if (creator === null || player === null) {
        res.status(401).json({
          message: 'Account is not existed'
        });
        return;
      }

      room.creatorWinner = creatorWins;
      room.playerWinner = playerWins;
      room.draws = draws;
      room.chat = chat;
      await room.save();

      creator.wins += creatorWins;
      creator.loses += playerWins;
      creator.draws += draws;
      await creator.save();

      player.wins += playerWins;
      player.loses += creatorWins;
      player.draws += draws;
      await player.save();

      res.status(200).json({
        message: 'OK'
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  getRoomByUserId: async (req, res, next) => {
    try {
      console.log(req.body);
      const { id } = req.body;
      const user = await accountDAO.findById(id);
      if (user === null) {
        res.status(400).json({
          message: 'User is not existed'
        });
        return;
      }

      const rooms = await roomDAO.find({ $or: [{ creator: id }, { player: id }] });
      res.status(200).json({
        message: 'OK',
        rooms: rooms
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  getRoomsEnded: async (req, res, next) => {
    try {
      const rooms = await roomDAO.find({ isEnd: true });
      res.status(200).json({
        message: 'OK',
        rooms: rooms
      });
    } catch (e) {
      res.status(500).json({
        message: e.message
      })
    }
  },

  updateResult: async (roomId, result, history) => {
    try {
      //result: 0: draw, 1: creator win, -1: creator lose
      if (roomId === undefined || result === undefined || history === undefined) {
        return;
      }

      const room = await roomDAO.findOne({roomId: roomId});
      if (room) { 
        const creator = await accountDAO.findById(room.creator);
        const player = await accountDAO.findById(room.player);
        
        if (creator && player) {
          let winCups = 0, loseCups = 0;
          switch (result) {
            case 0:
              creator.draws++;
              player.draws++;
              break;
            case 1:
              winCups = creator.cups >= player.cups ? 1 : 3;
              loseCups = player.cups > creator.cups ? 3 : 1;
              creator.wins++;
              creator.cups += winCups;
              player.loses++;
              player.cups -= loseCups;
              break;
            case -1:
              winCups = player.cups >= creator.cups ? 1 : 3;
              loseCups = creator.cups > player.cups ? 3 : 1;
              creator.loses++;
              creator.cups -= loseCups;
              player.wins++;
              player.cups += winCups;
              break;
          }

          await creator.save();
          await player.save();

          //create match
          const curMatch = await matchDAO.findOne({roomId: roomId}).sort('-match');
          const matchNum = curMatch ? curMatch.match + 1 : 1;
          const newMatch = new matchDAO({
            roomId: roomId,
            match: matchNum,
            history: history,
            result: result
          })

          await newMatch.save();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  },

  setEndRoom: async (req, res, next) => {
    try {
      const {roomId, chatList} = req.body;

      if (roomId === undefined) {
        res.status(404).json({
          message: 'Room is not defined'
        });
        return;
      }

      if (chatList === undefined) {
        res.status(404).json({
          message: 'Room is not defined'
        })
        return;
      }

      const room = await roomDAO.findOne({roomId: roomId}); 

      if (room) {
        room.isEnd = true;
        room.chat = chatList;
        await room.save();

        res.status(200).json({
          message: 'OK'
        });
      } else {
        res.status(404).json({
          message: 'Room is not found'
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}