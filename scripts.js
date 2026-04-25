/**
 * Scripts da Landing Page Ton
 * Funcionalidades: Seleção de recebimento, FAQ accordion, Scroll suave
 */

// Selecionar tipo de recebimento (1 dia útil / Na hora)
function selecionarRecebimento(elemento) {
    document.querySelectorAll('.card-recebimento').forEach(function(card) {
        card.classList.remove('ativo');
        card.setAttribute('aria-pressed', 'false');
    });
    elemento.classList.add('ativo');
    elemento.setAttribute('aria-pressed', 'true');
}

// FAQ - Abrir/Fechar perguntas
function toggleFaq(elemento) {
    var faqItem = elemento.parentElement;
    var estavaAberto = faqItem.classList.contains('aberto');

    // Fecha todos os itens do FAQ
    document.querySelectorAll('.faq-item').forEach(function(item) {
        item.classList.remove('aberto');
        var btn = item.querySelector('.faq-pergunta');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    // Abre o item clicado se não estava aberto
    if (!estavaAberto) {
        faqItem.classList.add('aberto');
        elemento.setAttribute('aria-expanded', 'true');
    }
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Suporte a teclado nos cards de recebimento
    document.querySelectorAll('.card-recebimento').forEach(function(card) {
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selecionarRecebimento(this);
            }
        });
    });

    // Suporte a teclado nas perguntas do FAQ
    document.querySelectorAll('.faq-pergunta').forEach(function(btn) {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq(this);
            }
        });
    });

    // Scroll suave para links com âncora (#) — usando passive para melhor performance
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, { passive: false });
    });

    console.log('✅ Landing Page Ton carregada com sucesso!');
});

// ============================================================
// BANNER DE COOKIES LGPD
// Regra 6 da Diretriz de Criação de Website:
// - Checkboxes opcionais desmarcados por padrão
// - Usuário pode gerenciar preferências
// - Cookies necessários sempre ativos
// ============================================================

(function() {
    var CHAVE_STORAGE = 'ton_cookie_consent';

    function salvarConsentimento(analiticos, marketing) {
        var dados = {
            necessario: true,
            analiticos: analiticos,
            marketing: marketing,
            data: new Date().toISOString()
        };
        try { localStorage.setItem(CHAVE_STORAGE, JSON.stringify(dados)); } catch(e) {}
        return dados;
    }

    function ocultarBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('visivel');
            setTimeout(function() { banner.style.display = 'none'; }, 400);
        }
    }

    function exibirBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
            // força reflow antes de adicionar a classe para a transição funcionar
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    banner.classList.add('visivel');
                });
            });
        }
    }

    function reabrirBanner() {
        var banner = document.getElementById('cookie-banner');
        if (!banner) return;
        // Restaura checkboxes para o estado salvo, se houver
        try {
            var salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || 'null');
            if (salvo) {
                var chkAnaliticos = document.getElementById('cookie-analiticos');
                var chkMarketing  = document.getElementById('cookie-marketing');
                if (chkAnaliticos) chkAnaliticos.checked = !!salvo.analiticos;
                if (chkMarketing)  chkMarketing.checked  = !!salvo.marketing;
            }
        } catch(e) {}
        exibirBanner();
    }

    document.addEventListener('DOMContentLoaded', function() {
        var banner         = document.getElementById('cookie-banner');
        var btnAceitar     = document.getElementById('cookie-btn-aceitar');
        var btnRejeitar    = document.getElementById('cookie-btn-rejeitar');
        var btnSalvar      = document.getElementById('cookie-btn-salvar');
        var linkPolitica   = document.getElementById('link-politica-cookies');
        var linkPref       = document.getElementById('link-preferencias-cookies');

        if (!banner) return;

        // Verifica se o usuário já fez escolha anteriormente
        var consentimentoSalvo = null;
        try { consentimentoSalvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || 'null'); } catch(e) {}

        if (!consentimentoSalvo) {
            // Primeira visita: exibe o banner após 600ms
            setTimeout(exibirBanner, 600);
        }

        // Aceitar todos
        if (btnAceitar) {
            btnAceitar.addEventListener('click', function() {
                var chkAnaliticos = document.getElementById('cookie-analiticos');
                var chkMarketing  = document.getElementById('cookie-marketing');
                if (chkAnaliticos) chkAnaliticos.checked = true;
                if (chkMarketing)  chkMarketing.checked  = true;
                salvarConsentimento(true, true);
                ocultarBanner();
            });
        }

        // Rejeitar opcionais
        if (btnRejeitar) {
            btnRejeitar.addEventListener('click', function() {
                var chkAnaliticos = document.getElementById('cookie-analiticos');
                var chkMarketing  = document.getElementById('cookie-marketing');
                if (chkAnaliticos) chkAnaliticos.checked = false;
                if (chkMarketing)  chkMarketing.checked  = false;
                salvarConsentimento(false, false);
                ocultarBanner();
            });
        }

        // Salvar preferências individuais
        if (btnSalvar) {
            btnSalvar.addEventListener('click', function() {
                var chkAnaliticos = document.getElementById('cookie-analiticos');
                var chkMarketing  = document.getElementById('cookie-marketing');
                var analiticos = chkAnaliticos ? chkAnaliticos.checked : false;
                var marketing  = chkMarketing  ? chkMarketing.checked  : false;
                salvarConsentimento(analiticos, marketing);
                ocultarBanner();
            });
        }

        // Links "Política de Cookies" e "Preferências de Cookies" reabrem o banner
        if (linkPolitica) {
            linkPolitica.addEventListener('click', function(e) { e.preventDefault(); reabrirBanner(); });
        }
        if (linkPref) {
            linkPref.addEventListener('click', function(e) { e.preventDefault(); reabrirBanner(); });
        }
    });
})();
