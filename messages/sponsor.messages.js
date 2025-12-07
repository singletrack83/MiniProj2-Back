// messages/sponsor.messages.js
module.exports = {
  success: {
    s0: { http: 200, code: "SponsorFound",       type: "success", message: "Sponsors encontrados" },
    s1: { http: 201, code: "SponsorCreated",     type: "success", message: "Sponsor criado com sucesso" },
    s2: { http: 200, code: "SponsorUpdated",     type: "success", message: "Sponsor atualizado com sucesso" },
    s3: { http: 200, code: "SponsorDeleted",     type: "success", message: "Sponsor removido com sucesso" },
    s4: { http: 200, code: "SponsorDeactivated", type: "success", message: "Sponsor desativado" },
    s5: { http: 200, code: "SponsorActivated",   type: "success", message: "Sponsor ativado" }
  },
  error: {
    e0: { http: 404, code: "SponsorNotFound",    type: "error",   message: "Sponsor não encontrado" },
    e1: { http: 500, code: "SponsorCreateError", type: "error",   message: "Erro ao criar sponsor" },
    e2: { http: 500, code: "SponsorUpdateError", type: "error",   message: "Erro ao atualizar sponsor" },
    e3: { http: 500, code: "SponsorDeleteError", type: "error",   message: "Erro ao remover sponsor" }
  }
};
