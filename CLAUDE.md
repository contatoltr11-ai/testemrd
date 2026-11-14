# Base de testes: oferta "Plan de Reconquista Personalizado" (Sophia Sanchez)

Este projeto (`~/testemrd`) é o **ambiente de testes** da oferta. O que funcionar aqui depois é levado para os dois projetos de produção. Converse em português com o dono do projeto. O público da oferta são homens hispanofalantes da América Latina, Espanha e EUA que querem reconquistar a ex.

## Regras de trabalho (obrigatórias)
1. **Nunca fazer commit, push ou deploy** sem o dono pedir explicitamente. Ele faz o deploy.
2. **Só alterar arquivos deste projeto (`~/testemrd`).**
3. **Não tocar nos projetos de produção** (abaixo), a menos que o dono peça para levar uma mudança aprovada no teste.
4. **Mudar uma coisa por vez.** Antes de mexer, explicar o que vai mudar e pedir confirmação. O funil vende há quase um ano, e o dono tem medo, com razão, de derrubar a conversão.
5. Antes de afirmar algo sobre números, **conferir os dados** (GA4 / UTMify). Não supor.

## Os três projetos
| Pasta | Domínio | Conta de anúncio | Checkout ($14 / $27) |
|---|---|---|---|
| `~/testemrd` | (teste) | — | `PPU38CQG90D` / `PPU38CQG90F` (cópia do profesionalmrdsanchez) |
| `~/Documents/profesionalmrdsanchez` | reconquistaprp.online | GRINGA_2024 | `PPU38CQG90D` / `PPU38CQG90F` |
| `~/git-sanchezmrd` | sanchezmrd.online | Saúde & Estar | `PPU38CQF1PQ` / `PPU38CQF1PP` |

- **Os links de checkout precisam ser diferentes em cada domínio de produção.** Senão a Meta entende que é a mesma oferta e as duas contas competem entre si. Os links ficam em `src/utils/animations.ts` (`getHotmartUrl`, nome antigo; hoje o checkout é Perfect Pay / centerpag).
- Em 13/11/2026 este projeto foi copiado do profesionalmrdsanchez e ficou idêntico a ele (mesma VSL `vid-6af35cad4ba3b5086298a146`, mesmo GTM `GTM-T8M558NG`, mesmo pixel UTMify `699fb21f66b4e999b2645ba9`).
- Em setembro alguém copiou o mesmo código para os dois domínios por engano, e os dois passaram a usar os mesmos links. Ao levar mudanças para produção, **preservar os links próprios de cada projeto**.

## Funil (ordem que o lead percorre)
1. `src/components/Landing.tsx`: headline + conversa de WhatsApp ("Andrea") + CTA "QUIERO QUE VUELVA". Nova versão no ar desde 12/11/2026.
2. `src/components/Chat.tsx`: a Sophia faz 6 perguntas de **situação** (tempo, quem terminou, duração, contato, se ela está com outro, compromisso).
3. `src/components/Result.tsx` orquestra as fases: loading → `Diagnostico/` → `VideoEspecialista/` (VSL vturb, botão libera em 10 s) → `Janela72Horas/` → `PaginaOferta/`.
4. Textos personalizados: `src/utils/contentByGender.ts` e `src/utils/emotionalValidation.ts`. Eventos GA4: `src/utils/ga4Tracking.ts` (via dataLayer/GTM).
5. Oferta: 2 planos, **Essencial $14** e **Total $27** (pré-selecionado). Checkout Perfect Pay (centerpag), que soma cerca de 7,5% de taxa ($27 vira $29,03) e adapta idioma e moeda ao país.

## Economia do negócio (o que importa ao decidir testes)
- **Front** = plano + **Mensajes Inteligentes ($37, o upsell / order bump)**.
- **PROGRAMA ELITE ($197)** é uma mentoria vendida **pelo WhatsApp** para quem já é cliente. Não é upsell de tráfego e não entra na análise do front, **mas é o que paga a operação**.
- **Quem compra o plano de $14 quase nunca compra o Elite.** Quem compra o de $27 é quem compra o Mensajes e o Elite. Por isso **baixar o preço do front pode trazer mais vendas e menos dinheiro**. Sempre avaliar pelo valor total do comprador, não só pelo ROAS do front.
- Números de 12/10 a 11/11/2026 (UTMify, as duas contas): 41 vendas do front; front + Mensajes ≈ R$ 129 por comprador; Elite ≈ R$ 480 por comprador do front (pode incluir clientes antigos); custo por venda do front ≈ R$ 206. ROAS só do front ≈ 0,6; o negócio todo dá lucro.
- Na UTMify, as vendas do Elite chegam **sem UTM**. O ROAS por campanha subestima o funil.

## O que os dados mostram
- **GA4, sanchezmrd, 05–11/11/2026 (landing antiga):** 522 na landing → 161 começaram o chat (**31%**, maior perda) → 112 terminaram → 104 foram para a VSL → 82 viram a oferta (79%) → **25 clicaram em comprar (30% de quem viu a oferta, segunda maior perda)**.
- O meio do funil (chat → diagnóstico → VSL → 72h) perde pouco. **A Janela 72h não é gargalo**: mexer nela tem pouco a ganhar e algum risco. Se for testar, fazer uma versão curta **em paralelo** com a atual, nunca substituir direto.
- **Queda do front desde setembro/2026:** as vendas caíram de 62–69 por mês (jul–set) para 39–46 (set–nov), e o custo por venda dobrou (cerca de R$ 100 → R$ 200). O custo por visita ficou igual. O que caiu foi **checkout → venda: de cerca de 30% para 14%–22%**. Isso coincidiu com: a troca do link de checkout e da VSL em 17/09, landing reescrita em 09, 23 e 28/09, página de oferta refeita em 06–07/10, e pagamentos em dinheiro (OXXO/boleto) que pararam de aprovar desde agosto. Os compradores da Argentina, México e Colômbia caíram muito.
- A saída da Hotmart (que vendeu até meados de agosto/2026) não derrubou o front sozinha: em ago–set, 100% Perfect Pay, foram 62 vendas e o checkout convertia 30%. Mas a Perfect Pay tem poucos meios de pagamento: cartão, PayPal, Google/Apple Pay e Mercado Pago. **Não aceita OXXO nem boleto/dinheiro** (confirmado pelo dono em 13/11/2026; não adianta perguntar à Perfect Pay).

## Problemas encontrados na oferta (candidatos a teste)
- **Prazos que se contradizem:** 72 horas (mecanismo), "100% em 7 días" (estatísticas e banner do checkout), 7–21 dias e até 45 dias (FAQ), garantia de 60 dias, "por día (30 días)" com "pago único".
- **A promessa da landing não é entregue:** a landing promete "el error que la está alejando" e "qué hacer (y qué no) en los próximos días", mas o diagnóstico é genérico e o "plano pronto" só é vendido.
- **Cenário da oferta (print/depoimento por resposta):** em 13/11/2026 a ordem de `detectScenario` em `PaginaOferta/index.tsx` virou: bloqueado (Camila) → ela com outro (Valentina) → menos de 4 semanas (Mariana) → canal aberto (Lucía) → contato frio (Daniela). Antes, "ruptura reciente" (Mariana) nunca aparecia e "com outro" perdia para "canal aberto". Testado e aprovado no testemrd pelo dono e levado aos dois projetos de produção no mesmo dia.
- **Diagnóstico pouco personalizado:** ignora se ela está com outro e o tempo de relação. Há um bug em `emotionalValidation.ts`, que compara com `'ÉL/ELLA TERMINÓ'`, enquanto o chat grava `'ELLA TERMINÓ'`. A validação contradiz o chat no caso "YO TERMINÉ".
- **Prova pouco crível:** "Estudios de Harvard y Nature Neuroscience" (não existem), vagas que caem e travam em 15, compradores "agora" aleatórios, "+9.247" com dois significados, 87/91/96/100% sem sentido, o mesmo avatar para todos os depoimentos. Também há frases arriscadas para a conta de anúncios ("indefensa e incontrolablemente atraída", 100% garantido).
- **Plano Total** descrito como "Para casos críticos (ella con otro)", mas recomendado para todos os casos; "Garantía Extendida" igual à do Essencial.
- ~~Português misturado no espanhol~~: **corrigido em 13/11/2026 nos três projetos** e publicado pelo dono ("Plan Esencial", "completada", "Avanza a la siguiente", "conductuales", "reconquistarla"). Mudança só de texto. Se a conversão mudar a partir dessa data, não é por causa disso.
- Muitos cliques entre o fim do quiz e o preço: diagnóstico → VSL → 72h → pré-oferta → oferta.

## Concorrentes (analisados em 13/11/2026)
- **Protocolo de la Reconquista** (protocolodelreconquista.shop, "Valeria Rodríguez"): oferta quase igual à nossa (87%, escada 48h/5d/7d, regalo sorpresa $97, 7 bônus "$297", garantia de 60 dias), mas **$19,90, plano único**, checkout Kiwify. Quiz com perguntas de **dor** ("qué te destruye por dentro", "si no actúas…"). Pergunta de compromisso antes do vídeo.
- **Código Ex** (quiz.cdminiquiz.online, Inlead, "Mariana Salazar"): gancho **concreto**, "un mensaje de 3 palabras" ("¿Quieres que te revele ese mensaje?"). Resultado com probabilidade baixa (12%) para gerar medo, oferta **embaixo da VSL na mesma página**, cerca de **US$ 17, plano único**, checkout **Hotmart**, garantia de 30 dias.
- Aproveitar a **estrutura** (plano único, gancho concreto, perguntas de dor, caminho curto). **Não copiar** as promessas inventadas (garantia de resultado, "30 mil homens", probabilidades falsas).

## Testes, em ordem de prioridade
1. **Plano único de $27** (sem o card de $14 nem a escolha de plano), com o Mensajes como bump. Racional: o $14 rouba compradores do $27, que é quem compra o Elite. Basta cerca de 1 em cada 9 compradores de $14 passar para o $27 para empatar. O $14 pode virar **oferta só para quem abandona o checkout** (e-mail / WhatsApp / saída).
2. Encurtar o caminho até o preço: oferta logo abaixo da VSL. A 72h só em teste paralelo, nunca substituindo direto.
3. Gancho concreto + entregar uma parte grátis no diagnóstico (cumpre a promessa da landing).
4. Uma ou duas perguntas de dor no chat + resultado com número no diagnóstico.
5. Padronizar os prazos e limpar a prova social pouco crível.

**Como medir cada teste:** rodar uns 7 dias e pelo menos 150–200 visitantes por versão. Olhar: landing → chat, oferta → `cta_buy_click` (GA4), checkout → venda (UTMify), **e quantos compradores vão para o Elite** (pelo e-mail na Perfect Pay ou no WhatsApp). Os relatórios padrão do GA4 do dia atual chegam incompletos (atraso de 24–48 h).
