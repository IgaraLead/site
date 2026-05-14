const EMAIL = 'contato@igaralead.com.br';

function mailtoWithQuery(subject, body) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Primeiro contato / interesse comercial (CTAs gerais "Entre em contato"). */
export const mailtoLeadInquiry = mailtoWithQuery(
  'Contato: IgaraLead',
  `Olá,

Gostaria de saber mais sobre a IgaraLead e avaliar como as soluções podem apoiar nossa operação comercial.

Empresa:
Segmento:
Principal interesse:

Atenciosamente,`
);

/** Solicitação de demonstração agendada. */
export const mailtoDemoRequest = mailtoWithQuery(
  'Solicitação de demonstração: IgaraLead',
  `Olá,

Gostaria de agendar uma demonstração das soluções IgaraLead.

Empresa:
Melhor período para contato (manhã/tarde):
Cidade/fuso:

Atenciosamente,`
);
