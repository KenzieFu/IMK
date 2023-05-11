const Event = require("../models/event");
const Akun = require("../models/akun");

// Function untuk create event
exports.createEvent = async (req, res, next) => {
  // Contoh body request:
  // {
  //     "title_event": "Event 1",
  //     "content_event": "Ini adalah event 1",
  //     "tanggal_event": "2021-08-01",
  //     "status": "Publik",
  //     "tipe": "Siswa",
  //     "id_akun": 6
  // }

  try {
    const { title_event, content_event, tanggal_event, id_akun, status, tipe } = req.body;

    const event = await Event.create({
      title_event,
      content_event,
      tanggal_event,
      id_akun,
      status,
      tipe,
    });

    res.status(201).json({
      message: "Event berhasil ditambahkan",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk update event
exports.updateEvent = async (req, res, next) => {
  // Contoh body request:
  // {
  //     "title_event": "Event 1",
  //     "content_event": "Ini adalah event 1",
  //     "tanggal_event": "2021-08-01",
  //     "status": "Publik",
  //     "tipe": "Siswa",
  //     "id_akun": 6
  // }

  try {
    const { title_event, content_event, tanggal_event, id_akun, status, tipe } = req.body;

    const event = await Event.update(
      {
        title_event,
        content_event,
        tanggal_event,
        id_akun,
        status,
        tipe,
      },
      {
        where: {
          id_event: req.params.eventId,
        },
      }
    );

    res.status(200).json({
      message: "Event berhasil diupdate",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.destroy({
      where: {
        id_event: req.params.eventId,
      },
    });

    res.status(200).json({
      message: "Event berhasil dihapus",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk get satu event
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findOne({
      where: {
        id_event: req.params.eventId,
      },
      // include akun dan hapus properti password
      include: {
        model: Akun,
        attributes: {
          exclude: ["password"],
        },
      },
    });

    res.status(200).json({
      message: "Event berhasil ditemukan",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// Function untuk get semua event
exports.getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.findAll({
      // include akun dan hapus properti password
      include: {
        model: Akun,
        attributes: {
          exclude: ["password"],
        },
      },
    });

    res.status(200).json({
      message: "Semua event berhasil ditemukan",
      data: events,
    });
  } catch (error) {
    next(error);
  }
};
