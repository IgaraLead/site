const EMAIL = 'contato@igaralead.com.br';

function mailtoWithQuery(subject, body) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Primeiro contato / interesse comercial (CTAs gerais "Falar com especialista"). */
export const mailtoLeadInquiry = mailtoWithQuery(
  'Contato: Igara — plataforma sob medida',
  `Olá,

Gostaria de avaliar uma plataforma sob medida para a nossa operação.

Empresa:
Segmento:
Principal necessidade:

Atenciosamente,`
);

/** Solicitação de demonstração / proposta. */
export const mailtoDemoRequest = mailtoWithQuery(
  'Igara: quero simular minha plataforma',
  `Olá,

Simulei uma plataforma no site da Igara e quero conversar sobre uma proposta.

Empresa:
Segmento:
Melhor período para contato (manhã/tarde):

Atenciosamente,`
);
