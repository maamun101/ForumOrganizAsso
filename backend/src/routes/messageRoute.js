// Routers
const express = require("express");

const Message = require("../entities/Message.js");
const User = require("../entities/User.js");
const { ObjectId } = require("mongodb");

const messageRoute = express.Router();


messageRoute.post("/newMessage", async (req, res) => {
    const message = new Message();

    try {
        const { content, isComment, msgAnswered, isPrivate } = req.body;

        // verfication que l'utilisateur est Member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Erreur : vous n'avez pas le droit d'écrire un message"
            });
            return;
        }

        // verification si le message est dans le forum privé, que l'utilisateur est admin
        if (isPrivate && !req.session.isAdmin) {
            res.status(401).json({
                status: 401,
                message: "Erreur : vous n'avez pas le droit d'écrire un message dans le forum privé"
            });
            return;
        }


        // verification que le message est non vide
        if (!content) {
            res.status(400).json({
                status: 400,
                message: "Erreur : Message vide "
            })
        }

        // recuperation de l'auteur du message
        let authorId = req.session.userid;
        let authorFirstName = req.session.firstName;
        let authorLastName = req.session.lastName;


        // tentative de création du message, stockage dans success du booléen de succé
        const success = await message.createMessage(content, authorId, authorFirstName, authorLastName, isComment, msgAnswered, isPrivate);

        if (success) {
            res.status(200).json({
                status: 200,
                message: "message envoyé"
            })
            return;
        }

        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });

    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
        console.error(e);
    }
});


messageRoute.get("/getMessage/:id", async (req, res) => {

    const message = new Message();

    const user = new User();

    try {

        const messageId = req.params.id;

        // verification que l'utilisateur est member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        // verification que l'id est non vide
        if (!messageId) {
            res.status(404).json({
                status: 400,
                message: "Erreur : l'id est vide"
            });
            return;
        }

        let messageObj = await message.exists(messageId);

        // verification que ce message existe
        if (!messageObj) {
            res.status(404).json({
                status: 404,
                message: "Erreur : le message n'existe pas"
            })
            return;
        }

        let userObj = await user.existsId(messageObj.authorId.toString());

        // verification si le message privé, que l'utilisateur est Admin
        if (messageObj.isPrivate && !req.session.isAdmin) {
            res.status(401).json({
                status: 401,
                message: "Erreur : vous n'avez pas le droit d'accéder à ce message"
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Succés : message reçu",
            authorId: messageObj.authorId,
            authorFirstName: messageObj.authorFirstName,
            authorLastName: messageObj.authorLastName,
            messageContent: messageObj.content,
            date: messageObj.date,
            isPrivate: messageObj.isPrivate,
            isComment: messageObj.isComment,
            authorProfilePicPath : userObj ? userObj.avatarUrl : null
        });

    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }

});

messageRoute.delete("/delete/:id", async (req, res) => {

    const message = new Message();

    try {
        //on récupère le msgId
        const msgId = req.params.id;

        // verification si l'utilisateur est member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Permission non accordée"
            });
            return;
        }

        const messageObj = await message.exists(msgId);

        // verification si le message existe 
        if (!messageObj) {
            res.status(401).json({
                status: 401,
                message: "Message n'existe pas dans la base de données"
            })
            return;
        }

        // verification que l'utilisateur est admin ou que le message est supprimer par l'auteur
        if ((!req.session.isAdmin) && (!req.session.id === messageObj.author)) {
            res.status(401).json({
                status: 403,
                message: "Permission non accordée"
            });
            return;
        }

        // supprimer le msg dans la base
        let supp = await message.delete(msgId);

        //on répond au profile avec les donées
        if (supp) {
            res.status(200).json({
                status: 200,
                comment: "Le message vient d'être supprimé!"
            });
            return;
        }

        res.status(500).json({
            status: 500,
            message: "erreur interne"
        });
        return;

    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        });
        console.error(e);
    }
});


messageRoute.get("/getMessageList", async (req, res) => {

    const message = new Message();

    try {

        // recuperation des donné de la queryString
        let { isPrivate, dateBegin, dateEnd, msgSearchContent, authorId, msgAnswered, isComment } = req.query;

        // normalisation des données 
        isPrivate = isPrivate === "true";
        dateBegin = dateBegin || null;
        dateEnd = dateEnd || null;
        msgSearchContent = msgSearchContent || null;
        authorId = authorId ? authorId : null;
        msgAnswered = msgAnswered || null;
        isComment = isComment === "true";

        // verification que l'utilisateur est member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        // si les message sont dans le forum privé, verification que l'utilisateur est Admin
        if (isPrivate && !req.session.isAdmin) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        // si le msgAnswered est non vide verifiaction qu'il exists
        if (msgAnswered && ! await message.exists(msgAnswered)) {
            res.status(404).json({
                status: 404,
                message: "Erreur : message non existant"
            });
            return;
        }

        const msgList = await message.getMsgList(isPrivate, dateBegin, dateEnd, msgSearchContent, authorId, msgAnswered, isComment);

        if (msgList) {
            res.status(200).json({
                status: 200,
                message: "Liste de message envoyé !",
                msgList: msgList
            });
            return;
        }

        res.status(500).json({
            status: 500,
            message: "erreur interne"
        });
        return;


    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }

});

//modifier les nom et prénom de l'auteur du message apès la modification de son profile
messageRoute.put("/:userId", async (req, res) => {
    const message = new Message();

    try {
        const userId = req.params.userId;
        const { firstName, lastName } = req.body;

        // verification que l'utilisateur est member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        // verification que l'id est non vide
        if (!userId) {
            res.status(404).json({
                status: 400,
                message: "Erreur : l'id est vide"
            });
            return;
        }

        let messageObj = await message.updateAuthorName(userId, firstName, lastName);
        if (messageObj) {
            res.status(200).json({
                status: 200,
                message: "Nom et prénom sont modifié dans chaque message!"
            });
            return;
        } else {
            res.status(404).json({
                status: 404,
                message: "Erreur : lors de la modification du nom et prénom dans les messages"
            })
            return;
        }
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }
}
);

messageRoute.get("/getLikeNumber/:msgId", async (req, res) => {

    const message = new Message();

    try {

        const msgId = req.params.msgId;

        // verification que l'utilisateur est member
        if (!req.session.isMember) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        // verifiaction que le message existe
        if (!await message.exists(msgId)) {
            res.status(404).json({
                status: 404,
                message: "Erreur : message non existant"
            });
            return;
        }

        // si le message est dans le forum privé, verification que l'utilisateur est Admin
        if (await message.isPrivate(msgId) && !req.session.isAdmin) {
            res.status(401).json({
                status: 401,
                message: "Erreur : accès non autorisé"
            });
            return;
        }

        const likeNumber = await message.getLikeNumber(msgId);

        if (likeNumber || likeNumber == 0){
            res.status(200).json({
                status: 200,
                message : "Nombre de like récupéré",
                likeNumber: likeNumber
            });
            return;
        }
  
        res.status(500).json({
            status: 500,
            message: "erreur interne"
        });
        return;


    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "erreur interne",
            details: (e || "Erreur inconnue").toString()
        })
    }


});


module.exports = messageRoute;