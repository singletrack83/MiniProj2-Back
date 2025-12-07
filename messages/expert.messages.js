// messages/expert.messages.js
module.exports = {
  success: {
    s0: { http: 200, code: "ExpertFound",        type: "success", message: "Experts encontrados" },
    s1: { http: 201, code: "ExpertCreated",      type: "success", message: "Expert criado com sucesso" },
    s2: { http: 200, code: "ExpertUpdated",      type: "success", message: "Expert atualizado com sucesso" },
    s3: { http: 200, code: "ExpertDeleted",      type: "success", message: "Expert removido com sucesso" },
    s4: { http: 200, code: "ExpertDeactivated",  type: "success", message: "Expert desativado" },
    s5: { http: 200, code: "ExpertActivated",    type: "success", message: "Expert ativado" }
  },
  error: {
    e0: { http: 404, code: "ExpertNotFound",     type: "error",   message: "Expert não encontrado" },
    e1: { http: 500, code: "ExpertCreateError",  type: "error",   message: "Erro ao criar expert" },
    e2: { http: 500, code: "ExpertUpdateError",  type: "error",   message: "Erro ao atualizar expert" },
    e3: { http: 500, code: "ExpertDeleteError",  type: "error",   message: "Erro ao remover expert" }
  }
};
