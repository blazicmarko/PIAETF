"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const request_1 = __importDefault(require("request"));
const user_1 = __importDefault(require("./models/user"));
const request_2 = __importDefault(require("./models/request"));
const books_1 = __importDefault(require("./models/books"));
const events_1 = __importDefault(require("./models/events"));
const genres_1 = __importDefault(require("./models/genres"));
const comments_1 = __importDefault(require("./models/comments"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/users");
const path = require("path");
const connection = mongoose_1.default.connection;
const multer = require('multer');
const nodemailer = require('nodemailer');
connection.once("open", () => {
    console.log("mongo open");
});
const router = express_1.default.Router();
// NODEMAILER
var transporter = nodemailer.createTransport({
    service: 'hotmail',
    secure: false,
    port: 25,
    auth: {
        user: '**********************'
        @hotmail.rs ',
        pass: '*************'
    },
    tls: {
        rejectUnauthorized: false
    }
});
// MULTER
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
// USER
router.route("/login").post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.find({ username: username, password: password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route("/register").post(upload.single("myImage"), (req, res) => {
    if (req.body.recaptcha == undefined ||
        req.body.recaptcha == null ||
        req.body.recaptcha == "") {
        return res.json({ request: "recaptcha empty" });
    }
    const secretKey = "*************************************";
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.recaptcha}&remoteip=${req.connection.remoteAddress}`;
    request_1.default(verifyUrl, (err, response, body) => {
        body = JSON.parse(body);
        if (body.success !== undefined && body.success == false) {
            return res.json({ request: "recaptcha failed" });
        }
        let mail = req.body.mail;
        let username = req.body.username;
        user_1.default.find({ username: username }, (err, user_doc) => {
            if (err)
                console.log(err);
            else {
                if (user_doc[0])
                    res.json({ request: "username user" });
                else {
                    user_1.default.find({ mail: mail }, (err, user_doc) => {
                        if (err)
                            console.log(err);
                        else {
                            if (user_doc[0])
                                res.json({ request: "mail user" });
                            else {
                                request_2.default.find({ username: username }, (err, request_doc) => {
                                    if (err)
                                        console.log(err);
                                    else {
                                        if (request_doc[0])
                                            res.json({ request: "username req" });
                                        else {
                                            request_2.default.find({ mail: mail }, (err, request_doc) => {
                                                if (err)
                                                    console.log(err);
                                                else {
                                                    if (request_doc[0])
                                                        res.json({ request: "mail req" });
                                                    else {
                                                        const url = req.protocol + '://' + req.get("host");
                                                        var imagePath;
                                                        if (req.body.havePic == "yes") {
                                                            imagePath = url + "/uploads/" + req.file.filename;
                                                        } else {
                                                            imagePath = url + "/uploads/generic";
                                                        }
                                                        let request = new request_2.default({
                                                            username: req.body.username,
                                                            password: req.body.password,
                                                            name: req.body.name,
                                                            surname: req.body.surname,
                                                            mail: req.body.mail,
                                                            date: req.body.date,
                                                            city: req.body.city,
                                                            state: req.body.state,
                                                            type: req.body.type,
                                                            picture: imagePath,
                                                        });
                                                        request
                                                            .save()
                                                            .then((request) => {
                                                                res.status(200).json({ request: "ok" });
                                                            })
                                                            .catch((err) => {
                                                                res.status(400).json({ request: "not ok" });
                                                            });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
});
router.route("/getUser").post((req, res) => {
    let username = req.body.username;
    app.all("/uploads/generic", (req, res) => {
        res.status(200).sendFile("/generic", { root: "./uploads" });
    });
    app.all("/uploads/" + username, (req, res) => {
        res.status(200).sendFile("/" + username, { root: "./uploads" });
    });
    user_1.default.find({ username: username }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route("/getUserByEmail").post((req, res) => {
    let email = req.body.email;
    user_1.default.find({ mail: email }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
});
router.route("/changeUser").post((req, res) => {
    let user = req.body.user;
    user_1.default.findOneAndUpdate({ username: user.username }, user, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ respond: "not ok" });
        } else
            res.json({ respond: "ok" });
    });
});
router.route("/getComments").post((req, res) => {
    comments_1.default.find({ author: req.body.username }, (err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
// ADMIN
router.route("/admin/getUsers").get((req, res) => {
    user_1.default.find((err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
router.route("/admin/getRequests").get((req, res) => {
    request_2.default.find((err, requests) => {
        if (err)
            console.log(err);
        else
            res.json(requests);
    });
});
router.route("/admin/denyRequest").post((req, res) => {
    let username = req.body.username;
    request_2.default.findOneAndDelete({ username: username }, (err) => {
        if (err)
            console.log(err);
    });
});
router.route("/admin/approveRequest").post((req, res) => {
    let username = req.body.username;
    request_2.default.find({ username: username }, (err, result) => {
        if (err)
            console.log(err);
        else {
            let user = new user_1.default(result[0]);
            const Collection = mongoose_1.default.Collection;
            let c = new Collection("users", connection);
            c.insertOne(user)
                .then((msg) => {
                    res.status(200).json({ respond: "ok" });
                })
                .catch((err) => {
                    res.status(400).json({ respond: "not ok" });
                });
            request_2.default.findOneAndDelete({ username: username }, (err) => {
                if (err)
                    console.log(err);
            });
        }
    });
});
router.route("/admin/insertNew").post((req, res) => {
    let mail = req.body.user.mail;
    let username = req.body.user.username;
    user_1.default.find({ username: username }, (err, user_doc) => {
        if (err)
            console.log(err);
        else {
            if (user_doc[0])
                res.json({ respond: "username" });
            else {
                user_1.default.find({ mail: mail }, (err, user_doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (user_doc[0])
                            res.json({ respond: "mail" });
                        else {
                            let user = new user_1.default(req.body.user);
                            user
                                .save()
                                .then((user) => {
                                    res.status(200).json({ respond: "ok" });
                                })
                                .catch((err) => {
                                    res.status(400).json({ respond: "not ok" });
                                });
                        }
                    }
                });
            }
        }
    });
});
router.route("/admin/deleteIt").post((req, res) => {
    let username = req.body.username;
    user_1.default.findOneAndDelete({ username: username }, (err) => {
        if (err) {
            console.log(err);
            res.json({ respond: "not ok" });
        } else
            res.json({ respond: "ok" });
    });
});
router.route("/admin/updateIt").post((req, res) => {
    let update = new user_1.default(req.body.user);
    user_1.default.findOneAndUpdate({ username: req.body.user.username }, update, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ respond: "not ok" });
        } else {
            res.json({ respond: "ok" });
        }
    });
});
router.route("/admin/deleteGenre").post((req, res) => {
    books_1.default.find((err, result) => {
        if (err) {
            console.log(err);
            res.json({ respond: "not ok" });
        } else {
            let i = 0;
            while (i < result.length) {
                let genres = result[i].get("genres");
                var isInBook = genres.includes(req.body.genre);
                if (isInBook)
                    break;
                i++;
            }
            if (!isInBook) {
                genres_1.default.findOneAndDelete({ name: req.body.genre }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ respond: "not ok" });
                    } else {
                        res.json({ respond: "ok" });
                    }
                });
            } else
                res.json({ respond: "not ok" });
        }
    });
});
router.route("/admin/insertNewGenre").post((req, res) => {
    let genre = new genres_1.default({
        name: req.body.genre
    });
    genre
        .save()
        .then((genre) => {
            res.status(200).json({ respond: "ok" });
        })
        .catch((err) => {
            res.status(400).json({ respond: "not ok" });
        });
});
// BOOKS
router.route("/book/getBooks").get((req, res) => {
    books_1.default.find((err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
router.route("/book/getBook").post((req, res) => {
    let name = req.body.name;
    let picName = name.split(' ')[0];
    app.all("/uploads/genericBook", (req, res) => {
        res.status(200).sendFile("/genericBook", { root: "./uploads" });
    });
    app.all("/uploads/" + picName, (req, res) => {
        res.status(200).sendFile("/" + picName, { root: "./uploads" });
    });
    books_1.default.find({ name: req.body.name }, (err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
router.route("/book/getComments").post((req, res) => {
    comments_1.default.find({ book: req.body.name }, (err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
router.route("/book/leaveComment").post((req, res) => {
    let author = req.body.comment.author;
    let book = req.body.comment.book;
    comments_1.default.find({ author: author, book: book }, (err, user_doc) => {
        if (err)
            console.log(err);
        else {
            if (user_doc[0])
                res.json({ respond: "author" });
            else {
                let comment = new comments_1.default(req.body.comment);
                comment
                    .save()
                    .then((comment) => {
                        res.status(200).json({ respond: "ok" });
                    })
                    .catch((err) => {
                        res.status(400).json({ respond: "not ok" });
                    });
            }
        }
    });
    user_1.default.find({ username: author }, (err, user_doc) => {
        if (err)
            console.log(err);
        else {
            let followers = user_doc[0].get('followers');
            for (let i = 0; i < followers.length; i++) {
                user_1.default.find({ username: followers[i] }, (err, user) => {
                    if (err)
                        console.log(err);
                    else {
                        let mail = user[0].get('mail');
                        var mailOptions = {
                            from: 'marko.blazic@hotmail.rs',
                            to: mail,
                            subject: 'Aktivnost korisnika ' + author,
                            text: 'Korisnik ' + author + ' je ostavio komentar na knjigu ' + book + '. Pogledajte komentar!'
                        };
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                });
            }
        }
    });
});
router.route("/book/cngBook").post((req, res) => {
    let book = req.body.book;
    books_1.default.findOneAndUpdate({ name: book.name }, book, (err, result) => {
        if (err) {
            console.log(err);
        } else
            res.json(result);
    });
});
router.route("/book/cngComment").post((req, res) => {
    let comment = req.body.comment;
    comments_1.default.findOneAndUpdate({ author: req.body.comment.author, book: req.body.comment.book }, comment, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ respond: "not ok" });
        } else
            res.status(200).json({ respond: "ok" });
    });
});
router.route("/book/insertBook").post(upload.single("myImage"), (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    if (req.body.havePic == "yes") {
        var imagePath = req.file.filename.split(' ')[0];
        console.log(imagePath);
        imagePath = url + "/uploads/" + imagePath;
    } else {
        imagePath = url + "/uploads/genericBook";
    }
    let book = new books_1.default({
        name: req.body.name,
        authors: req.body.authors,
        date: req.body.date,
        genres: req.body.genres,
        description: req.body.description,
        numOfComm: req.body.numOfComm,
        grade: req.body.grade,
        approved: req.body.approved,
        picture: imagePath,
    });
    book
        .save()
        .then((book) => {
            res.status(200).json({ respond: "ok" });
        })
        .catch((err) => {
            res.status(400).json({ respond: "not ok" });
        });
});
// EVENTS
router.route("/event/guest/getEvents").get((req, res) => {
    events_1.default.find({ type: "public" }, (err, doc) => {
        if (err)
            console.log(err);
        else
            res.json(doc);
    });
});
// GENRES
router.route("/genre/getGenres").get((req, res) => {
    genres_1.default.find((err, doc) => {
        if (err)
            console.log(err);
        else {
            res.json(doc);
        }
    });
});
// EMAIL
router.route("/forgotPass").post((req, res) => {
    let email = req.body.email;
    user_1.default.countDocuments({ mail: email }, (err, userdoc) => {
        if (err) {
            res.status(400).json({ respond: "not ok" });
            console.log(err);
        } else {
            if (userdoc > 0) {
                var mailOptions = {
                    from: 'marko.blazic@hotmail.rs',
                    to: email,
                    subject: 'Zahtev za promenu lozinke',
                    text: 'Poslali ste zahtev za promenu lozinke. Na linku http://localhost:4200/password?' + email + ' mozete promeniti lozinku'
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.status(200).json({ respond: "ok" });
            } else {
                res.status(200).json({ respond: "no mail" });
            }
        }
    });
});
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map