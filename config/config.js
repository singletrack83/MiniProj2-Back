module.exports = {
    mongodb: {
        // 👇 como no enunciado: base de dados local "test"
        uri: 'mongodb://localhost:27017/test',
        collections: {
            animal: 'animals',
            question: 'questions',
            quiz: 'quizzes',
            user: 'users',
            user_levels: 'user_levels',
            // ✅ ADICIONADO: Novas coleções para Sponsors e Experts
            sponsor: 'sponsors',
            expert: 'experts'
        }
    },

    // 👇 volta ao modelo original de autenticação
    auth: {
        expiration_time: "24h",
        issuer: "FCA"
    },

    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs...ÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },

    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
};


