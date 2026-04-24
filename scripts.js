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
